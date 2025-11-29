import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Booking & Contact",
  description:
    "Request a free 10–15 min intro call for new clients, or book an initial/follow-up appointment for returning clients. Accessible, secure form.",
};

export default function BookingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
