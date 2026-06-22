"""Centralized configuration for the auth foundation.

Values are loaded from environment variables. AWS credentials are *not*
read here — boto3 uses its default credential chain (AWS_ACCESS_KEY_ID,
AWS_SECRET_ACCESS_KEY, AWS_REGION env vars or attached IAM role).
"""
import os


class Settings:
    aws_region: str = os.environ.get("AWS_REGION", "ap-south-2")
    cognito_user_pool_id: str = os.environ.get("COGNITO_USER_POOL_ID", "ap-south-2_hbzHCGsK9")
    cognito_app_client_id: str = os.environ.get(
        "COGNITO_CLIENT_ID",
        os.environ.get("COGNITO_APP_CLIENT_ID", "2v4a1aufa8cqkvc09963ols01a"),
    )
    cognito_redirect_uri: str = os.environ.get(
        "COGNITO_REDIRECT_URI",
        "http://localhost:3000/auth/callback",
    )
    cognito_domain: str = os.environ.get(
        "COGNITO_DOMAIN",
        f"https://{aws_region}{(cognito_user_pool_id.split('_', 1)[1].lower() if '_' in cognito_user_pool_id else '')}.auth.{aws_region}.amazoncognito.com",
    )
    dynamodb_users_table: str = os.environ.get("DYNAMODB_USERS_TABLE", "oraone-users")
    jwt_leeway_seconds: int = int(os.environ.get("JWT_LEEWAY_SECONDS", "60"))

    @property
    def jwt_issuer(self) -> str:
        return f"https://cognito-idp.{self.aws_region}.amazonaws.com/{self.cognito_user_pool_id}"

    @property
    def jwks_url(self) -> str:
        return f"{self.jwt_issuer}/.well-known/jwks.json"


settings = Settings()
