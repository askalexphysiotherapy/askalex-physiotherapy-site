import Script from "next/script";
import { clinicJsonLd } from "@/lib/seo";

export function SeoJsonLd() {
	return (
		<Script id="json-ld" type="application/ld+json" strategy="afterInteractive">
			{JSON.stringify(clinicJsonLd)}
		</Script>
	);
}


