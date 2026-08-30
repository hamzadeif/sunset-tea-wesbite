export const SITE = {
  name: "Sunset Tea",
  tagline: "Handcrafted boba and matcha for everyday moments and celebrations.",
  shortLine: "Tell us what you're planning. We'll handle the drinks.",
  /** Update after connecting your custom domain. */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  inquiryEmail: "hamzadeif77@gmail.com",
  /** Leave empty until real handles are ready — footer only shows configured links. */
  social: {
    instagram: "",
    tiktok: "",
  },
  contact: {
    email: "",
    phone: "",
  },
};

export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/catering", label: "Catering" },
  { href: "/inquiries", label: "Inquiries + FAQ" },
  { href: "/events", label: "Pop-Ups & Events" },
] as const;
