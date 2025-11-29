import { NextResponse } from "next/server";
import { contactFormSchema } from "@/lib/validation";
import { sendContactEmail } from "@/lib/email";

export async function POST(req: Request) {
	try {
		const body = await req.json();
		const parsed = contactFormSchema.safeParse(body);
		
		if (!parsed.success) {
			return NextResponse.json(
				{ 
					success: false, 
					error: "Validation failed",
					errors: parsed.error.flatten().fieldErrors 
				}, 
				{ status: 400 }
			);
		}

		// Send email
		await sendContactEmail(parsed.data);

		return NextResponse.json({ success: true });
	} catch (error) {
		console.error("Error sending contact email:", error);
		return NextResponse.json(
			{ 
				success: false, 
				error: "Failed to send email. Please try again later." 
			}, 
			{ status: 500 }
		);
	}
}


