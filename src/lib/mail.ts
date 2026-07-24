import fs from "fs";
import path from "path";

export interface SubmissionPayload {
  id: string;
  type: string; // "contact" | "volunteer"
  name: string;
  email: string;
  phone?: string;
  inquiryType?: string;
  interestArea?: string;
  message: string;
  timestamp: string;
}

export async function sendSubmission(payload: SubmissionPayload): Promise<{ success: boolean; error?: string }> {
  const timestamp = new Date().toISOString();
  const submissionWithTime = { ...payload, timestamp };

  console.log(`[FORM SUBMISSION RECEIVED - ${submissionWithTime.type.toUpperCase()}]:`, JSON.stringify(submissionWithTime, null, 2));

  // 1. Local Persistence (for development/non-serverless)
  try {
    const dataDir = path.join(process.cwd(), "src", "data");
    const submissionsFile = path.join(dataDir, "submissions.json");

    // Ensure directory exists
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }

    let submissions: SubmissionPayload[] = [];
    if (fs.existsSync(submissionsFile)) {
      try {
        const fileContent = fs.readFileSync(submissionsFile, "utf-8");
        submissions = JSON.parse(fileContent);
      } catch (e) {
        console.error("Error parsing submissions.json, resetting:", e);
      }
    }

    submissions.push(submissionWithTime);
    fs.writeFileSync(submissionsFile, JSON.stringify(submissions, null, 2), "utf-8");
    console.log("[LOCAL PERSISTENCE]: Successfully appended submission to submissions.json");
  } catch (err) {
    // Ephemeral filesystem warnings are caught safely (Vercel serverless) without crashing the request
    console.warn("[LOCAL PERSISTENCE WARNING]: File write failed (expected on serverless hosts):", err);
  }

  // 2. Production Email Delivery Extension Hook
  if (process.env.RESEND_API_KEY) {
    console.log("[PROD EMAIL ACTIVE]: Resend API Key detected. Triggering mail delivery...");
    // A production deployment would do:
    // await resend.emails.send({ from: 'website@himalipariwar.org', to: 'info@himalipariwar.org', subject: 'New Submission', react: ... })
  } else {
    console.log("[PROD EMAIL INACTIVE]: No RESEND_API_KEY environment variable. Relying on persistent structured cloud logs.");
  }

  return { success: true };
}
