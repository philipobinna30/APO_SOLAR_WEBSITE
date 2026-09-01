
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from database import get_db
from models import QuoteRequest, User
from routers.auth import require_admin
from schemas import (
    QuoteRequestCreate,
    QuoteRequestUpdate,
    QuoteRequestResponse,
)

from email_service import send_quote_notification


# ============================================================
# ROUTER
# ============================================================

router = APIRouter(
    prefix="/quote",
    tags=["Quote Requests"],
)


# ============================================================
# CREATE QUOTE REQUEST
# PUBLIC ENDPOINT
# ============================================================

@router.post(
    "/",
    response_model=QuoteRequestResponse,
    status_code=status.HTTP_201_CREATED,
)
def create_quote_request(
    data: QuoteRequestCreate,
    db: Session = Depends(get_db),
):
    try:
        # ----------------------------------------------------
        # CREATE DATABASE RECORD
        # ----------------------------------------------------

        quote_request = QuoteRequest(
            full_name=data.full_name,
            email=data.email,
            phone=data.phone,
            service=data.service,
            property_type=data.property_type,
            budget=data.budget,
            location=data.location,
            message=data.message,
        )

        db.add(quote_request)
        db.commit()
        db.refresh(quote_request)

    except Exception as exc:
        db.rollback()

        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Unable to submit quote request.",
        ) from exc

    # --------------------------------------------------------
    # SEND EMAIL NOTIFICATION
    #
    # IMPORTANT:
    # The quote is already saved in PostgreSQL.
    #
    # If Brevo fails, the customer's quote is NOT lost.
    # --------------------------------------------------------

    try:
        send_quote_notification(
            customer_name=data.full_name,
            customer_email=data.email,
            customer_phone=data.phone,
            service=data.service,
            property_type=data.property_type,
            budget=data.budget,
            location=data.location,
            message=data.message,
        )

    except Exception as exc:
        print(
            "Quote saved, but email notification failed."
        )
        print("Email error:", exc)

    # --------------------------------------------------------
    # RETURN SUCCESSFUL RESPONSE
    # --------------------------------------------------------

    return quote_request


# ============================================================
# GET ALL QUOTE REQUESTS
# ADMIN ONLY
# ============================================================

@router.get(
    "/",
    response_model=list[QuoteRequestResponse],
)
def get_quote_requests(
    db: Session = Depends(get_db),
    current_user: User = Depends(require_admin),
):
    return (
        db.query(QuoteRequest)
        .order_by(QuoteRequest.created_at.desc())
        .all()
    )


# ============================================================
# GET SINGLE QUOTE REQUEST
# ADMIN ONLY
# ============================================================

@router.get(
    "/{quote_id}",
    response_model=QuoteRequestResponse,
)
def get_quote_request(
    quote_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_admin),
):
    quote_request = (
        db.query(QuoteRequest)
        .filter(QuoteRequest.id == quote_id)
        .first()
    )

    if not quote_request:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Quote request not found.",
        )

    return quote_request


# ============================================================
# UPDATE QUOTE REQUEST
# ADMIN ONLY
# ============================================================

@router.patch(
    "/{quote_id}",
    response_model=QuoteRequestResponse,
)
def update_quote_request(
    quote_id: int,
    data: QuoteRequestUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_admin),
):
    quote_request = (
        db.query(QuoteRequest)
        .filter(QuoteRequest.id == quote_id)
        .first()
    )

    if not quote_request:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Quote request not found.",
        )

    try:
        update_data = data.model_dump(
            exclude_unset=True
        )

        for field, value in update_data.items():
            setattr(quote_request, field, value)

        db.commit()
        db.refresh(quote_request)

        return quote_request

    except Exception as exc:
        db.rollback()

        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Unable to update quote request.",
        ) from exc


# ============================================================
# DELETE QUOTE REQUEST
# ADMIN ONLY
# ============================================================

@router.delete(
    "/{quote_id}",
    status_code=status.HTTP_204_NO_CONTENT,
)
def delete_quote_request(
    quote_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_admin),
):
    quote_request = (
        db.query(QuoteRequest)
        .filter(QuoteRequest.id == quote_id)
        .first()
    )

    if not quote_request:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Quote request not found.",
        )

    try:
        db.delete(quote_request)
        db.commit()

        return None

    except Exception as exc:
        db.rollback()

        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Unable to delete quote request.",
        ) from exc
