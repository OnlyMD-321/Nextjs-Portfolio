import emailjs from 'emailjs-com';
import { NextResponse } from "next/server";

export async function POST(request) {
  const payload = await request.json();

  const serviceID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
  const templateID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
  const userID = process.env.NEXT_PUBLIC_EMAILJS_USER_ID;

  if (!serviceID || !templateID || !userID) {
    return NextResponse.json({
      success: false,
      message: "EmailJS configuration error",
    }, { status: 200 });
  }

  try {
    const templateParams = {
      from_name: payload.name,
      from_email: payload.email,
      message_html: payload.message
    };

    const emailResponse = await emailjs.send(serviceID, templateID, templateParams, userID);

    if (emailResponse.status === 200) {
      return NextResponse.json({
        success: true,
        message: "Email sent successfully!",
      }, { status: 200 });
    } else {
      throw new Error("Failed to send email");
    }
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json({
      success: false,
      message: "Email sending failed",
    }, { status: 500 });
  }
}
