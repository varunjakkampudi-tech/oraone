from dotenv import load_dotenv
from pathlib import Path

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

import os
import jwt
import bcrypt
import secrets as pysecrets
import uuid
import logging
from datetime import datetime, timezone, timedelta
from typing import List, Optional, Literal

from fastapi import FastAPI, APIRouter, HTTPException, Request, Response, Depends
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
from pydantic import BaseModel, Field, EmailStr, ConfigDict


# ---------- DB ----------
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# ---------- Auth utils ----------
JWT_ALGORITHM = "HS256"


def get_jwt_secret() -> str:
    return os.environ["JWT_SECRET"]


def hash_password(password: str) -> str:
    salt = bcrypt.gensalt()
    return bcrypt.hashpw(password.encode("utf-8"), salt).decode("utf-8")


def verify_password(plain: str, hashed: str) -> bool:
    try:
        return bcrypt.checkpw(plain.encode("utf-8"), hashed.encode("utf-8"))
    except Exception:
        return False


def create_access_token(user_id: str, email: str) -> str:
    payload = {
        "sub": user_id,
        "email": email,
        "exp": datetime.now(timezone.utc) + timedelta(minutes=60),
        "type": "access",
    }
    return jwt.encode(payload, get_jwt_secret(), algorithm=JWT_ALGORITHM)


def create_refresh_token(user_id: str) -> str:
    payload = {
        "sub": user_id,
        "exp": datetime.now(timezone.utc) + timedelta(days=7),
        "type": "refresh",
    }
    return jwt.encode(payload, get_jwt_secret(), algorithm=JWT_ALGORITHM)


def set_auth_cookies(response: Response, access: str, refresh: str):
    response.set_cookie("access_token", access, httponly=True, secure=True, samesite="none", max_age=3600, path="/")
    response.set_cookie("refresh_token", refresh, httponly=True, secure=True, samesite="none", max_age=604800, path="/")


async def get_current_user(request: Request) -> dict:
    token = request.cookies.get("access_token")
    if not token:
        auth = request.headers.get("Authorization", "")
        if auth.startswith("Bearer "):
            token = auth[7:]
    if not token:
        raise HTTPException(status_code=401, detail="Not authenticated")
    try:
        payload = jwt.decode(token, get_jwt_secret(), algorithms=[JWT_ALGORITHM])
        if payload.get("type") != "access":
            raise HTTPException(status_code=401, detail="Invalid token type")
        user = await db.users.find_one({"id": payload["sub"]}, {"_id": 0, "password_hash": 0})
        if not user:
            raise HTTPException(status_code=401, detail="User not found")
        return user
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token expired")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Invalid token")


# ---------- Models ----------
class RegisterIn(BaseModel):
    email: EmailStr
    password: str = Field(min_length=8)
    full_name: str
    company_name: Optional[str] = None


class LoginIn(BaseModel):
    email: EmailStr
    password: str


class ForgotPasswordIn(BaseModel):
    email: EmailStr


class ResetPasswordIn(BaseModel):
    token: str
    password: str = Field(min_length=8)


