import { NextResponse } from "next/server";
import { sendSubmission } from "@/lib/mail";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, inquiryType, interestArea, message, honeypot, type } = body;

    // 1. Spam Protection: Honeypot Check
    if (honeypot && honeypot.trim() !== "") {
      console.warn("[SPAM PREVENTION]: Honeypot field filled. Rejecting submission silently.");
      return NextResponse.json(
        { success: true, message: "Submission processed successfully (spam filter)" },
        { status: 200 }
      );
    }

    // 2. Form Input Validation
    if (!name || name.trim() === "") {
      return NextResponse.json({ success: false, error: "Full Name is required." }, { status: 400 });
    }
    if (!email || !email.includes("@")) {
      return NextResponse.json({ success: false, error: "A valid Email Address is required." }, { status: 400 });
    }
    if (!message || message.trim() === "") {
      return NextResponse.json({ success: false, error: "Message content is required." }, { status: 400 });
    }
    if (!type || !["contact", "volunteer"].includes(type)) {
      return NextResponse.json({ success: false, error: "Invalid submission type." }, { status: 400 });
    }

    // 3. Construct Payload
    const payload = {
      id: crypto.randomUUID(),
      type,
      name: name.trim(),
      email: email.trim(),
      phone: phone ? phone.trim() : undefined,
      inquiryType: inquiryType ? inquiryType.trim() : undefined,
      interestArea: interestArea ? interestArea.trim() : undefined,
      message: message.trim(),
      timestamp: new Date().toISOString(),
    };

    // 4. Send Submission (saves locally / logs / triggers email hook)
    const result = await sendSubmission(payload);

    if (result.success) {
      return NextResponse.json({ success: true, message: "Form submitted successfully." });
    } else {
      return NextResponse.json({ success: false, error: result.error || "Submission failed." }, { status: 500 });
    }
  } catch (err) {
    console.error("[SUBMISSIONS API ERROR]:", err);
    return NextResponse.json({ success: false, error: "Internal Server Error." }, { status: 500 });
  }
}
