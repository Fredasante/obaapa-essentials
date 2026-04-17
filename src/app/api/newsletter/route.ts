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

export async function POST(req: Request) {
  try {
    const { firstName, email, interest } = await req.json();

    // Add contact to Loops (for storage only)
    try {
      const loopsResponse = await fetch(
        "https://app.loops.so/api/v1/contacts/create",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${process.env.LOOPS_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            firstName: firstName,
            userGroup: interest || "general",
            source: "newsletter_signup",
          }),
        },
      );

      const loopsData = await loopsResponse.json();

      if (!loopsResponse.ok) {
        console.error("Loops error:", loopsData);
      } else {
        console.log("Contact added to Loops:", loopsData);
      }
    } catch (loopsError) {
      console.error("Error adding to Loops:", loopsError);
    }

    // Send welcome email using Resend
    const { data, error } = await resend.emails.send({
      from: "Obaapa Essentials <obaapaessentials@gmail.com>",
      to: [email],
      subject: `Welcome to Obaapa Essentials, ${firstName}! 👋`,
      html: `
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
                    
                    <!-- Body -->
                    <tr>
                      <td style="padding: 50px 40px;">
                        <h1 style="margin: 0 0 10px; color: #333333; font-size: 28px; font-weight: bold;">
                          Welcome, ${firstName}! 👋
                        </h1>
                        
                        <p style="margin: 0 0 25px; color: #333333; font-size: 16px; line-height: 1.6;">
                          Thank you for subscribing to our newsletter! We're thrilled to have you join our community — lovers of authentically Ghanaian fashion, flavor, and wellness essentials.
                        </p>
                        
                        <p style="margin: 0 0 12px; color: #333333; font-size: 16px; font-weight: 600;">
                          You'll be the first to know about:
                        </p>
                        
                        <ul style="margin: 0 0 25px; padding-left: 20px; color: #333333; font-size: 16px; line-height: 1.8;">
                          <li style="margin-bottom: 8px;">New arrivals & exclusive collections</li>
                          <li style="margin-bottom: 8px;">Special discounts & early access</li>
                          <li style="margin-bottom: 8px;">Recipes, spice tips & wellness inspiration</li>
                          <li style="margin-bottom: 8px;">VIP-only offers</li>
                        </ul>
                        
                        ${
                          interest
                            ? `
                        <p style="margin: 0 0 30px; color: #333333; font-size: 16px; line-height: 1.6;">
                          We noticed you're interested in <strong>${interest}</strong> — we'll make sure to send you updates on pieces you'll love!
                        </p>
                        `
                            : `<div style="margin-bottom: 30px;"></div>`
                        }
                        
                        <div style="text-align: center; margin: 0;">
                          <a href="https://www.obaapaessentials.com" style="display: inline-block; padding: 16px 40px; background-color: #C85A1F; color: #ffffff; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 16px;">
                            Start Shopping
                          </a>
                        </div>
                      </td>
                    </tr>
                    
                    <!-- Footer -->
                    <tr>
                      <td style="padding: 30px 40px; background-color: #f8f8f8; text-align: center; border-top: 1px solid #eeeeee; border-radius: 0 0 12px 12px;">
                        <p style="margin: 0 0 10px; color: #666666; font-size: 14px;">
                          Stay connected with us
                        </p>
                        <p style="margin: 0 0 15px; color: #666666; font-size: 14px;">
                          <a href="https://www.instagram.com/bend_the_trendd___" style="color: #C85A1F; text-decoration: none; margin: 0 10px;">Instagram</a> |
                          <a href="https://www.snapchat.com/add/obaapaessentials" style="color: #C85A1F; text-decoration: none; margin: 0 10px;">Snapchat</a> |
                        </p>
                        <p style="margin: 15px 0 0; color: #999999; font-size: 12px;">
                          You're receiving this email because you subscribed to our newsletter.<br>
                          <a href="{{unsubscribe_url}}" style="color: #999999; text-decoration: underline;">Unsubscribe</a>
                        </p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </body>
        </html>
      `,
      text: `
Welcome, ${firstName}! 👋

Hey Gorgeous!

Thank you for subscribing to our newsletter! We're thrilled to have you join our community — lovers of authentically Ghanaian fashion, flavor, and wellness essentials.

You'll be the first to know about:
• New arrivals & exclusive collections
• Special discounts & early access
• Recipes, spice tips & wellness inspiration
• VIP-only offers

${interest ? `We noticed you're interested in ${interest} — we'll make sure to send you updates on pieces you'll love!\n\n` : ""}

Start Shopping: https://www.obaapaessentials.com

Stay connected with us on Instagram and Snapchat!

You're receiving this email because you subscribed to our newsletter.
      `.trim(),
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 500 },
      );
    }

    console.log("Email sent successfully:", data);
    return NextResponse.json({
      success: true,
      emailId: data?.id,
      message: "Email sent and contact stored",
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
