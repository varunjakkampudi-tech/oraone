"""Postgres health + introspection routes."""
from __future__ import annotations

from fastapi import APIRouter, HTTPException
from sqlalchemy import text

from app.db.session import init_engine

router = APIRouter(prefix="/api/db", tags=["db"])


@router.get("/health")
async def db_health() -> dict:
    """Returns {ok: True, version: ...} on a successful round-trip."""
    try:
        engine = init_engine()
        async with engine.connect() as conn:
            version = (await conn.execute(text("select version()"))).scalar_one()
            tables = (
                await conn.execute(
                    text(
                        "select tablename from pg_tables "
                        "where schemaname = 'public' order by tablename"
                    )
                )
            ).scalars().all()
        return {"ok": True, "version": version, "tables": tables}
    except Exception as e:
        # Surface the error so callers can debug VPC/SG issues quickly.
        raise HTTPException(status_code=503, detail=f"db_unreachable: {type(e).__name__}: {e}")
