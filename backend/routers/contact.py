from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from database import get_db
from models import ContactMessage, User
from routers.auth import require_admin
from schemas import (
    ContactMessageCreate,
    ContactMessageUpdate,
    ContactMessageResponse,
)


# ============================================================
# ROUTER
# ============================================================

router = APIRouter(
    prefix="/contact",
    tags=["Contact"],
)


# ============================================================
# CREATE CONTACT MESSAGE
# PUBLIC ENDPOINT
# ============================================================

@router.post(
    "/",
    response_model=ContactMessageResponse,
    status_code=status.HTTP_201_CREATED,
)
def create_contact_message(
    data: ContactMessageCreate,
    db: Session = Depends(get_db),
):
    try:
        contact_message = ContactMessage(
            full_name=data.full_name,
            email=data.email,
            phone=data.phone,
            subject=data.subject,
            message=data.message,
        )

        db.add(contact_message)
        db.commit()
        db.refresh(contact_message)

        return contact_message

    except Exception as exc:
        db.rollback()

        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Unable to submit contact message.",
        ) from exc


# ============================================================
# GET ALL CONTACT MESSAGES
# ADMIN ONLY
# ============================================================

@router.get(
    "/",
    response_model=list[ContactMessageResponse],
)
def get_contact_messages(
    db: Session = Depends(get_db),
    current_user: User = Depends(require_admin),
):
    return (
        db.query(ContactMessage)
        .order_by(ContactMessage.created_at.desc())
        .all()
    )


# ============================================================
# GET SINGLE CONTACT MESSAGE
# ADMIN ONLY
# ============================================================

@router.get(
    "/{message_id}",
    response_model=ContactMessageResponse,
)
def get_contact_message(
    message_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_admin),
):
    contact_message = (
        db.query(ContactMessage)
        .filter(ContactMessage.id == message_id)
        .first()
    )

    if not contact_message:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Contact message not found.",
        )

    return contact_message


# ============================================================
# UPDATE CONTACT MESSAGE
# ADMIN ONLY
# ============================================================

@router.patch(
    "/{message_id}",
    response_model=ContactMessageResponse,
)
def update_contact_message(
    message_id: int,
    data: ContactMessageUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_admin),
):
    contact_message = (
        db.query(ContactMessage)
        .filter(ContactMessage.id == message_id)
        .first()
    )

    if not contact_message:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Contact message not found.",
        )

    try:
        update_data = data.model_dump(
            exclude_unset=True
        )

        for field, value in update_data.items():
            setattr(contact_message, field, value)

        db.commit()
        db.refresh(contact_message)

        return contact_message

    except Exception as exc:
        db.rollback()

        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Unable to update contact message.",
        ) from exc


# ============================================================
# DELETE CONTACT MESSAGE
# ADMIN ONLY
# ============================================================

@router.delete(
    "/{message_id}",
    status_code=status.HTTP_204_NO_CONTENT,
)
def delete_contact_message(
    message_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_admin),
):
    contact_message = (
        db.query(ContactMessage)
        .filter(ContactMessage.id == message_id)
        .first()
    )

    if not contact_message:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Contact message not found.",
        )

    try:
        db.delete(contact_message)
        db.commit()

        return None

    except Exception as exc:
        db.rollback()

        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Unable to delete contact message.",
        ) from exc