export const SITE = {
  name: "Sunset Tea",
  tagline: "Handcrafted boba and matcha for everyday moments and celebrations.",
  shortLine: "Tell us what you're planning. We'll handle the drinks.",
  /** Update after connecting your custom domain. */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  inquiryEmail: "hamzadeif77@gmail.com",
  logo: "/images/sunset_tea_logo_nameless.png",
  social: {
    instagram: "https://instagram.com/sunsettea.co",
    instagramHandle: "sunsettea.co",
    tiktok: "",
  },
  contact: {
    email: "hamzadeif77@gmail.com",
    phone: "8056355192",
    phoneDisplay: "(805) 635-5192",
  },
};

export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/catering", label: "Catering" },
  { href: "/inquiries", label: "Inquiries + FAQ" },
  { href: "/events", label: "Pop-Ups & Events" },
] as const;
