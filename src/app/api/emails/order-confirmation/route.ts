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
const SHOP_EMAIL = "essentialsobaapa@gmail.com";

export async function POST(req: Request) {
  try {
    const orderDetails = await req.json();

    const {
      orderId,
      customerInfo,
      deliveryInfo,
      items,
      pricing,
      payment,
      createdAt,
    } = orderDetails;

    // Format order date
    const orderDate = new Date(createdAt).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

    // Generate items HTML
    const itemsHtml = items
      .map(
        (item: any) => `
      <tr>
        <td style="padding: 12px; border-bottom: 1px solid #eeeeee;">
          <p style="margin: 0; font-weight: 600; color: #333333;">${item.productSnapshot.name}</p>
          ${item.productSnapshot.size || item.productSnapshot.color ? `<p style="margin: 4px 0 0; font-size: 13px; color: #888888;">${[item.productSnapshot.size ? `Size: ${item.productSnapshot.size}` : '', item.productSnapshot.color ? `Color: ${item.productSnapshot.color}` : ''].filter(Boolean).join(' · ')}</p>` : ''}
          <p style="margin: 4px 0 0; font-size: 14px; color: #666666;">Qty: ${item.quantity}</p>
        </td>
        <td style="padding: 12px; border-bottom: 1px solid #eeeeee; text-align: right;">
          <p style="margin: 0; color: #333333;">GH₵${item.priceAtPurchase.toFixed(2)}</p>
        </td>
        <td style="padding: 12px; border-bottom: 1px solid #eeeeee; text-align: right;">
          <p style="margin: 0; font-weight: 600; color: #333333;">GH₵${(item.priceAtPurchase * item.quantity).toFixed(2)}</p>
        </td>
      </tr>
    `,
      )
      .join("");

    // Generate items plain text
    const itemsText = items
      .map(
        (item: any) =>
          `${item.productSnapshot.name}${item.productSnapshot.size ? ` (Size: ${item.productSnapshot.size})` : ''}${item.productSnapshot.color ? ` (Color: ${item.productSnapshot.color})` : ''} - Qty: ${item.quantity} × GH₵${item.priceAtPurchase.toFixed(2)} = GH₵${(item.priceAtPurchase * item.quantity).toFixed(2)}`,
      )
      .join("\n");

    // Shop Owner Email HTML
    const shopEmailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
          <table role="presentation" style="width: 100%; border-collapse: collapse;">
            <tr>
              <td align="center" style="padding: 40px 0; background-color: #f9f9f9;">
                <table role="presentation" style="width: 600px; max-width: 100%; border-collapse: collapse; background-color: #ffffff; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
                  
                  <!-- Header -->
                  <tr>
                    <td style="padding: 40px 40px 20px; text-align: center; background-color: #F27430; border-radius: 12px 12px 0 0;">
                      <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: bold;">
                        🎉 New Order Received!
                      </h1>
                    </td>
                  </tr>
                  
                  <!-- Body -->
                  <tr>
                    <td style="padding: 40px;">
                      <div style="background-color: #f0fdf4; border-left: 4px solid #22c55e; padding: 15px; margin-bottom: 25px;">
                        <p style="margin: 0; color: #166534; font-size: 16px; font-weight: 600;">
                          A new order has been placed! 💰
                        </p>
                      </div>
                      
                      <div style="background-color: #f8f8f8; padding: 20px; border-radius: 8px; margin-bottom: 25px;">
                        <p style="margin: 0 0 8px; color: #666666; font-size: 14px;">Order Number</p>
                        <p style="margin: 0; color: #F27430; font-size: 18px; font-weight: bold; font-family: monospace;">${orderId}</p>
                        <p style="margin: 12px 0 0; color: #666666; font-size: 14px;">Order Date: ${orderDate}</p>
                        <p style="margin: 8px 0 0; color: #666666; font-size: 14px;">Payment Status: <span style="color: #22c55e; font-weight: 600;">${payment.status}</span></p>
                        ${payment.paystackReference ? `<p style="margin: 8px 0 0; color: #666666; font-size: 14px;">Payment Reference: <span style="font-family: monospace;">${payment.paystackReference}</span></p>` : ""}
                      </div>
                      
                      <h2 style="margin: 0 0 15px; color: #333333; font-size: 20px; font-weight: 600;">
                        Customer Information
                      </h2>
                      
                      <div style="background-color: #f8f8f8; padding: 20px; border-radius: 8px; margin-bottom: 25px;">
                        <p style="margin: 0 0 8px; color: #333333; font-weight: 600; font-size: 16px;">${customerInfo.fullName}</p>
                        <p style="margin: 0 0 4px; color: #666666; font-size: 14px;">📞 ${customerInfo.phone}</p>
                        ${customerInfo.email ? `<p style="margin: 0; color: #666666; font-size: 14px;">✉️ ${customerInfo.email}</p>` : ""}
                      </div>
                      
                      <h2 style="margin: 0 0 15px; color: #333333; font-size: 20px; font-weight: 600;">
                        Delivery Address
                      </h2>
                      
                      <div style="background-color: #f8f8f8; padding: 20px; border-radius: 8px; margin-bottom: 25px;">
                        <p style="margin: 0; color: #666666; font-size: 14px; line-height: 1.6;">
                          📍 ${deliveryInfo.address}<br>
                          ${deliveryInfo.city}, ${deliveryInfo.region}
                          ${deliveryInfo.digitalAddress ? `<br>Digital Address: ${deliveryInfo.digitalAddress}` : ""}
                        </p>
                      </div>
                      
                      <h2 style="margin: 0 0 15px; color: #333333; font-size: 20px; font-weight: 600;">
                        Order Items
                      </h2>
                      
                      <table role="presentation" style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
                        <thead>
                          <tr>
                            <th style="padding: 12px; text-align: left; border-bottom: 2px solid #F27430; color: #666666; font-size: 14px; font-weight: 600;">Item</th>
                            <th style="padding: 12px; text-align: right; border-bottom: 2px solid #F27430; color: #666666; font-size: 14px; font-weight: 600;">Price</th>
                            <th style="padding: 12px; text-align: right; border-bottom: 2px solid #F27430; color: #666666; font-size: 14px; font-weight: 600;">Total</th>
                          </tr>
                        </thead>
                        <tbody>
                          ${itemsHtml}
                        </tbody>
                      </table>
                      
                      <div style="background-color: #f8f8f8; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
                        <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                          <span style="color: #666666;">Subtotal</span>
                          <span style="color: #333333; font-weight: 600;">GH₵${pricing.subtotal.toFixed(2)}</span>
                        </div>
                        ${
                          pricing.discount > 0
                            ? `
                        <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                          <span style="color: #22c55e;">Discount</span>
                          <span style="color: #22c55e; font-weight: 600;">-GH₵${pricing.discount.toFixed(2)}</span>
                        </div>
                        `
                            : ""
                        }
                        <div style="border-top: 2px solid #dddddd; padding-top: 12px; margin-top: 12px; display: flex; justify-content: space-between;">
                          <span style="color: #333333; font-size: 18px; font-weight: bold;">Total Paid</span>
                          <span style="color: #22c55e; font-size: 22px; font-weight: bold;">GH₵${pricing.total.toFixed(2)}</span>
                        </div>
                      </div>

                      <div style="background-color: #fef3c7; border-left: 4px solid #f59e0b; padding: 15px; margin-bottom: 25px;">
                        <p style="margin: 0; color: #92400e; font-size: 14px;">
                          <strong>Reminder:</strong> Delivery fee to be collected by rider upon delivery.
                        </p>
                      </div>
                      
                      <div style="text-align: center; margin: 30px 0 0;">
                        <a href="https://wa.me/${customerInfo.phone.replace(/\D/g, "")}" style="display: inline-block; padding: 14px 32px; background-color: #25D366; color: #ffffff; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 16px; margin-right: 10px;">
                          Contact Customer on WhatsApp
                        </a>
                      </div>
                    </td>
                  </tr>
                  
                  <!-- Footer -->
                  <tr>
                    <td style="padding: 30px 40px; background-color: #f8f8f8; text-align: center; border-top: 1px solid #eeeeee; border-radius: 0 0 12px 12px;">
                      <p style="margin: 0; color: #666666; font-size: 14px;">
                        Obaapa Essentials - Order Notification
                      </p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </body>
      </html>
    `;

    // Send notification to shop owner only
    const { data, error } = await resend.emails.send({
      from: "Obaapa Essentials <essentialsobaapa@gmail.com>",
      to: [SHOP_EMAIL],
      subject: `🎉 New Order: ${orderId} - GH₵${pricing.total.toFixed(2)}`,
      html: shopEmailHtml,
      text: `
NEW ORDER RECEIVED! 🎉

Order Number: ${orderId}
Order Date: ${orderDate}
Payment Status: ${payment.status}
${payment.paystackReference ? `Payment Reference: ${payment.paystackReference}` : ""}

CUSTOMER INFORMATION:
${customerInfo.fullName}
Phone: ${customerInfo.phone}
${customerInfo.email ? `Email: ${customerInfo.email}` : ""}

DELIVERY ADDRESS:
${deliveryInfo.address}
${deliveryInfo.city}, ${deliveryInfo.region}
${deliveryInfo.digitalAddress ? `Digital Address: ${deliveryInfo.digitalAddress}` : ""}

ORDER ITEMS:
${itemsText}

PRICING:
Subtotal: GH₵${pricing.subtotal.toFixed(2)}
${pricing.discount > 0 ? `Discount: -GH₵${pricing.discount.toFixed(2)}\n` : ""}Total Paid: GH₵${pricing.total.toFixed(2)}


Contact customer: https://wa.me/${customerInfo.phone.replace(/\D/g, "")}
      `.trim(),
    });

    if (error) {
      console.error("Email error:", error);
      return NextResponse.json(
        {
          success: false,
          error: error.message,
        },
        { status: 500 },
      );
    }

    console.log("Order notification email sent to shop owner successfully");
    return NextResponse.json({
      success: true,
      emailId: data?.id,
    });
  } catch (error: any) {
    console.error("Error:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 },
    );
  }
}
*/
