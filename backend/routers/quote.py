import os
from html import escape

import sib_api_v3_sdk
from sib_api_v3_sdk.rest import ApiException
from dotenv import load_dotenv

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


# ============================================================
# LOAD ENVIRONMENT VARIABLES
# ============================================================

load_dotenv()


# ============================================================
# ROUTER
# ============================================================

router = APIRouter(
    prefix="/quote",
    tags=["Quote Requests"],
)


# ============================================================
# BREVO EMAIL NOTIFICATION
# ============================================================

def send_quote_notification(
    customer_name: str,
    customer_email: str,
    customer_phone: str,
    service: str,
    property_type: str | None,
    budget: str | None,
    location: str | None,
    message: str | None,
):
    """
    Send a notification email to APO Solar when a
    customer submits a quote request.
    """

    api_key = os.getenv("BREVO_API_KEY")
    sender_email = os.getenv("BREVO_SENDER_EMAIL")
    sender_name = os.getenv(
        "BREVO_SENDER_NAME",
        "APO Solar Limited",
    )
    receiver_email = os.getenv("BREVO_RECEIVER_EMAIL")

    # --------------------------------------------------------
    # CHECK BREVO CONFIGURATION
    # --------------------------------------------------------

    if not api_key:
        raise ValueError(
            "BREVO_API_KEY is missing from .env"
        )

    if not sender_email:
        raise ValueError(
            "BREVO_SENDER_EMAIL is missing from .env"
        )

    if not receiver_email:
        raise ValueError(
            "BREVO_RECEIVER_EMAIL is missing from .env"
        )

    # --------------------------------------------------------
    # CONFIGURE BREVO
    # --------------------------------------------------------

    configuration = sib_api_v3_sdk.Configuration()

    configuration.api_key["api-key"] = api_key

    api_client = sib_api_v3_sdk.ApiClient(
        configuration
    )

    transactional_api = (
        sib_api_v3_sdk.TransactionalEmailsApi(
            api_client
        )
    )

    # --------------------------------------------------------
    # SAFELY FORMAT OPTIONAL VALUES
    # --------------------------------------------------------

    safe_name = escape(customer_name or "")
    safe_email = escape(customer_email or "")
    safe_phone = escape(customer_phone or "")
    safe_service = escape(service or "")
    safe_property = escape(
        property_type or "Not provided"
    )
    safe_budget = escape(
        budget or "Not provided"
    )
    safe_location = escape(
        location or "Not provided"
    )
    safe_message = escape(
        message or "No additional information provided."
    )

    # --------------------------------------------------------
    # EMAIL HTML
    # --------------------------------------------------------

    html_content = f"""
    <html>
        <body>
            <h2>New APO Solar Quote Request</h2>

            <p>
                A new quote request has been submitted
                through the APO Solar Limited website.
            </p>

            <hr>

            <h3>Customer Information</h3>

            <p>
                <strong>Name:</strong>
                {safe_name}
            </p>

            <p>
                <strong>Email:</strong>
                {safe_email}
            </p>

            <p>
                <strong>Phone:</strong>
                {safe_phone}
            </p>

            <h3>Project Information</h3>

            <p>
                <strong>Service:</strong>
                {safe_service}
            </p>

            <p>
                <strong>Property Type:</strong>
                {safe_property}
            </p>

            <p>
                <strong>Estimated Budget:</strong>
                {safe_budget}
            </p>

            <p>
                <strong>Location:</strong>
                {safe_location}
            </p>

            <h3>Customer Message</h3>

            <p>
                {safe_message}
            </p>

            <hr>

            <p>
                This notification was automatically generated
                by the APO Solar Limited website.
            </p>
        </body>
    </html>
    """

    # --------------------------------------------------------
    # CREATE BREVO EMAIL
    # --------------------------------------------------------

    send_smtp_email = sib_api_v3_sdk.SendSmtpEmail(
        sender=sib_api_v3_sdk.SendSmtpEmailSender(
            email=sender_email,
            name=sender_name,
        ),
        to=[
            sib_api_v3_sdk.SendSmtpEmailTo(
                email=receiver_email,
            )
        ],
        reply_to=sib_api_v3_sdk.SendSmtpEmailReplyTo(
            email=customer_email,
            name=customer_name,
        ),
        subject="APO Solar - New Quote Request",
        html_content=html_content,
    )

    # --------------------------------------------------------
    # SEND EMAIL
    # --------------------------------------------------------

    try:
        response = transactional_api.send_transac_email(
            send_smtp_email
        )

        print("========================================")
        print("QUOTE EMAIL SENT SUCCESSFULLY")
        print("========================================")
        print("Response:", response)

        return response

    except ApiException as exc:
        print("========================================")
        print("QUOTE EMAIL FAILED")
        print("========================================")
        print("Error:", exc)

        raise


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
    # SEND BREVO NOTIFICATION
    #
    # IMPORTANT:
    # If Brevo fails, the quote remains saved in the
    # database. The customer submission is therefore
    # not lost because of an email problem.
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
    # RETURN SUCCESSFUL QUOTE RESPONSE
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