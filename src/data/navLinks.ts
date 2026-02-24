export interface NavLink {
  name: string;
  href: string;
}

export const navLinks: NavLink[] = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Chat", href: "/chat" },
  { name: "Review", href: "/review" },
  { name: "Blog", href: "/blog" },
  { name: "FAQ", href: "/faq" },
  { name: "Contact", href: "/contact" },
  { name: "Dashboard", href: "/Dashboard/AdminDashboard" },
];
