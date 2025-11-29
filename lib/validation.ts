import { z } from "zod";

export const bookingSchema = z
	.object({
		type: z.enum(["new", "returning"]),
		name: z.string().min(2, "Please enter your name"),
		email: z.string().email("Enter a valid email"),
		phone: z.string().min(7, "Enter a phone number").optional().or(z.literal("")),
		reason: z.string().min(10, "Please provide a brief reason or your goals"),
		contactWindow: z.string().optional().or(z.literal("")),
		setting: z.enum(["home", "clinic", "online"]).optional(),
		consent: z.literal(true, {
			errorMap: () => ({ message: "You must agree to the Privacy Policy" })
		}),
		hp_field: z.string().optional().or(z.literal(""))
	})
	.refine(
		(data) => {
			// honeypot must be empty
			return !data.hp_field;
		},
		{ path: ["hp_field"], message: "Invalid submission" }
	)
	.refine(
		(data) => {
			// returning clients must select setting
			if (data.type === "returning") return !!data.setting;
			return true;
		},
		{ path: ["setting"], message: "Please choose Home, In-Clinic, or Online" }
	)
	.refine(
		(data) => {
			// new clients encouraged to add a contact window
			if (data.type === "new") return true;
			return true;
		},
		{ path: ["contactWindow"], message: "" }
	);

export type BookingInput = z.infer<typeof bookingSchema>;

// Contact form schema for /contact page
export const contactFormSchema = z.object({
	clientType: z.enum(["new", "returning"]),
	first_name: z.string().min(1, "First name is required"),
	last_name: z.string().min(1, "Last name is required"),
	email: z.string().email("Invalid email address").optional().or(z.literal("")),
	phone: z.string().optional().or(z.literal("")),
	preferred_day: z.string().optional().or(z.literal("")),
	preferred_time_window: z.string().optional().or(z.literal("")),
	description: z.string().optional().or(z.literal("")),
	booking_type: z.string().optional().or(z.literal("")),
	postcode: z.string().optional().or(z.literal("")),
	utm_source: z.string().optional(),
	utm_medium: z.string().optional(),
	utm_campaign: z.string().optional(),
	utm_term: z.string().optional(),
	utm_content: z.string().optional(),
	source_url: z.string().optional()
}).refine(
	(data) => {
		// At least email or phone must be provided
		return !!(data.email || data.phone);
	},
	{
		message: "Please provide at least an email or phone number",
		path: ["email"]
	}
);

export type ContactFormData = z.infer<typeof contactFormSchema>;