class UserOut(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str
    email: str
    full_name: str
    role: str = "owner"
    company_name: Optional[str] = None
    onboarded: bool = False
    avatar_url: Optional[str] = None
    created_at: str


# Agents
AgentType = Literal["voice", "chat", "whatsapp"]


class AgentCreateIn(BaseModel):
    name: str
    type: AgentType
    business_name: Optional[str] = None
    language: Optional[str] = "English (US)"
    voice: Optional[str] = "Aria (Female)"
    greeting: Optional[str] = "Hi! How can I help you today?"
    website_url: Optional[str] = None
    whatsapp_number: Optional[str] = None
    phone_number: Optional[str] = None
    instructions: Optional[str] = None
    business_hours: Optional[str] = "24/7"
    widget_position: Optional[str] = "Bottom Right"
    theme_color: Optional[str] = "#2563EB"


class AgentUpdateIn(AgentCreateIn):
    status: Optional[Literal["active", "paused", "draft"]] = None


class Agent(BaseModel):
    id: str
    user_id: str
    name: str
    type: AgentType
    status: str = "active"
    business_name: Optional[str] = None
    language: Optional[str] = None
    voice: Optional[str] = None
    greeting: Optional[str] = None
    website_url: Optional[str] = None
    whatsapp_number: Optional[str] = None
    phone_number: Optional[str] = None
    instructions: Optional[str] = None
    business_hours: Optional[str] = None
    widget_position: Optional[str] = None
    theme_color: Optional[str] = None
    conversations: int = 0
    success_rate: int = 0
    created_at: str


# Leads
class LeadCreateIn(BaseModel):
    name: str
    email: Optional[EmailStr] = None
    phone: Optional[str] = None
    source: str = "website"
    intent: Optional[str] = None
    status: str = "new"
    score: int = 0
    notes: Optional[str] = None


class Lead(LeadCreateIn):
    id: str
    user_id: str
    created_at: str


# Business profile
class BusinessProfileIn(BaseModel):
    company_name: str
    industry: str
    phone: Optional[str] = None
    website: Optional[str] = None
    email: Optional[EmailStr] = None


# ---------- App ----------
app = FastAPI(title="OraOne API", version="1.0.0")
api = APIRouter(prefix="/api")


@api.get("/")
async def root():
    return {"message": "OraOne API v1", "tagline": "One AI. Every Conversation."}


@api.get("/health")
async def health():
    return {"status": "ok", "time": datetime.now(timezone.utc).isoformat()}


# ---------- Auth endpoints ----------
@api.post("/auth/register")
async def register(payload: RegisterIn, response: Response):
    email = payload.email.lower().strip()
    existing = await db.users.find_one({"email": email})
    if existing:
        raise HTTPException(status_code=400, detail="An account with this email already exists.")
    user_id = str(uuid.uuid4())
    now = datetime.now(timezone.utc).isoformat()
    doc = {
        "id": user_id,
        "email": email,
        "password_hash": hash_password(payload.password),
        "full_name": payload.full_name,
        "company_name": payload.company_name,
        "role": "owner",
        "onboarded": False,
        "avatar_url": None,
        "created_at": now,
    }
    await db.users.insert_one(doc)
    access = create_access_token(user_id, email)
    refresh = create_refresh_token(user_id)
    set_auth_cookies(response, access, refresh)
    doc.pop("password_hash", None)
    doc.pop("_id", None)
    # Include tokens in the body so clients that can't use cross-origin cookies
    # (CDN/ingress strips credentialed CORS) can fall back to Bearer auth.
    return {**doc, "access_token": access, "refresh_token": refresh}


@api.post("/auth/login")
async def login(payload: LoginIn, response: Response):
    email = payload.email.lower().strip()
    user = await db.users.find_one({"email": email})
    if not user or not verify_password(payload.password, user.get("password_hash", "")):
        raise HTTPException(status_code=401, detail="Invalid email or password.")
    access = create_access_token(user["id"], email)
    refresh = create_refresh_token(user["id"])
    set_auth_cookies(response, access, refresh)
    user.pop("password_hash", None)
    user.pop("_id", None)
    return {**user, "access_token": access, "refresh_token": refresh}


@api.post("/auth/logout")
async def logout(response: Response):
    response.delete_cookie("access_token", path="/")
    response.delete_cookie("refresh_token", path="/")
    return {"message": "Logged out"}


@api.get("/auth/me", response_model=UserOut)
async def me(user: dict = Depends(get_current_user)):
    return user


@api.post("/auth/refresh")
async def refresh_token(request: Request, response: Response):
    token = request.cookies.get("refresh_token")
    if not token:
        raise HTTPException(status_code=401, detail="No refresh token")
    try:
        payload = jwt.decode(token, get_jwt_secret(), algorithms=[JWT_ALGORITHM])
        if payload.get("type") != "refresh":
            raise HTTPException(status_code=401, detail="Invalid token type")
        user = await db.users.find_one({"id": payload["sub"]}, {"_id": 0, "password_hash": 0})
        if not user:
            raise HTTPException(status_code=401, detail="User not found")
        access = create_access_token(user["id"], user["email"])
        response.set_cookie("access_token", access, httponly=True, secure=True, samesite="none", max_age=3600, path="/")
        return {"message": "Token refreshed"}
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Invalid refresh token")


@api.post("/auth/forgot-password")
async def forgot_password(payload: ForgotPasswordIn):
    email = payload.email.lower().strip()
    user = await db.users.find_one({"email": email})
    # Always return success to prevent enumeration
    if user:
        token = pysecrets.token_urlsafe(32)
        await db.password_reset_tokens.insert_one({
            "token": token,
            "user_id": user["id"],
            "expires_at": datetime.now(timezone.utc) + timedelta(hours=1),
            "used": False,
        })
        logger.info(f"[Password Reset] Token for {email}: {token}")
    return {"message": "If the email exists, a reset link has been sent."}


@api.post("/auth/reset-password")
async def reset_password(payload: ResetPasswordIn):
    record = await db.password_reset_tokens.find_one({"token": payload.token, "used": False})
    if not record:
        raise HTTPException(status_code=400, detail="Invalid or expired token")
    expires = record["expires_at"]
    if isinstance(expires, str):
        expires = datetime.fromisoformat(expires)
    if expires.replace(tzinfo=timezone.utc) if expires.tzinfo is None else expires < datetime.now(timezone.utc):
        raise HTTPException(status_code=400, detail="Token expired")
    await db.users.update_one(
        {"id": record["user_id"]},
        {"$set": {"password_hash": hash_password(payload.password)}},
    )
    await db.password_reset_tokens.update_one({"token": payload.token}, {"$set": {"used": True}})
    return {"message": "Password updated successfully"}


# ---------- Onboarding ----------
@api.post("/onboarding/complete")
async def complete_onboarding(payload: BusinessProfileIn, user: dict = Depends(get_current_user)):
    await db.users.update_one(
        {"id": user["id"]},
        {"$set": {
            "onboarded": True,
            "company_name": payload.company_name,
            "industry": payload.industry,
            "phone": payload.phone,
            "website": payload.website,
            "business_email": payload.email,
        }},
    )
    return {"message": "Onboarding complete"}


# ---------- Agents ----------
@api.get("/agents", response_model=List[Agent])
async def list_agents(user: dict = Depends(get_current_user)):
    docs = await db.agents.find({"user_id": user["id"]}, {"_id": 0}).to_list(500)
    return docs


@api.post("/agents", response_model=Agent)
async def create_agent(payload: AgentCreateIn, user: dict = Depends(get_current_user)):
    agent_id = str(uuid.uuid4())
    now = datetime.now(timezone.utc).isoformat()
    doc = {
        "id": agent_id,
        "user_id": user["id"],
        "status": "active",
        "conversations": 0,
        "success_rate": 0,
        "created_at": now,
        **payload.model_dump(),
    }
    await db.agents.insert_one(doc)
    doc.pop("_id", None)
    return doc


@api.get("/agents/{agent_id}", response_model=Agent)
async def get_agent(agent_id: str, user: dict = Depends(get_current_user)):
    doc = await db.agents.find_one({"id": agent_id, "user_id": user["id"]}, {"_id": 0})
    if not doc:
        raise HTTPException(status_code=404, detail="Agent not found")
    return doc


@api.put("/agents/{agent_id}", response_model=Agent)
async def update_agent(agent_id: str, payload: AgentUpdateIn, user: dict = Depends(get_current_user)):
    update = {k: v for k, v in payload.model_dump().items() if v is not None}
    result = await db.agents.update_one({"id": agent_id, "user_id": user["id"]}, {"$set": update})
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Agent not found")
    doc = await db.agents.find_one({"id": agent_id}, {"_id": 0})
    return doc


@api.delete("/agents/{agent_id}")
async def delete_agent(agent_id: str, user: dict = Depends(get_current_user)):
    result = await db.agents.delete_one({"id": agent_id, "user_id": user["id"]})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Agent not found")
    return {"message": "Deleted"}


# ---------- Leads ----------
@api.get("/leads", response_model=List[Lead])
async def list_leads(user: dict = Depends(get_current_user)):
    docs = await db.leads.find({"user_id": user["id"]}, {"_id": 0}).sort("created_at", -1).to_list(1000)
    return docs


@api.post("/leads", response_model=Lead)
async def create_lead(payload: LeadCreateIn, user: dict = Depends(get_current_user)):
    lead_id = str(uuid.uuid4())
    now = datetime.now(timezone.utc).isoformat()
    doc = {"id": lead_id, "user_id": user["id"], "created_at": now, **payload.model_dump()}
    await db.leads.insert_one(doc)
    doc.pop("_id", None)
    return doc


@api.delete("/leads/{lead_id}")
async def delete_lead(lead_id: str, user: dict = Depends(get_current_user)):
    await db.leads.delete_one({"id": lead_id, "user_id": user["id"]})
    return {"message": "Deleted"}


# ---------- Contact (marketing) ----------
class ContactIn(BaseModel):
    name: str
    email: EmailStr
    company: Optional[str] = None
    message: str
    type: Optional[str] = "contact"  # contact | demo | sales


@api.post("/contact")
async def submit_contact(payload: ContactIn):
    doc = {
        "id": str(uuid.uuid4()),
        "created_at": datetime.now(timezone.utc).isoformat(),
        **payload.model_dump(),
    }
    await db.contact_submissions.insert_one(doc)
    doc.pop("_id", None)
    return {"message": "Thanks! We'll be in touch shortly.", "id": doc["id"]}


class NewsletterIn(BaseModel):
    email: EmailStr


@api.post("/newsletter")
async def subscribe_newsletter(payload: NewsletterIn):
    await db.newsletter.update_one(
        {"email": payload.email.lower()},
        {"$set": {"email": payload.email.lower(), "subscribed_at": datetime.now(timezone.utc).isoformat()}},
        upsert=True,
    )
    return {"message": "Subscribed successfully"}


# ---------- Stats / dashboard overview ----------
@api.get("/dashboard/overview")
async def dashboard_overview(user: dict = Depends(get_current_user)):
    agents_count = await db.agents.count_documents({"user_id": user["id"]})
    leads_count = await db.leads.count_documents({"user_id": user["id"]})
    return {
        "calls_answered": 1246,
        "chats_handled": 2354,
        "whatsapp_chats": 1890,
        "leads_captured": max(689, leads_count),
        "appointments_booked": 342,
        "conversion_rate": 24.5,
        "agents_count": agents_count,
    }


# ---------- Mount + middleware ----------
app.include_router(api)

cors_origins_env = os.environ.get('CORS_ORIGINS', '*')
allow_origins = ["*"] if cors_origins_env.strip() == "*" else [o.strip() for o in cors_origins_env.split(",") if o.strip()]
app.add_middleware(
    CORSMiddleware,
    allow_origins=allow_origins,
    allow_credentials=True if allow_origins != ["*"] else False,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ---------- Security headers ----------
@app.middleware("http")
async def security_headers_mw(request, call_next):
    response = await call_next(request)
    # Hardening — see https://owasp.org/www-project-secure-headers/
    response.headers.setdefault("X-Content-Type-Options", "nosniff")
    response.headers.setdefault("X-Frame-Options", "DENY")
    response.headers.setdefault("Referrer-Policy", "strict-origin-when-cross-origin")
    response.headers.setdefault(
        "Permissions-Policy",
        "camera=(), microphone=(), geolocation=(), payment=(), usb=()",
    )
    response.headers.setdefault("X-XSS-Protection", "0")
    response.headers.setdefault("Cross-Origin-Opener-Policy", "same-origin")
    return response

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)


@app.on_event("startup")
async def startup():
    try:
        await db.users.create_index("email", unique=True)
        await db.agents.create_index([("user_id", 1)])
        await db.leads.create_index([("user_id", 1), ("created_at", -1)])
        await db.password_reset_tokens.create_index("expires_at", expireAfterSeconds=0)
    except Exception as e:
        logger.warning(f"Index creation issue: {e}")

    # Seed admin
    admin_email = os.environ.get("ADMIN_EMAIL", "admin@oraone.ai").lower()
    admin_password = os.environ.get("ADMIN_PASSWORD", "OraOne@2026")
    existing = await db.users.find_one({"email": admin_email})
    if existing is None:
        await db.users.insert_one({
            "id": str(uuid.uuid4()),
            "email": admin_email,
            "password_hash": hash_password(admin_password),
            "full_name": "OraOne Admin",
            "company_name": "OraOne Technologies",
            "role": "admin",
            "onboarded": True,
            "avatar_url": None,
            "created_at": datetime.now(timezone.utc).isoformat(),
        })
        logger.info(f"Seeded admin user: {admin_email}")
    elif not verify_password(admin_password, existing.get("password_hash", "")):
        await db.users.update_one(
            {"email": admin_email},
            {"$set": {"password_hash": hash_password(admin_password)}},
        )
        logger.info(f"Updated admin password for: {admin_email}")


@app.on_event("shutdown")
async def shutdown():
    client.close()
