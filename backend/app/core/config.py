"""Centralized configuration for the auth foundation.

Values are loaded from environment variables. AWS credentials are *not*
read here — boto3 uses its default credential chain (AWS_ACCESS_KEY_ID,
AWS_SECRET_ACCESS_KEY, AWS_REGION env vars or attached IAM role).
"""
import os


class Settings:
    aws_region: str = os.environ.get("AWS_REGION", "ap-south-2")
    cognito_user_pool_id: str = os.environ.get("COGNITO_USER_POOL_ID", "ap-south-2_FL0C37jsC")
    cognito_app_client_id: str = os.environ.get("COGNITO_APP_CLIENT_ID", "7s9605iohk40otqpmt33v3kmpe")
    dynamodb_users_table: str = os.environ.get("DYNAMODB_USERS_TABLE", "oraone-users")
    jwt_leeway_seconds: int = int(os.environ.get("JWT_LEEWAY_SECONDS", "60"))

    @property
    def jwt_issuer(self) -> str:
        return f"https://cognito-idp.{self.aws_region}.amazonaws.com/{self.cognito_user_pool_id}"

    @property
    def jwks_url(self) -> str:
        return f"{self.jwt_issuer}/.well-known/jwks.json"


settings = Settings()
