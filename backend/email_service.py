
import os
from html import escape

import sib_api_v3_sdk
from sib_api_v3_sdk.rest import ApiException
from dotenv import load_dotenv


# ============================================================
# LOAD ENVIRONMENT VARIABLES
# ============================================================

load_dotenv()


# ============================================================
# BREVO CONFIGURATION
# ============================================================

BREVO_API_KEY = os.getenv("BREVO_API_KEY")

BREVO_SENDER_EMAIL = os.getenv(
    "BREVO_SENDER_EMAIL"
)

BREVO_SENDER_NAME = os.getenv(
    "BREVO_SENDER_NAME",
    "APO Solar Limited",
)

BREVO_NOTIFICATION_EMAIL = os.getenv(
    "BREVO_NOTIFICATION_EMAIL"
)

BREVO_RECEIVER_EMAIL = os.getenv(
    "BREVO_RECEIVER_EMAIL"
)


# ============================================================
# GET EMAIL RECIPIENTS
# ============================================================

def get_notification_recipients():
    """
    Return all configured APO Solar notification
    email addresses without duplicates.
    """

    recipients = []

    for email in [
        BREVO_NOTIFICATION_EMAIL,
        BREVO_RECEIVER_EMAIL,
    ]:
        if email and email not in recipients:
            recipients.append(email)

    return recipients


# ============================================================
# VALIDATE BREVO CONFIGURATION
# ============================================================

def validate_email_configuration():
    """
    Validate the Brevo configuration before attempting
    to send an email.
    """

    if not BREVO_API_KEY:
        raise ValueError(
            "BREVO_API_KEY is not configured."
        )

    if not BREVO_SENDER_EMAIL:
        raise ValueError(
            "BREVO_SENDER_EMAIL is not configured."
        )

    recipients = get_notification_recipients()

    if not recipients:
        raise ValueError(
            "Neither BREVO_NOTIFICATION_EMAIL nor "
            "BREVO_RECEIVER_EMAIL is configured."
        )


# ============================================================
# SEND EMAIL
# ============================================================

def send_email_notification(
    subject: str,
    html_content: str,
    customer_email: str | None = None,
    customer_name: str | None = None,
):
    """
    Send an email notification through Brevo.

    The email is sent to BOTH:

        BREVO_NOTIFICATION_EMAIL
        BREVO_RECEIVER_EMAIL

    If the customer's email is supplied, it is used
    as the Reply-To address.
    """

    validate_email_configuration()

    recipients = get_notification_recipients()

    # --------------------------------------------------------
    # BREVO CONFIGURATION
    # --------------------------------------------------------

    configuration = sib_api_v3_sdk.Configuration()

    configuration.api_key["api-key"] = BREVO_API_KEY

    api_client = sib_api_v3_sdk.ApiClient(
        configuration
    )

    transactional_api = (
        sib_api_v3_sdk.TransactionalEmailsApi(
            api_client
        )
    )

    # --------------------------------------------------------
    # CREATE RECIPIENT LIST
    # --------------------------------------------------------

    to_recipients = [
        sib_api_v3_sdk.SendSmtpEmailTo(
            email=email
        )
        for email in recipients
    ]

    # --------------------------------------------------------
    # CREATE EMAIL
    # --------------------------------------------------------

    email_data = sib_api_v3_sdk.SendSmtpEmail(
        sender=sib_api_v3_sdk.SendSmtpEmailSender(
            email=BREVO_SENDER_EMAIL,
            name=BREVO_SENDER_NAME,
        ),
        to=to_recipients,
        subject=subject,
        html_content=html_content,
    )

    # --------------------------------------------------------
    # REPLY-TO
    # --------------------------------------------------------

    if customer_email:
        email_data.reply_to = (
            sib_api_v3_sdk.SendSmtpEmailReplyTo(
                email=customer_email,
                name=customer_name or "",
            )
        )

    # --------------------------------------------------------
    # SEND
    # --------------------------------------------------------

    try:
        response = transactional_api.send_transac_email(
            email_data
        )

        print("========================================")
        print("EMAIL SENT SUCCESSFULLY")
        print("========================================")
        print("Recipients:", recipients)
        print("Subject:", subject)
        print("Response:", response)

        return response

    except ApiException as exc:
        print("========================================")
        print("BREVO EMAIL FAILED")
        print("========================================")
        print("Recipients:", recipients)
        print("Subject:", subject)
        print("Error:", exc)

        raise


# ============================================================
# CONTACT MESSAGE EMAIL
# ============================================================

def send_contact_notification(
    customer_name: str,
    customer_email: str,
    customer_phone: str | None,
    subject: str,
    message: str,
):
    """
    Send notification when a customer submits
    the APO Solar contact form.
    """

    safe_name = escape(customer_name or "")
    safe_email = escape(customer_email or "")
    safe_phone = escape(
        customer_phone or "Not provided"
    )
    safe_subject = escape(subject or "")
    safe_message = escape(message or "")

    html_content = f"""
    <html>
        <body>

            <h2>New APO Solar Contact Message</h2>

            <p>
                A new contact message has been submitted
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

            <h3>Message Information</h3>

            <p>
                <strong>Subject:</strong>
                {safe_subject}
            </p>

            <p>
                <strong>Message:</strong>
            </p>

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

    return send_email_notification(
        subject="APO Solar - New Contact Message",
        html_content=html_content,
        customer_email=customer_email,
        customer_name=customer_name,
    )


# ============================================================
# QUOTE REQUEST EMAIL
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
    Send notification when a customer submits
    the APO Solar quote request form.
    """

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
        message or
        "No additional information provided."
    )

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

    return send_email_notification(
        subject="APO Solar - New Quote Request",
        html_content=html_content,
        customer_email=customer_email,
        customer_name=customer_name,
    )
