const footerLinks = [
  { label: "LinkedIn", href: "https://linkedin.com/in/hazmanhassan" },
  { label: "Instagram", href: "https://www.instagram.com/zemang86" },
  { label: "KITAMEN", href: "https://kitamen.my" },
];

export default function Footer() {
  return (
    <footer className="py-8 px-8 border-t border-glass-border bg-[rgba(5,5,8,0.8)] backdrop-blur-[10px]">
      <div className="max-w-[1400px] mx-auto flex items-center justify-between flex-wrap gap-6 max-[480px]:flex-col max-[480px]:text-center">
        <div className="text-text-tertiary text-sm">
          &copy; 2026 Hazman Hassan. All rights reserved.
        </div>
        <nav aria-label="Social links" className="flex gap-6 max-[480px]:flex-wrap max-[480px]:justify-center max-[480px]:gap-2">
          {footerLinks.map(({ label, href }) => (
            <a
              key={href}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-secondary text-sm no-underline p-2 transition-colors duration-300 hover:text-accent-primary"
            >
              {label}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
}
