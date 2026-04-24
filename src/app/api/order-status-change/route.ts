// ✨ Emails temporarily disabled
// To re-enable: uncomment the full original code below and remove the early return

import { NextResponse } from "next/server";

export async function POST(req: Request) {
  return NextResponse.json(
    { success: true, message: "Emails temporarily disabled" },
    { status: 200 },
  );
}

/*
// ====== ORIGINAL CODE (uncomment to re-enable emails) ======

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

// Map status to user-friendly messages
const getStatusMessage = (status: string) => {
  const messages: Record<
    string,
    { title: string; body: string; emoji: string }
  > = {
    payment_received: {
      title: "Payment Confirmed",
      body: "We've received your payment and are processing your order.",
      emoji: "✅",
    },
    confirmed: {
      title: "Order Confirmed",
      body: "Your order has been confirmed and will be prepared soon.",
      emoji: "📋",
    },
    preparing: {
      title: "Preparing Your Order",
      body: "We're carefully packaging your items.",
      emoji: "📦",
    },
    out_for_delivery: {
      title: "Out for Delivery",
      body: "Your package is on the way! Our rider will contact you shortly.",
      emoji: "🚚",
    },
    delivered: {
      title: "Delivered",
      body: "Your order has been delivered. Thank you for shopping with us!",
      emoji: "✅",
    },
  };

  return (
    messages[status] || {
      title: status.replace(/_/g, " ").toUpperCase(),
      body: `Your order status has been updated to ${status.replace(/_/g, " ")}.`,
      emoji: "📦",
    }
  );
};

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const {
      orderId,
      customerEmail,
      customerName,
      deliveryStatus,
      items,
      total,
    } = data;

    // Skip if no email provided
    if (!customerEmail) {
      console.log("No email provided for order:", orderId);
      return NextResponse.json(
        { message: "No email on order" },
        { status: 200 },
      );
    }

    // Skip certain statuses if needed
    const skipStatuses = ["payment_pending", "cancelled"];
    if (skipStatuses.includes(deliveryStatus)) {
      return NextResponse.json({ message: "Status skipped" }, { status: 200 });
    }

    const statusInfo = getStatusMessage(deliveryStatus);

    await resend.emails.send({
      from: "Obaapa Essentials <essentialsobaapa@gmail.com>",
      to: customerEmail,
      subject: `${statusInfo.emoji} ${statusInfo.title} - Order #${orderId.slice(-8).toUpperCase()}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
          </head>
          <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background-color: #FDDEC3; color: #333; padding: 20px; text-align: center; border-radius: 8px 8px 0 0;">
              <h1 style="margin: 0; font-size: 24px;">${statusInfo.emoji} ${statusInfo.title}</h1>
            </div>
            
            <div style="background-color: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px;">
              <p style="font-size: 16px; margin-bottom: 20px;">Hi ${customerName},</p>
              
              <p style="font-size: 16px; margin-bottom: 20px;">${statusInfo.body}</p>
              
              <div style="background-color: white; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h2 style="margin-top: 0; color: #F27430; font-size: 18px;">Order Details</h2>
                <p style="margin: 5px 0;"><strong>Order ID:</strong> #${orderId.slice(-8).toUpperCase()}</p>
                <p style="margin: 5px 0;"><strong>Status:</strong> ${deliveryStatus.replace(/_/g, " ").toUpperCase()}</p>
                ${total ? `<p style="margin: 5px 0;"><strong>Total:</strong> GH₵${total.toFixed(2)}</p>` : ""}
              </div>
              
              ${
                deliveryStatus === "out_for_delivery"
                  ? `
                <div style="background-color: #FEF3E7; padding: 15px; border-left: 4px solid #FDDEC3; margin: 20px 0;">
                  <p style="margin: 0; font-size: 14px;">
                    <strong>Note:</strong> Our delivery rider will contact you on your registered phone number before arrival.
                  </p>
                </div>
              `
                  : ""
              }
              
              <p style="font-size: 14px; color: #666; margin-top: 30px;">
                If you have any questions, please don't hesitate to contact us.
              </p>
              
              <p style="font-size: 14px; margin-top: 30px;">
                Thank you for shopping with us!<br>
                <strong>Obaapa Essentials Team</strong>
              </p>
            </div>
            
            <div style="text-align: center; padding: 20px; font-size: 12px; color: #999;">
              <p>This is an automated message. Please do not reply to this email.</p>
            </div>
          </body>
        </html>
      `,
    });

    return NextResponse.json({ success: true, message: "Email sent" });
  } catch (err) {
    console.error("Error sending email:", err);
    return NextResponse.json(
      { message: "Error processing webhook", error: String(err) },
      { status: 500 },
    );
  }
}
*/
