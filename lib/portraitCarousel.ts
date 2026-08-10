import type { CarouselImage } from "@/components/ImageCarousel";
import { site } from "@/lib/content";

/** Portrait + practice photos used on Home and About hero carousels. */
export const portraitCarouselImages: CarouselImage[] = [
	{
		src: site.home.hero.image.src,
		alt: site.home.hero.image.alt
	},
	{
		src: "/images/carousel/care-home-1.png",
		alt: "Alex leading a seated ball-toss activity with care home residents"
	},
	{
		src: "/images/carousel/care-home-2.png",
		alt: "Alex guiding a care home group stretch class"
	},
	{
		src: "/images/carousel/care-home-3.png",
		alt: "Care home residents using ribbons in a physiotherapist-led exercise class"
	},
	{
		src: "/images/carousel/home-visit-1.png",
		alt: "Alex speaking with a smiling client during a home physiotherapy visit"
	}
];
