
from datetime import datetime

from pydantic import BaseModel, ConfigDict, EmailStr


# ============================================================
# USER / AUTHENTICATION SCHEMAS
# ============================================================

class UserCreate(BaseModel):
    full_name: str
    email: EmailStr
    password: str


class UserResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    full_name: str
    email: EmailStr
    role: str
    is_active: bool
    created_at: datetime


class LoginRequest(BaseModel):
    email: EmailStr
    password: str


class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"


# ============================================================
# CONTACT MESSAGE SCHEMAS
# ============================================================

class ContactMessageCreate(BaseModel):
    full_name: str
    email: EmailStr
    phone: str | None = None
    subject: str | None = None
    message: str


class ContactMessageUpdate(BaseModel):
    full_name: str | None = None
    email: EmailStr | None = None
    phone: str | None = None
    subject: str | None = None
    message: str | None = None


class ContactMessageResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    full_name: str
    email: EmailStr
    phone: str | None
    subject: str | None
    message: str
    created_at: datetime


# ============================================================
# QUOTE REQUEST SCHEMAS
# ============================================================

class QuoteRequestCreate(BaseModel):
    full_name: str
    email: EmailStr
    phone: str
    service: str
    property_type: str | None = None
    budget: str | None = None
    location: str | None = None
    message: str | None = None


class QuoteRequestUpdate(BaseModel):
    full_name: str | None = None
    email: EmailStr | None = None
    phone: str | None = None
    service: str | None = None
    property_type: str | None = None
    budget: str | None = None
    location: str | None = None
    message: str | None = None


class QuoteRequestResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    full_name: str
    email: EmailStr
    phone: str
    service: str
    property_type: str | None
    budget: str | None
    location: str | None
    message: str | None
    created_at: datetime
