// Proposal scaffold — Configurator component generator
// Generates a ~1200-line React component matching the RevMediaConfigurator pattern

import type { ProposalConfig } from "./types";

function esc(s: string): string {
  return s.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
}

function numFmt(n: number): string {
  return n.toLocaleString("en-US");
}

// ── Section generators ──

function genImports(slug: string): string {
  return `"use client";

import { useState, useCallback, useRef, useEffect, useMemo, Fragment } from "react";
import Link from "next/link";
import { Check } from "lucide-react";
import DynamicIcon from "@/components/ui/DynamicIcon";
import FloatingOrbs from "@/components/effects/FloatingOrbs";
import {
  CORE_COSTS,
  CORE_TOTAL,
  DAYS,
  OPTIONAL_FEATURES,
  PRESETS,
  MIN_BUDGET,
  MAX_BUDGET,
  TIER_COMPARISON,
  IMPACT_METRICS,
  CREW_MEMBERS,
  EQUIPMENT_LIST,
  SHOW_SEGMENTS,
  PORTFOLIO_ITEMS,
  MARQUEE_ITEMS,
  generateQuotationItems,
} from "@/lib/budget-data/${slug}";`;
}

function genAnimatedTotalHook(): string {
  return `// ── Animated Total ──

function useAnimatedTotal(target: number, duration = 500) {
  const [displayed, setDisplayed] = useState(target);
  const currentRef = useRef(target);
  const animIdRef = useRef<number | null>(null);

  useEffect(() => {
    const start = currentRef.current;
    const diff = target - start;
    if (diff === 0) return;

    const startTime = performance.now();
    if (animIdRef.current) cancelAnimationFrame(animIdRef.current);

    function step(now: number) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(start + diff * eased);
      currentRef.current = current;
      setDisplayed(current);
      if (progress < 1) {
        animIdRef.current = requestAnimationFrame(step);
      }
    }
    animIdRef.current = requestAnimationFrame(step);

    return () => {
      if (animIdRef.current) cancelAnimationFrame(animIdRef.current);
    };
  }, [target, duration]);

  return displayed;
}`;
}

function genImpactCounter(): string {
  return `// ── Impact Counter ──

function ImpactCounter({
  target,
  suffix,
  prefix,
  label,
  display,
  even,
}: {
  target: number;
  suffix: string;
  prefix: string;
  label: string;
  display: string;
  even: boolean;
}) {
  const [value, setValue] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
            const startTime = performance.now();
            const dur = 1500;

            function step(now: number) {
              const elapsed = now - startTime;
              const progress = Math.min(elapsed / dur, 1);
              const eased = 1 - Math.pow(1 - progress, 3);
              setValue(Math.round(target * eased));
              if (progress < 1) {
                requestAnimationFrame(step);
              }
            }
            requestAnimationFrame(step);
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target]);

  const text = hasAnimated
    ? \`\${prefix}\${value.toLocaleString()}\${suffix}\`
    : display;

  return (
    <div ref={ref}>
      <div className="bg-glass-bg backdrop-blur-[10px] border border-glass-border rounded-none p-8 text-center scroll-reveal">
        <div
          className={\`text-[clamp(1.5rem,3vw,2rem)] font-extrabold mb-1.5 font-[family-name:var(--font-ibm-plex-mono)] bg-clip-text text-transparent \${
            even
              ? "bg-gradient-to-r from-accent-secondary to-accent-tertiary"
              : "bg-gradient-to-r from-accent-primary to-accent-secondary"
          }\`}
        >
          {text}
        </div>
        <div className="text-[0.8rem] text-text-secondary font-medium">
          {label}
        </div>
      </div>
    </div>
  );
}`;
}

function genMarquee(): string {
  return `// ── Scrolling Marquee ──

function Marquee({ items }: { items: string[] }) {
  const doubled = [...items, ...items];
  return (
    <div className="overflow-hidden bg-glass-bg backdrop-blur-[20px] border-y border-glass-border py-3.5 relative z-[1]">
      <div className="flex w-max animate-marquee-scroll">
        {doubled.map((item, i) => (
          <span key={i} className="flex items-center">
            <span className="text-[0.75rem] font-medium uppercase tracking-[0.12em] text-text-secondary whitespace-nowrap px-6 font-[family-name:var(--font-ibm-plex-mono)]">
              {item}
            </span>
            <span className="w-1.5 h-1.5 bg-accent-primary shrink-0 opacity-60" />
          </span>
        ))}
      </div>
    </div>
  );
}`;
}

function genNavConst(config: ProposalConfig): string {
  const entries = config.nav
    .map((n) => `  { label: "${esc(n.label)}", id: "${esc(n.id)}" },`)
    .join("\n");
  return `// ── Nav Links ──

const NAV_LINKS = [
${entries}
];`;
}

function genTierConsts(config: ProposalConfig): string {
  const { tiers, tierLabels } = config.tierComparison;
  const tierKeysStr = tiers.map((t) => `"${t}"`).join(", ");
  const tierHeaderEntries = tiers
    .map((t, i) => `  ${t}: "${esc(tierLabels[i])}",`)
    .join("\n");

  return `// ── Tier Table Keys ──

const TIER_KEYS = [${tierKeysStr}] as const;
const TIER_HEADERS: Record<(typeof TIER_KEYS)[number], string> = {
${tierHeaderEntries}
};`;
}

function genDownloadQuotation(config: ProposalConfig): string {
  const { budget, company, client, quotation, meta } = config;
  const cur = budget.currency;

  // Build the HTML template as individual lines to avoid nested escaping
  const terms = quotation.terms
    .map((t) => "<li>" + t.replace(/&/g, "&amp;").replace(/"/g, "&quot;") + "</li>")
    .join("");

  // We generate the download function with template literals in the output
  // Using single-quoted strings in the generator to avoid backtick escaping issues
  const lines: string[] = [];
  lines.push("  // Download quotation as printable HTML");
  lines.push("  const downloadQuotation = useCallback(() => {");
  lines.push("    const items = generateQuotationItems(activeFeatureIds);");
  lines.push("    const grandTotal = items.reduce((sum, i) => sum + i.total, 0);");
  lines.push("    const daily = Math.round(grandTotal / DAYS);");
  lines.push("    const preset = PRESETS.find((p) => {");
  lines.push("      const s = new Set(p.features);");
  lines.push("      return (");
  lines.push("        s.size === activeFeatureIds.size &&");
  lines.push("        [...s].every((f) => activeFeatureIds.has(f))");
  lines.push("      );");
  lines.push("    });");
  lines.push('    const label = preset ? preset.label : "Custom";');
  lines.push('    const today = new Date().toLocaleDateString("en-MY", {');
  lines.push('      year: "numeric",');
  lines.push('      month: "long",');
  lines.push('      day: "numeric",');
  lines.push("    });");
  lines.push("");
  lines.push('    let lastCat = "";');
  lines.push("    const rowsHtml = items");
  lines.push("      .map((item) => {");
  lines.push('        let catRow = "";');
  lines.push("        if (item.category !== lastCat) {");
  lines.push("          lastCat = item.category;");
  // Use backtick template in generated code
  lines.push("          catRow = `<tr><td colspan=\"7\" style=\"padding:14px 12px 6px;font-weight:700;font-size:11px;text-transform:uppercase;letter-spacing:0.06em;color:#888;border-bottom:none;\">${item.category}</td></tr>`;");
  lines.push("        }");
  lines.push("        return `${catRow}<tr>");
  lines.push('      <td style="text-align:center;color:#999;width:36px;">${item.no}</td>');
  lines.push('      <td style="font-weight:500;">${item.item}</td>');
  lines.push('      <td style="color:#666;">${item.description}</td>');
  lines.push('      <td style="text-align:center;">${item.qty}</td>');
  lines.push('      <td style="text-align:center;">${item.days}</td>');
  lines.push(`      <td style="text-align:right;">${cur} \${item.rate.toLocaleString()}</td>`);
  lines.push(`      <td style="text-align:right;font-weight:600;">${cur} \${item.total.toLocaleString()}</td>`);
  lines.push("    </tr>`;");
  lines.push("      })");
  lines.push('      .join("");');
  lines.push("");

  // Build the HTML document template
  lines.push("    const html = `<!DOCTYPE html><html lang=\"en\"><head><meta charset=\"utf-8\"><meta name=\"viewport\" content=\"width=device-width,initial-scale=1\"><title>Quotation \\u2014 " + esc(company.brand) + " \\u00d7 " + esc(meta.title) + "</title>");
  lines.push("<style>");
  lines.push("*{margin:0;padding:0;box-sizing:border-box}");
  lines.push("body{font-family:'Segoe UI',system-ui,-apple-system,sans-serif;color:#1a1a1a;padding:48px;max-width:900px;margin:0 auto;font-size:14px;line-height:1.5}");
  lines.push(".header{display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:36px;padding-bottom:16px;border-bottom:3px solid #00c96a}");
  lines.push(".brand{font-size:28px;font-weight:800;letter-spacing:0.08em}");
  lines.push(".brand-sub{font-size:12px;color:#888;margin-top:2px}");
  lines.push(".meta{text-align:right;font-size:12px;color:#666;line-height:1.8}");
  lines.push("h1{font-size:18px;font-weight:700;margin-bottom:6px}");
  lines.push(".client-info{font-size:13px;color:#555;margin-bottom:24px;line-height:1.7}");
  lines.push("table{width:100%;border-collapse:collapse}");
  lines.push("th{background:#f7f7f7;text-align:left;padding:10px 12px;border-bottom:2px solid #ddd;font-weight:600;font-size:11px;text-transform:uppercase;letter-spacing:0.04em;color:#555}");
  lines.push("td{padding:7px 12px;border-bottom:1px solid #eee;font-size:13px}");
  lines.push(".totals{margin-top:0;border-top:2px solid #333}");
  lines.push(".totals td{padding:10px 12px;font-weight:700;font-size:14px}");
  lines.push(".per-day td{font-weight:600;font-size:13px;color:#555;border-top:1px solid #eee}");
  lines.push(".terms{margin-top:40px;font-size:12px;color:#777}");
  lines.push(".terms h3{font-size:13px;color:#333;font-weight:600;margin-bottom:8px}");
  lines.push(".terms ul{padding-left:20px}");
  lines.push(".terms li{margin-bottom:4px}");
  lines.push(".footer{margin-top:48px;padding-top:16px;border-top:1px solid #ddd;font-size:11px;color:#aaa;text-align:center}");
  lines.push("@media print{body{padding:24px}}");
  lines.push("</style></head><body>");
  lines.push(`<div class="header"><div><div class="brand">${esc(company.brand)}</div><div class="brand-sub">${esc(company.brandSub)}</div></div><div class="meta"><div><strong>Date:</strong> \${today}</div><div><strong>Ref:</strong> ${esc(company.ref)}</div><div><strong>Valid:</strong> 30 days</div></div></div>`);
  lines.push(`<h1>Quotation &mdash; ${esc(quotation.title)}</h1>`);
  lines.push(`<div class="client-info"><strong>Client:</strong> ${esc(client.name)}<br><strong>Package:</strong> \${label} (\${DAYS} ${esc(budget.dayLabel.toLowerCase())})<br><strong>Prepared by:</strong> ${esc(company.brandSub)}</div>`);
  lines.push(`<table><thead><tr><th style="width:36px;text-align:center">No.</th><th>Item</th><th>Description</th><th style="width:40px;text-align:center">Qty</th><th style="width:45px;text-align:center">Days</th><th style="width:90px;text-align:right">Rate (${cur})</th><th style="width:100px;text-align:right">Total (${cur})</th></tr></thead><tbody>\${rowsHtml}</tbody></table>`);
  lines.push(`<table class="totals"><tr><td style="text-align:right" colspan="6">Grand Total (\${DAYS} ${esc(budget.dayLabel)})</td><td style="text-align:right;width:100px">${cur} \${grandTotal.toLocaleString()}</td></tr></table>`);
  lines.push(`<table><tr class="per-day"><td style="text-align:right" colspan="6">Per ${esc(budget.dayLabel.replace(/s$/, ""))}</td><td style="text-align:right;width:100px">${cur} \${daily.toLocaleString()}</td></tr></table>`);
  lines.push(`<div class="terms"><h3>Terms &amp; Conditions</h3><ul>${terms}</ul></div>`);
  lines.push(`<div class="footer">${esc(quotation.footer)}</div>`);
  lines.push("</body></html>`;");
  lines.push("");
  lines.push('    const w = window.open("", "_blank");');
  lines.push("    if (w) {");
  lines.push("      w.document.write(html);");
  lines.push("      w.document.close();");
  lines.push("    }");
  lines.push("  }, [activeFeatureIds]);");

  return lines.join("\n");
}

function genMainComponent(config: ProposalConfig): string {
  const { meta, budget, company, client, hero } = config;
  const name = meta.componentName;
  const cur = budget.currency;

  const lines: string[] = [];

  lines.push(`// ── Main Component ──`);
  lines.push("");
  lines.push(`export default function ${name}Configurator() {`);

  // ── State ──
  lines.push("  // Budget state");
  lines.push("  const [activeFeatureIds, setActiveFeatureIds] = useState<Set<string>>(");
  lines.push("    () => new Set(PRESETS[0].features)");
  lines.push("  );");
  lines.push("");
  lines.push("  // Header state");
  lines.push("  const [scrolled, setScrolled] = useState(false);");
  lines.push("");

  // ── Derived calculations ──
  lines.push("  // Derived calculations");
  lines.push("  const optionalTotal = useMemo(() => {");
  lines.push("    let sum = 0;");
  lines.push("    for (const feat of OPTIONAL_FEATURES) {");
  lines.push('      if (activeFeatureIds.has(feat.id)) sum += feat.cost;');
  lines.push("    }");
  lines.push("    return sum;");
  lines.push("  }, [activeFeatureIds]);");
  lines.push("");
  lines.push("  const total = CORE_TOTAL + optionalTotal;");
  lines.push("  const perDay = Math.round(total / DAYS);");
  lines.push("  const displayedTotal = useAnimatedTotal(total);");
  lines.push("  const displayedPerDay = useAnimatedTotal(perDay);");
  lines.push("");
  lines.push("  const rangePct = Math.max(");
  lines.push("    2,");
  lines.push("    Math.min(");
  lines.push("      100,");
  lines.push("      ((total - MIN_BUDGET) / (MAX_BUDGET - MIN_BUDGET)) * 100");
  lines.push("    )");
  lines.push("  );");
  lines.push("");

  // ── Tier detection ──
  lines.push("  // Tier detection");
  lines.push("  const activeTier = useMemo(() => {");
  lines.push("    for (const preset of PRESETS) {");
  lines.push("      const presetSet = new Set(preset.features);");
  lines.push("      if (");
  lines.push("        presetSet.size === activeFeatureIds.size &&");
  lines.push("        [...presetSet].every((f) => activeFeatureIds.has(f))");
  lines.push("      ) {");
  lines.push("        return preset.id;");
  lines.push("      }");
  lines.push("    }");
  lines.push("    return null;");
  lines.push("  }, [activeFeatureIds]);");
  lines.push("");
  lines.push("  const tierLabel = useMemo(() => {");
  lines.push('    const preset = PRESETS.find((p) => p.id === activeTier);');
  lines.push('    return preset ? preset.label : "Custom";');
  lines.push("  }, [activeTier]);");
  lines.push("");

  // ── Max cost for bar widths ──
  lines.push("  // Max cost for bar widths");
  lines.push("  const maxCost = useMemo(() => {");
  lines.push("    return Math.max(");
  lines.push("      ...CORE_COSTS.map((c) => c.cost),");
  lines.push("      ...OPTIONAL_FEATURES.map((f) => f.cost)");
  lines.push("    );");
  lines.push("  }, []);");
  lines.push("");

  // ── Quotation items ──
  lines.push("  // Quotation items");
  lines.push("  const quotationItems = useMemo(");
  lines.push("    () => generateQuotationItems(activeFeatureIds),");
  lines.push("    [activeFeatureIds]");
  lines.push("  );");
  lines.push("");

  // ── Toggle / Apply / Scroll callbacks ──
  lines.push("  // Toggle a feature");
  lines.push("  const toggleFeature = useCallback((featureId: string) => {");
  lines.push("    setActiveFeatureIds((prev) => {");
  lines.push("      const next = new Set(prev);");
  lines.push("      if (next.has(featureId)) {");
  lines.push("        next.delete(featureId);");
  lines.push("      } else {");
  lines.push("        next.add(featureId);");
  lines.push("      }");
  lines.push("      return next;");
  lines.push("    });");
  lines.push("  }, []);");
  lines.push("");
  lines.push("  // Apply preset");
  lines.push("  const applyPreset = useCallback((presetId: string) => {");
  lines.push('    const preset = PRESETS.find((p) => p.id === presetId);');
  lines.push("    if (preset) {");
  lines.push("      setActiveFeatureIds(new Set(preset.features));");
  lines.push("    }");
  lines.push("  }, []);");
  lines.push("");
  lines.push("  // Smooth scroll");
  lines.push("  const scrollTo = useCallback((id: string) => {");
  lines.push("    const el = document.getElementById(id);");
  lines.push("    if (el) {");
  lines.push("      const top = el.getBoundingClientRect().top + window.scrollY - 100;");
  lines.push('      window.scrollTo({ top, behavior: "smooth" });');
  lines.push("    }");
  lines.push("  }, []);");
  lines.push("");

  // ── Download quotation ──
  lines.push(genDownloadQuotation(config));
  lines.push("");

  // ── Scroll listener for header ──
  lines.push("  // ── Scroll listener for header ──");
  lines.push("  useEffect(() => {");
  lines.push("    let ticking = false;");
  lines.push("    function onScroll() {");
  lines.push("      if (!ticking) {");
  lines.push("        requestAnimationFrame(() => {");
  lines.push("          setScrolled(window.scrollY > 80);");
  lines.push("          ticking = false;");
  lines.push("        });");
  lines.push("        ticking = true;");
  lines.push("      }");
  lines.push("    }");
  lines.push('    window.addEventListener("scroll", onScroll, { passive: true });');
  lines.push('    return () => window.removeEventListener("scroll", onScroll);');
  lines.push("  }, []);");
  lines.push("");

  // ── Scroll reveal ──
  lines.push("  // ── Scroll reveal ──");
  lines.push("  const scrollContainerRef = useRef<HTMLDivElement>(null);");
  lines.push("");
  lines.push("  useEffect(() => {");
  lines.push("    const el = scrollContainerRef.current;");
  lines.push("    if (!el) return;");
  lines.push("");
  lines.push("    const observer = new IntersectionObserver(");
  lines.push("      (entries) => {");
  lines.push("        entries.forEach((entry) => {");
  lines.push("          if (entry.isIntersecting) {");
  lines.push('            entry.target.classList.add("revealed");');
  lines.push("            observer.unobserve(entry.target);");
  lines.push("          }");
  lines.push("        });");
  lines.push("      },");
  lines.push('      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }');
  lines.push("    );");
  lines.push("");
  lines.push('    const children = el.querySelectorAll(".scroll-reveal");');
  lines.push("    children.forEach((child) => observer.observe(child));");
  lines.push("");
  lines.push("    return () => observer.disconnect();");
  lines.push("  }, []);");
  lines.push("");

  // ── Tier comparison helpers ──
  lines.push("  // ── Tier comparison helpers ──");
  lines.push("  function cellClass(tier: string): string {");
  lines.push("    if (tier === activeTier) {");
  lines.push('      return "bg-[rgba(0,255,136,0.06)] text-accent-primary font-semibold";');
  lines.push("    }");
  lines.push('    return "text-text-tertiary";');
  lines.push("  }");
  lines.push("");
  lines.push("  function headerCellClass(tier: string): string {");
  lines.push("    if (tier === activeTier) {");
  lines.push('      return "bg-[rgba(0,255,136,0.1)] text-accent-primary shadow-[inset_0_2px_0_var(--color-accent-primary)]";');
  lines.push("    }");
  lines.push('    return "bg-[rgba(255,255,255,0.02)] text-text-tertiary";');
  lines.push("  }");
  lines.push("");

  // ════════════════════ RETURN JSX ════════════════════
  lines.push("  return (");
  lines.push('    <div ref={scrollContainerRef} className="font-[family-name:var(--font-inter)]">');

  // ── MOBILE WARNING ──
  lines.push('      {/* ════════════════════ MOBILE WARNING ════════════════════ */}');
  lines.push('      <div className="fixed inset-0 z-[200] bg-bg-primary flex items-center justify-center p-8 md:hidden">');
  lines.push('        <div className="text-center max-w-[320px]">');
  lines.push('          <div className="w-16 h-16 mx-auto mb-6 bg-[rgba(0,255,136,0.1)] border border-[rgba(0,255,136,0.2)] flex items-center justify-center">');
  lines.push('            <DynamicIcon name="Monitor" size={28} className="text-accent-primary" />');
  lines.push("          </div>");
  lines.push('          <h2 className="text-lg font-bold mb-3 font-[family-name:var(--font-ibm-plex-mono)]">');
  lines.push("            Desktop Only");
  lines.push("          </h2>");
  lines.push('          <p className="text-[0.85rem] text-text-secondary leading-relaxed mb-4">');
  lines.push("            This proposal is optimised for desktop viewing. Please open on a laptop or desktop for the best experience.");
  lines.push("          </p>");
  lines.push('          <span className="inline-block text-[0.65rem] font-semibold tracking-[0.15em] uppercase text-accent-primary py-1.5 px-4 border border-[rgba(0,255,136,0.2)] bg-[rgba(0,255,136,0.05)] font-[family-name:var(--font-ibm-plex-mono)]">');
  lines.push(`            ${esc(company.brand)} &times; ${esc(client.name)}`);
  lines.push("          </span>");
  lines.push("        </div>");
  lines.push("      </div>");
  lines.push("");

  // ── FLOATING ORBS ──
  lines.push("      <div aria-hidden=\"true\">");
  lines.push("        <FloatingOrbs />");
  lines.push("      </div>");
  lines.push("");

  // ── HEADER ──
  lines.push('      {/* ════════════════════ HEADER ════════════════════ */}');
  lines.push("      <header");
  lines.push('        className={`fixed top-0 left-0 right-0 z-[100] px-8 py-3.5 border-b border-glass-border transition-all duration-300 ${');
  lines.push("          scrolled");
  lines.push('            ? \"bg-[rgba(5,5,8,0.95)] backdrop-blur-[20px]\"');
  lines.push('            : \"bg-[rgba(5,5,8,0.6)] backdrop-blur-[10px]\"');
  lines.push("        }`}");
  lines.push("      >");
  lines.push('        <div className="max-w-[1200px] mx-auto flex items-center justify-between">');
  lines.push("          <Link");
  lines.push('            href="/"');
  lines.push('            className="flex items-center gap-3 font-bold text-sm text-text-primary no-underline font-[family-name:var(--font-ibm-plex-mono)] uppercase tracking-[0.05em]"');
  lines.push("          >");
  lines.push('            <div className="w-8 h-8 bg-gradient-to-br from-accent-primary to-accent-secondary flex items-center justify-center">');
  lines.push('              <DynamicIcon name="Radio" size={16} className="text-bg-primary" />');
  lines.push("            </div>");
  lines.push(`            ${esc(company.brand)}`);
  lines.push("          </Link>");
  lines.push("");
  lines.push('          <nav className="flex items-center gap-6">');
  lines.push("            {NAV_LINKS.map((link) => (");
  lines.push("              <button");
  lines.push("                key={link.id}");
  lines.push("                onClick={() => scrollTo(link.id)}");
  lines.push('                className="text-[0.7rem] text-text-tertiary hover:text-text-primary transition-colors uppercase tracking-[0.1em] font-[family-name:var(--font-ibm-plex-mono)] bg-transparent border-none cursor-pointer"');
  lines.push("              >");
  lines.push("                {link.label}");
  lines.push("              </button>");
  lines.push("            ))}");
  lines.push("          </nav>");
  lines.push("        </div>");
  lines.push("      </header>");
  lines.push("");

  // ── MAIN CONTENT ──
  lines.push('      <main id="main-content">');

  // ── HERO ──
  lines.push(genHeroSection(config));

  // ── MARQUEE ──
  lines.push('        {/* ════════════════════ MARQUEE ════════════════════ */}');
  lines.push("        <Marquee items={MARQUEE_ITEMS} />");
  lines.push("");

  // ── PRODUCTION SCOPE ──
  lines.push(genScopeSection());

  // ── BUDGET CONFIGURATOR ──
  lines.push(genBudgetSection(config));

  // ── EQUIPMENT ──
  lines.push(genEquipmentSection());

  // ── TEAM / CREW ──
  lines.push(genTeamSection());

  // ── PORTFOLIO ──
  lines.push(genPortfolioSection());

  // ── IMPACT METRICS ──
  lines.push(genMetricsSection());

  lines.push("      </main>");
  lines.push("");

  // ── FOOTER ──
  lines.push('      {/* ════════════════════ FOOTER ════════════════════ */}');
  lines.push('      <footer className="py-10 border-t border-glass-border text-center relative z-[1]">');
  lines.push('        <div className="max-w-[1200px] mx-auto px-8">');
  lines.push('          <p className="text-[0.75rem] text-text-tertiary font-[family-name:var(--font-ibm-plex-mono)]">');
  lines.push(`            &copy; 2026 ${esc(company.brand)} &middot; ${esc(meta.title)} ${esc(meta.subtitle)}`);
  lines.push("            Proposal &middot;{\" \"}");
  lines.push('            <Link href="/" className="text-accent-primary no-underline">');
  lines.push(`              ${esc(company.website)}`);
  lines.push("            </Link>");
  lines.push("          </p>");
  lines.push("        </div>");
  lines.push("      </footer>");

  lines.push("    </div>");
  lines.push("  );");
  lines.push("}");

  return lines.join("\n");
}

// ── HERO SECTION ──

function genHeroSection(config: ProposalConfig): string {
  const { meta, hero } = config;
  const lines: string[] = [];

  lines.push('        {/* ════════════════════ HERO ════════════════════ */}');
  lines.push('        <section className="pt-32 pb-16 text-center relative z-[1]">');
  lines.push('          <div className="max-w-[1200px] mx-auto px-8">');
  lines.push('            <span className="inline-block text-[0.65rem] font-semibold tracking-[0.2em] uppercase text-accent-primary py-1.5 px-4 border border-[rgba(0,255,136,0.2)] mb-6 bg-[rgba(0,255,136,0.05)] font-[family-name:var(--font-ibm-plex-mono)]">');
  lines.push(`              ${esc(meta.tagline)}`);
  lines.push("            </span>");
  lines.push('            <h1 className="text-[clamp(2rem,5vw,3.5rem)] font-extrabold leading-[1.1] mb-4 bg-gradient-to-r from-accent-primary to-accent-secondary bg-clip-text text-transparent font-[family-name:var(--font-ibm-plex-mono)]">');
  lines.push(`              ${esc(meta.title)}`);
  lines.push("            </h1>");
  lines.push('            <h2 className="text-[clamp(1rem,2.5vw,1.5rem)] font-bold text-text-primary mb-4 font-[family-name:var(--font-ibm-plex-mono)] uppercase tracking-[0.05em]">');
  lines.push(`              ${esc(meta.subtitle)}`);
  lines.push("            </h2>");
  lines.push('            <p className="text-[clamp(0.9rem,1.8vw,1.1rem)] text-text-secondary max-w-[600px] mx-auto mb-12">');
  lines.push(`              ${meta.description}`);
  lines.push("            </p>");
  lines.push("");

  // Stats grid
  lines.push(`            <div className="grid grid-cols-${hero.stats.length} gap-4 max-w-[800px] mx-auto">`);
  lines.push("              {[");
  for (const stat of hero.stats) {
    lines.push(`                { value: "${esc(stat.value)}", label: "${esc(stat.label)}" },`);
  }
  lines.push("              ].map((stat) => (");
  lines.push("                <div");
  lines.push("                  key={stat.label}");
  lines.push('                  className="bg-glass-bg backdrop-blur-[10px] border border-glass-border p-5 text-center scroll-reveal"');
  lines.push("                >");
  lines.push('                  <div className="text-2xl font-extrabold mb-1 bg-gradient-to-r from-accent-primary to-accent-secondary bg-clip-text text-transparent font-[family-name:var(--font-ibm-plex-mono)]">');
  lines.push("                    {stat.value}");
  lines.push("                  </div>");
  lines.push('                  <div className="text-[0.7rem] text-text-tertiary uppercase tracking-[0.1em] font-semibold font-[family-name:var(--font-ibm-plex-mono)]">');
  lines.push("                    {stat.label}");
  lines.push("                  </div>");
  lines.push("                </div>");
  lines.push("              ))}");
  lines.push("            </div>");
  lines.push("");

  // CTAs
  lines.push('            <div className="flex justify-center gap-4 mt-10">');
  lines.push("              <button");
  lines.push(`                onClick={() => scrollTo("${esc(hero.ctaPrimary.target)}")}`);
  lines.push('                className="text-[0.75rem] font-semibold uppercase tracking-[0.1em] py-3 px-8 bg-gradient-to-r from-accent-primary to-accent-secondary text-bg-primary border-none cursor-pointer transition-opacity hover:opacity-90 font-[family-name:var(--font-ibm-plex-mono)]"');
  lines.push("              >");
  lines.push(`                ${esc(hero.ctaPrimary.label)}`);
  lines.push("              </button>");
  lines.push("              <button");
  lines.push(`                onClick={() => scrollTo("${esc(hero.ctaSecondary.target)}")}`);
  lines.push('                className="text-[0.75rem] font-semibold uppercase tracking-[0.1em] py-3 px-8 bg-transparent text-text-primary border border-glass-border cursor-pointer transition-colors hover:border-glass-border-hover hover:bg-glass-bg font-[family-name:var(--font-ibm-plex-mono)]"');
  lines.push("              >");
  lines.push(`                ${esc(hero.ctaSecondary.label)}`);
  lines.push("              </button>");
  lines.push("            </div>");
  lines.push("          </div>");
  lines.push("        </section>");
  lines.push("");

  return lines.join("\n");
}

// ── PRODUCTION SCOPE SECTION ──

function genScopeSection(): string {
  return `        {/* ════════════════════ PRODUCTION SCOPE ════════════════════ */}
        <section id="format" className="py-20 relative z-[1]">
          <div className="max-w-[1200px] mx-auto px-8">
            <div className="text-center mb-14">
              <span className="inline-block text-[0.65rem] font-semibold tracking-[0.2em] uppercase text-accent-secondary py-1.5 px-3 border border-[rgba(0,212,255,0.2)] mb-4 bg-[rgba(0,212,255,0.05)] font-[family-name:var(--font-ibm-plex-mono)]">
                Production Scope
              </span>
              <h2 className="text-[clamp(1.5rem,3vw,2.25rem)] font-extrabold mb-3 font-[family-name:var(--font-ibm-plex-mono)]">
                Our Scope
              </h2>
            </div>

            <div className="grid grid-cols-3 gap-6">
              {SHOW_SEGMENTS.map((seg, idx) => (
                <div
                  key={seg.title}
                  className="bg-glass-bg backdrop-blur-[10px] border border-glass-border p-7 scroll-reveal relative overflow-hidden"
                  style={{ transitionDelay: \`\${idx * 0.1}s\` }}
                >
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-accent-primary to-accent-secondary" />
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-[rgba(0,255,136,0.1)] flex items-center justify-center">
                      <DynamicIcon name={seg.icon} size={20} className="text-accent-primary" />
                    </div>
                    <div>
                      <h3 className="text-[0.9rem] font-bold font-[family-name:var(--font-ibm-plex-mono)]">
                        {seg.title}
                      </h3>
                      <span className="text-[0.7rem] text-accent-primary font-semibold font-[family-name:var(--font-ibm-plex-mono)]">
                        {seg.duration}
                      </span>
                    </div>
                  </div>
                  <p className="text-[0.8rem] text-text-secondary mb-3 leading-relaxed">
                    {seg.description}
                  </p>
                  <ul className="list-none p-0">
                    {seg.items.map((item) => (
                      <li
                        key={item}
                        className="text-[0.75rem] text-text-tertiary py-1 pl-5 relative leading-[1.4]"
                      >
                        <Check
                          size={12}
                          className="absolute left-0 top-[0.35rem] text-accent-primary"
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>
`;
}

// ── BUDGET CONFIGURATOR SECTION ──

function genBudgetSection(config: ProposalConfig): string {
  const { budget, meta } = config;
  const cur = budget.currency;
  const coreTotal = config.coreCosts.reduce((s, c) => s + c.cost, 0);

  const lines: string[] = [];

  lines.push('        {/* ════════════════════ BUDGET CONFIGURATOR ════════════════════ */}');
  lines.push('        <section id="budget" className="py-20 relative z-[1]">');
  lines.push('          <div className="max-w-[1200px] mx-auto px-8">');
  lines.push('            <div className="text-center mb-14">');
  lines.push('              <span className="inline-block text-[0.65rem] font-semibold tracking-[0.2em] uppercase text-accent-secondary py-1.5 px-3 border border-[rgba(0,212,255,0.2)] mb-4 bg-[rgba(0,212,255,0.05)] font-[family-name:var(--font-ibm-plex-mono)]">');
  lines.push("                Configure");
  lines.push("              </span>");
  lines.push('              <h2 className="text-[clamp(1.5rem,3vw,2.25rem)] font-extrabold mb-3 font-[family-name:var(--font-ibm-plex-mono)]">');
  lines.push("                Production Budget");
  lines.push("              </h2>");
  lines.push('              <p className="text-text-secondary max-w-[600px] mx-auto text-[0.95rem]">');
  lines.push(`                Select a preset or toggle individual features to build your`);
  lines.push(`                production package. All prices for ${budget.days} ${budget.dayLabel.toLowerCase()}.`);
  lines.push("              </p>");
  lines.push("            </div>");
  lines.push("");

  // Preset Buttons
  lines.push('            {/* Preset Buttons */}');
  lines.push('            <div className="flex justify-center gap-4 mb-12">');
  lines.push("              {PRESETS.map((preset) => {");
  lines.push("                const isActive = activeTier === preset.id;");
  lines.push("                return (");
  lines.push("                  <button");
  lines.push("                    key={preset.id}");
  lines.push("                    onClick={() => applyPreset(preset.id)}");
  lines.push('                    className={`py-4 px-7 border font-semibold text-[0.85rem] flex flex-col items-center gap-1.5 min-w-[160px] backdrop-blur-[10px] transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] cursor-pointer hover:-translate-y-0.5 font-[family-name:var(--font-ibm-plex-mono)] ${');
  lines.push("                      isActive");
  lines.push('                        ? \"border-[rgba(0,255,136,0.4)] bg-[rgba(0,255,136,0.08)] shadow-[0_0_20px_rgba(0,255,136,0.1)]\"');
  lines.push('                        : \"border-glass-border bg-glass-bg hover:border-glass-border-hover hover:bg-glass-bg-hover\"');
  lines.push("                    }`}");
  lines.push("                  >");
  lines.push('                    <span className="text-text-primary">{preset.label}</span>');
  lines.push('                    <span className="text-[0.65rem] text-text-tertiary font-medium">');
  lines.push("                      {preset.subtitle}");
  lines.push("                    </span>");
  lines.push('                    <span className="text-[0.7rem] text-accent-primary font-medium">');
  lines.push("                      {preset.price} &middot; {preset.perDay}/day");
  lines.push("                    </span>");
  lines.push("                  </button>");
  lines.push("                );");
  lines.push("              })}");
  lines.push("            </div>");
  lines.push("");

  // Core Costs Banner
  lines.push('            {/* Core Costs Banner */}');
  lines.push('            <div className="bg-glass-bg backdrop-blur-[10px] border border-glass-border p-6 px-8 mb-8 scroll-reveal">');
  lines.push('              <div className="flex items-center justify-between mb-4">');
  lines.push('                <h3 className="text-[0.8rem] font-semibold text-text-secondary uppercase tracking-[0.1em] font-[family-name:var(--font-ibm-plex-mono)]">');
  lines.push("                  Core Costs &mdash; Always Included");
  lines.push("                </h3>");
  lines.push('                <span className="text-[0.85rem] font-bold text-accent-primary font-[family-name:var(--font-ibm-plex-mono)]">');
  lines.push(`                  ${cur} ${numFmt(coreTotal)}`);
  lines.push("                </span>");
  lines.push("              </div>");
  lines.push(`              <div className="grid grid-cols-${config.coreCosts.length} gap-3">`);
  lines.push("                {CORE_COSTS.map((core) => (");
  lines.push("                  <div");
  lines.push("                    key={core.id}");
  lines.push('                    className="flex items-center gap-3 py-3 px-4 bg-[rgba(0,255,136,0.04)] border border-[rgba(0,255,136,0.1)]"');
  lines.push("                  >");
  lines.push("                    <DynamicIcon");
  lines.push("                      name={core.icon}");
  lines.push("                      size={16}");
  lines.push('                      className="text-accent-primary shrink-0"');
  lines.push("                    />");
  lines.push('                    <div className="flex-1 min-w-0">');
  lines.push('                      <div className="text-[0.72rem] font-medium text-text-primary leading-tight">');
  lines.push("                        {core.label}");
  lines.push("                      </div>");
  lines.push('                      <div className="text-[0.68rem] text-accent-primary font-semibold font-[family-name:var(--font-ibm-plex-mono)]">');
  lines.push(`                        ${cur} {core.cost.toLocaleString()}`);
  lines.push("                      </div>");
  lines.push("                    </div>");
  lines.push("                  </div>");
  lines.push("                ))}");
  lines.push("              </div>");
  lines.push("            </div>");
  lines.push("");

  // Feature Cards Grid
  lines.push('            {/* Feature Cards Grid */}');
  lines.push('            <div className="grid grid-cols-4 gap-4 mb-12">');
  lines.push("              {OPTIONAL_FEATURES.map((feat) => {");
  lines.push("                const isActive = activeFeatureIds.has(feat.id);");
  lines.push("                return (");
  lines.push("                  <div");
  lines.push("                    key={feat.id}");
  lines.push('                    className={`relative overflow-hidden p-6 backdrop-blur-[20px] border transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] hover:-translate-y-0.5 before:absolute before:top-0 before:left-0 before:w-full before:h-[2px] before:bg-gradient-to-r before:from-accent-primary before:to-accent-secondary before:origin-left before:transition-transform before:duration-400 ${');
  lines.push("                      isActive");
  lines.push('                        ? \"border-glass-border-hover bg-glass-bg-hover shadow-[0_0_20px_rgba(0,255,136,0.08)] before:scale-x-100\"');
  lines.push('                        : \"border-glass-border bg-glass-bg opacity-65 hover:opacity-85 before:scale-x-0 hover:before:scale-x-100\"');
  lines.push("                    }`}");
  lines.push("                  >");
  lines.push('                    {/* Header: icon + toggle */}');
  lines.push('                    <div className="flex items-center justify-between mb-4">');
  lines.push("                      <div");
  lines.push('                        className="w-10 h-10 flex items-center justify-center"');
  lines.push("                        style={{ background: feat.iconBg }}");
  lines.push("                      >");
  lines.push("                        <DynamicIcon");
  lines.push("                          name={feat.icon}");
  lines.push("                          size={20}");
  lines.push("                          className={feat.iconColor}");
  lines.push("                        />");
  lines.push("                      </div>");
  lines.push('                      {/* Square Toggle Switch */}');
  lines.push('                      <label className="relative inline-block w-12 h-[26px] shrink-0 cursor-pointer">');
  lines.push("                        <input");
  lines.push('                          type="checkbox"');
  lines.push("                          checked={isActive}");
  lines.push("                          onChange={() => toggleFeature(feat.id)}");
  lines.push('                          className="opacity-0 w-0 h-0 peer"');
  lines.push("                          aria-label={`Toggle ${feat.label}`}");
  lines.push("                        />");
  lines.push("                        <span className=\"absolute inset-0 bg-[rgba(255,255,255,0.1)] border border-glass-border transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] peer-checked:bg-[rgba(0,255,136,0.3)] peer-checked:border-[rgba(0,255,136,0.5)] peer-checked:shadow-[0_0_10px_var(--color-accent-primary)] before:content-[''] before:absolute before:w-[18px] before:h-[18px] before:left-[3px] before:bottom-[3px] before:bg-text-secondary before:transition-all before:duration-300 before:ease-[cubic-bezier(0.4,0,0.2,1)] peer-checked:before:translate-x-[22px] peer-checked:before:bg-accent-primary peer-checked:before:shadow-[0_0_10px_var(--color-accent-primary)]\" />");
  lines.push("                      </label>");
  lines.push("                    </div>");
  lines.push("");
  lines.push('                    <h3 className="text-[0.85rem] font-bold mb-2 leading-[1.3] font-[family-name:var(--font-ibm-plex-mono)]">');
  lines.push("                      {feat.label}");
  lines.push("                    </h3>");
  lines.push('                    <p className="text-[0.75rem] text-text-secondary leading-[1.5] mb-3">');
  lines.push("                      {feat.description}");
  lines.push("                    </p>");
  lines.push("");
  lines.push('                    {/* Tags */}');
  lines.push('                    <div className="flex flex-wrap gap-1.5 mb-4">');
  lines.push("                      {feat.tags.map((tag) => (");
  lines.push("                        <span");
  lines.push("                          key={tag}");
  lines.push('                          className="text-[0.62rem] py-0.5 px-2 bg-[rgba(255,255,255,0.05)] text-text-tertiary font-medium border border-[rgba(255,255,255,0.06)] font-[family-name:var(--font-ibm-plex-mono)]"');
  lines.push("                        >");
  lines.push("                          {tag}");
  lines.push("                        </span>");
  lines.push("                      ))}");
  lines.push("                    </div>");
  lines.push("");
  lines.push('                    {/* Cost */}');
  lines.push('                    <div className="flex items-center justify-between">');
  lines.push('                      <span className="text-[0.8rem] font-bold text-accent-primary font-[family-name:var(--font-ibm-plex-mono)]">');
  lines.push(`                        ${cur} {feat.cost.toLocaleString()}`);
  lines.push("                      </span>");
  lines.push('                      <span className="text-[0.65rem] text-text-tertiary font-[family-name:var(--font-ibm-plex-mono)]">');
  lines.push(`                        ${cur} {feat.perDay}/day`);
  lines.push("                      </span>");
  lines.push("                    </div>");
  lines.push("                  </div>");
  lines.push("                );");
  lines.push("              })}");
  lines.push("            </div>");
  lines.push("");

  // ── Budget Summary Card ──
  lines.push('            {/* ── Budget Summary Card ── */}');
  lines.push('            <div className="bg-glass-bg backdrop-blur-[10px] border border-glass-border p-10 mb-10 scroll-reveal">');
  lines.push('              {/* Total */}');
  lines.push('              <div className="text-center mb-8">');
  lines.push('                <div className="text-[0.75rem] text-text-tertiary uppercase tracking-[0.15em] font-semibold mb-2 font-[family-name:var(--font-ibm-plex-mono)]">');
  lines.push(`                  Total Investment &mdash; ${budget.days} ${meta.subtitle ? budget.dayLabel : "Days"}`);
  lines.push("                </div>");
  lines.push('                <div className="text-[clamp(2.5rem,5vw,3.5rem)] font-extrabold bg-gradient-to-r from-accent-primary to-accent-secondary bg-clip-text text-transparent mb-2 font-[family-name:var(--font-ibm-plex-mono)]">');
  lines.push(`                  ${cur} {displayedTotal.toLocaleString()}`);
  lines.push("                </div>");
  lines.push('                <div className="flex justify-center gap-6">');
  lines.push('                  <span className="text-[0.8rem] font-semibold py-1 px-4 bg-[rgba(0,255,136,0.1)] text-accent-primary border border-[rgba(0,255,136,0.2)] font-[family-name:var(--font-ibm-plex-mono)]">');
  lines.push("                    {tierLabel}");
  lines.push("                  </span>");
  lines.push('                  <span className="text-[0.8rem] font-semibold py-1 px-4 bg-[rgba(0,212,255,0.1)] text-accent-secondary border border-[rgba(0,212,255,0.2)] font-[family-name:var(--font-ibm-plex-mono)]">');
  lines.push(`                    ${cur} {displayedPerDay.toLocaleString()}/day`);
  lines.push("                  </span>");
  lines.push("                </div>");
  lines.push("              </div>");
  lines.push("");

  // Range Bar
  lines.push('              {/* Range Bar */}');
  lines.push('              <div className="mb-8">');
  lines.push('                <div className="flex justify-between mb-2 text-[0.7rem] text-text-tertiary font-medium font-[family-name:var(--font-ibm-plex-mono)]">');
  lines.push(`                  <span>${cur} ${numFmt(budget.minBudget)}</span>`);
  lines.push(`                  <span>${cur} ${numFmt(budget.maxBudget)}</span>`);
  lines.push("                </div>");
  lines.push('                <div className="h-2 bg-[rgba(255,255,255,0.06)] relative overflow-visible">');
  lines.push("                  <div");
  lines.push('                    className="h-full bg-gradient-to-r from-accent-primary to-accent-secondary transition-all duration-600 ease-[cubic-bezier(0.4,0,0.2,1)] relative"');
  lines.push("                    style={{ width: `${rangePct}%`, minWidth: \"10px\" }}");
  lines.push("                  >");
  lines.push('                    <div className="absolute -right-1.5 top-1/2 -translate-y-1/2 w-3 h-3 bg-accent-primary shadow-[0_0_15px_var(--color-accent-primary),0_0_30px_rgba(0,255,136,0.3)] transition-all duration-600" />');
  lines.push("                  </div>");
  lines.push("                </div>");
  lines.push("              </div>");
  lines.push("");

  // Cost Breakdown
  lines.push('              {/* Cost Breakdown */}');
  lines.push('              <div className="mb-8">');
  lines.push('                <div className="text-[0.75rem] text-text-tertiary uppercase tracking-[0.1em] font-semibold mb-4 font-[family-name:var(--font-ibm-plex-mono)]">');
  lines.push("                  Cost Breakdown");
  lines.push("                </div>");
  lines.push("");

  // Core costs breakdown
  lines.push('                {/* Core costs */}');
  lines.push("                {CORE_COSTS.map((core) => {");
  lines.push("                  const pct = (core.cost / maxCost) * 100;");
  lines.push("                  return (");
  lines.push("                    <div key={core.id}>");
  lines.push('                      <div className="flex items-center gap-4 mb-2">');
  lines.push('                        <div className="w-[160px] text-[0.75rem] text-text-secondary font-medium shrink-0">');
  lines.push("                          {core.label}");
  lines.push("                        </div>");
  lines.push('                        <div className="flex-1 h-[18px] bg-[rgba(255,255,255,0.04)] overflow-hidden">');
  lines.push("                          <div");
  lines.push('                            className="h-full transition-all duration-600 ease-[cubic-bezier(0.4,0,0.2,1)]"');
  lines.push("                            style={{ width: `${pct}%`, background: core.color }}");
  lines.push("                          />");
  lines.push("                        </div>");
  lines.push('                        <div className="w-[90px] text-right text-[0.75rem] font-semibold text-text-secondary tabular-nums shrink-0 font-[family-name:var(--font-ibm-plex-mono)]">');
  lines.push(`                          ${cur} {core.cost.toLocaleString()}`);
  lines.push("                        </div>");
  lines.push("                      </div>");
  lines.push('                      <div className="flex flex-wrap gap-x-4 gap-y-0.5 pb-2 pl-[176px] ml-4">');
  lines.push("                        {core.items.map((item) => (");
  lines.push("                          <span");
  lines.push("                            key={item}");
  lines.push("                            className=\"text-[0.65rem] text-text-tertiary relative pl-3 before:content-[''] before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-1 before:h-1 before:bg-glass-border-hover\"");
  lines.push("                          >");
  lines.push("                            {item}");
  lines.push("                          </span>");
  lines.push("                        ))}");
  lines.push("                      </div>");
  lines.push("                    </div>");
  lines.push("                  );");
  lines.push("                })}");
  lines.push("");

  // Optional features breakdown
  lines.push('                {/* Optional features */}');
  lines.push("                {OPTIONAL_FEATURES.map((feat) => {");
  lines.push("                  const isActive = activeFeatureIds.has(feat.id);");
  lines.push("                  const pct = isActive ? (feat.cost / maxCost) * 100 : 0;");
  lines.push("                  return (");
  lines.push("                    <div key={feat.id}>");
  lines.push("                      <div");
  lines.push('                        className={`flex items-center gap-4 mb-2 transition-opacity duration-300 ${isActive ? "" : "opacity-25"}`}');
  lines.push("                      >");
  lines.push('                        <div className="w-[160px] text-[0.75rem] text-text-secondary font-medium shrink-0">');
  lines.push("                          {feat.label}");
  lines.push("                        </div>");
  lines.push('                        <div className="flex-1 h-[18px] bg-[rgba(255,255,255,0.04)] overflow-hidden">');
  lines.push("                          <div");
  lines.push('                            className="h-full transition-all duration-600 ease-[cubic-bezier(0.4,0,0.2,1)]"');
  lines.push("                            style={{ width: `${pct}%`, background: feat.color }}");
  lines.push("                          />");
  lines.push("                        </div>");
  lines.push('                        <div className="w-[90px] text-right text-[0.75rem] font-semibold text-text-secondary tabular-nums shrink-0 font-[family-name:var(--font-ibm-plex-mono)]">');
  lines.push("                          {isActive");
  lines.push(`                            ? \`${cur} \${feat.cost.toLocaleString()}\``);
  lines.push('                            : "\\u2014"}');
  lines.push("                        </div>");
  lines.push("                      </div>");
  lines.push("                    </div>");
  lines.push("                  );");
  lines.push("                })}");
  lines.push("              </div>");
  lines.push("");

  // Tier Comparison Table
  lines.push('              {/* Tier Comparison Table */}');
  lines.push('              <div className="mt-8">');
  lines.push('                <div className="text-[0.75rem] text-text-tertiary uppercase tracking-[0.1em] font-semibold mb-4 font-[family-name:var(--font-ibm-plex-mono)]">');
  lines.push("                  Tier Comparison");
  lines.push("                </div>");
  lines.push('                <div className="overflow-x-auto">');
  lines.push('                  <table className="w-full border-collapse text-[0.75rem]">');
  lines.push("                    <thead>");
  lines.push("                      <tr>");
  lines.push('                        <th className="py-2.5 px-3.5 text-left border-b border-glass-border font-semibold text-text-tertiary uppercase tracking-[0.05em] text-[0.65rem] bg-[rgba(255,255,255,0.02)] font-[family-name:var(--font-ibm-plex-mono)]">');
  lines.push("                          Aspect");
  lines.push("                        </th>");
  lines.push("                        {TIER_KEYS.map((tier) => (");
  lines.push("                          <th");
  lines.push("                            key={tier}");
  lines.push('                            className={`py-2.5 px-3.5 text-left border-b border-glass-border font-semibold uppercase tracking-[0.05em] text-[0.65rem] transition-colors duration-300 font-[family-name:var(--font-ibm-plex-mono)] ${headerCellClass(tier)}`}');
  lines.push("                          >");
  lines.push("                            {TIER_HEADERS[tier]}");
  lines.push("                          </th>");
  lines.push("                        ))}");
  lines.push("                      </tr>");
  lines.push("                    </thead>");
  lines.push("                    <tbody>");
  lines.push("                      {TIER_COMPARISON.map((row) => (");
  lines.push("                        <tr key={row.aspect}>");
  lines.push('                          <td className="py-2.5 px-3.5 border-b border-glass-border text-text-secondary font-medium">');
  lines.push("                            {row.aspect}");
  lines.push("                          </td>");
  lines.push("                          {TIER_KEYS.map((tier) => (");
  lines.push("                            <td");
  lines.push("                              key={tier}");
  lines.push('                              className={`py-2.5 px-3.5 border-b border-glass-border transition-colors duration-300 font-[family-name:var(--font-ibm-plex-mono)] ${cellClass(tier)}`}');
  lines.push("                            >");
  lines.push("                              {row[tier]}");
  lines.push("                            </td>");
  lines.push("                          ))}");
  lines.push("                        </tr>");
  lines.push("                      ))}");
  lines.push("                    </tbody>");
  lines.push("                  </table>");
  lines.push("                </div>");
  lines.push("              </div>");
  lines.push("");

  // Footnote
  if (meta.footnote) {
    lines.push('              {/* Footnote */}');
    lines.push('              <div className="mt-6 pt-4 border-t border-glass-border text-center">');
    lines.push('                <p className="text-[0.68rem] text-text-tertiary leading-[1.6] italic">');
    lines.push(`                  ${meta.footnote}`);
    lines.push("                </p>");
    lines.push("              </div>");
  }
  lines.push("            </div>");
  lines.push("");

  // ── Quotation Breakdown ──
  lines.push('            {/* ── Quotation Breakdown ── */}');
  lines.push('            <div className="bg-glass-bg backdrop-blur-[10px] border border-glass-border p-10 mb-16 scroll-reveal">');
  lines.push('              <div className="flex items-center justify-between mb-6">');
  lines.push('                <div className="text-[0.75rem] text-text-tertiary uppercase tracking-[0.1em] font-semibold font-[family-name:var(--font-ibm-plex-mono)]">');
  lines.push("                  Quotation Breakdown");
  lines.push("                </div>");
  lines.push("                <button");
  lines.push("                  onClick={downloadQuotation}");
  lines.push('                  className="text-[0.7rem] font-semibold uppercase tracking-[0.08em] py-2 px-5 bg-gradient-to-r from-accent-primary to-accent-secondary text-bg-primary border-none cursor-pointer transition-opacity hover:opacity-90 font-[family-name:var(--font-ibm-plex-mono)] flex items-center gap-2"');
  lines.push("                >");
  lines.push('                  <DynamicIcon name="Download" size={14} className="text-bg-primary" />');
  lines.push("                  Download Quotation");
  lines.push("                </button>");
  lines.push("              </div>");
  lines.push("");
  lines.push('              <div className="overflow-x-auto">');
  lines.push('                <table className="w-full border-collapse text-[0.75rem]">');
  lines.push("                  <thead>");
  lines.push("                    <tr>");
  lines.push('                      <th className="py-2 px-3 text-center border-b border-glass-border text-[0.65rem] text-text-tertiary uppercase tracking-[0.05em] font-semibold font-[family-name:var(--font-ibm-plex-mono)] w-10">');
  lines.push("                        No.");
  lines.push("                      </th>");
  lines.push('                      <th className="py-2 px-3 text-left border-b border-glass-border text-[0.65rem] text-text-tertiary uppercase tracking-[0.05em] font-semibold font-[family-name:var(--font-ibm-plex-mono)]">');
  lines.push("                        Item");
  lines.push("                      </th>");
  lines.push('                      <th className="py-2 px-3 text-left border-b border-glass-border text-[0.65rem] text-text-tertiary uppercase tracking-[0.05em] font-semibold font-[family-name:var(--font-ibm-plex-mono)]">');
  lines.push("                        Description");
  lines.push("                      </th>");
  lines.push('                      <th className="py-2 px-3 text-center border-b border-glass-border text-[0.65rem] text-text-tertiary uppercase tracking-[0.05em] font-semibold font-[family-name:var(--font-ibm-plex-mono)] w-10">');
  lines.push("                        Qty");
  lines.push("                      </th>");
  lines.push('                      <th className="py-2 px-3 text-center border-b border-glass-border text-[0.65rem] text-text-tertiary uppercase tracking-[0.05em] font-semibold font-[family-name:var(--font-ibm-plex-mono)] w-12">');
  lines.push("                        Days");
  lines.push("                      </th>");
  lines.push('                      <th className="py-2 px-3 text-right border-b border-glass-border text-[0.65rem] text-text-tertiary uppercase tracking-[0.05em] font-semibold font-[family-name:var(--font-ibm-plex-mono)] w-24">');
  lines.push("                        Rate");
  lines.push("                      </th>");
  lines.push('                      <th className="py-2 px-3 text-right border-b border-glass-border text-[0.65rem] text-text-tertiary uppercase tracking-[0.05em] font-semibold font-[family-name:var(--font-ibm-plex-mono)] w-28">');
  lines.push("                        Total");
  lines.push("                      </th>");
  lines.push("                    </tr>");
  lines.push("                  </thead>");
  lines.push("                  <tbody>");
  lines.push("                    {quotationItems.map((item, idx) => {");
  lines.push("                      const showCategoryHeader =");
  lines.push("                        idx === 0 || item.category !== quotationItems[idx - 1].category;");
  lines.push("                      return (");
  lines.push("                        <Fragment key={item.no}>");
  lines.push("                          {showCategoryHeader && (");
  lines.push("                            <tr>");
  lines.push("                              <td");
  lines.push("                                colSpan={7}");
  lines.push('                                className="py-2.5 px-3 text-[0.65rem] font-bold uppercase tracking-[0.08em] text-accent-primary border-b border-glass-border bg-[rgba(0,255,136,0.03)] font-[family-name:var(--font-ibm-plex-mono)]"');
  lines.push("                              >");
  lines.push("                                {item.category}");
  lines.push("                              </td>");
  lines.push("                            </tr>");
  lines.push("                          )}");
  lines.push("                          <tr>");
  lines.push('                            <td className="py-2 px-3 border-b border-glass-border text-text-tertiary text-center font-[family-name:var(--font-ibm-plex-mono)]">');
  lines.push("                              {item.no}");
  lines.push("                            </td>");
  lines.push('                            <td className="py-2 px-3 border-b border-glass-border text-text-primary font-medium">');
  lines.push("                              {item.item}");
  lines.push("                            </td>");
  lines.push('                            <td className="py-2 px-3 border-b border-glass-border text-text-secondary">');
  lines.push("                              {item.description}");
  lines.push("                            </td>");
  lines.push('                            <td className="py-2 px-3 border-b border-glass-border text-text-secondary text-center font-[family-name:var(--font-ibm-plex-mono)]">');
  lines.push("                              {item.qty}");
  lines.push("                            </td>");
  lines.push('                            <td className="py-2 px-3 border-b border-glass-border text-text-secondary text-center font-[family-name:var(--font-ibm-plex-mono)]">');
  lines.push("                              {item.days}");
  lines.push("                            </td>");
  lines.push('                            <td className="py-2 px-3 border-b border-glass-border text-text-secondary text-right font-[family-name:var(--font-ibm-plex-mono)]">');
  lines.push(`                              ${cur} {item.rate.toLocaleString()}`);
  lines.push("                            </td>");
  lines.push('                            <td className="py-2 px-3 border-b border-glass-border text-text-primary font-semibold text-right font-[family-name:var(--font-ibm-plex-mono)]">');
  lines.push(`                              ${cur} {item.total.toLocaleString()}`);
  lines.push("                            </td>");
  lines.push("                          </tr>");
  lines.push("                        </Fragment>");
  lines.push("                      );");
  lines.push("                    })}");
  lines.push("                    {/* Grand Total */}");
  lines.push("                    <tr>");
  lines.push("                      <td");
  lines.push("                        colSpan={6}");
  lines.push('                        className="py-3 px-3 border-t-2 border-accent-primary text-right text-text-primary font-bold text-[0.8rem] font-[family-name:var(--font-ibm-plex-mono)]"');
  lines.push("                      >");
  lines.push(`                        Grand Total ({DAYS} ${budget.dayLabel})`);
  lines.push("                      </td>");
  lines.push("                      <td className=\"py-3 px-3 border-t-2 border-accent-primary text-right text-accent-primary font-bold text-[0.85rem] font-[family-name:var(--font-ibm-plex-mono)]\">");
  lines.push(`                        ${cur} {total.toLocaleString()}`);
  lines.push("                      </td>");
  lines.push("                    </tr>");
  lines.push("                    <tr>");
  lines.push("                      <td");
  lines.push("                        colSpan={6}");
  lines.push('                        className="py-2 px-3 text-right text-text-secondary font-semibold text-[0.75rem] font-[family-name:var(--font-ibm-plex-mono)]"');
  lines.push("                      >");
  lines.push(`                        Per ${budget.dayLabel.replace(/s$/, "")}`);
  lines.push("                      </td>");
  lines.push("                      <td className=\"py-2 px-3 text-right text-accent-secondary font-semibold text-[0.8rem] font-[family-name:var(--font-ibm-plex-mono)]\">");
  lines.push(`                        ${cur} {perDay.toLocaleString()}`);
  lines.push("                      </td>");
  lines.push("                    </tr>");
  lines.push("                  </tbody>");
  lines.push("                </table>");
  lines.push("              </div>");
  lines.push("            </div>");
  lines.push("          </div>");
  lines.push("        </section>");
  lines.push("");

  return lines.join("\n");
}

// ── EQUIPMENT SECTION ──

function genEquipmentSection(): string {
  return `        {/* ════════════════════ EQUIPMENT ════════════════════ */}
        <section id="equipment" className="py-20 relative z-[1]">
          <div className="max-w-[1200px] mx-auto px-8">
            <div className="text-center mb-14">
              <span className="inline-block text-[0.65rem] font-semibold tracking-[0.2em] uppercase text-accent-secondary py-1.5 px-3 border border-[rgba(0,212,255,0.2)] mb-4 bg-[rgba(0,212,255,0.05)] font-[family-name:var(--font-ibm-plex-mono)]">
                Production Gear
              </span>
              <h2 className="text-[clamp(1.5rem,3vw,2.25rem)] font-extrabold mb-3 font-[family-name:var(--font-ibm-plex-mono)]">
                Equipment List
              </h2>
            </div>

            <div className="grid grid-cols-3 gap-5">
              {EQUIPMENT_LIST.map((item, idx) => (
                <div
                  key={item.label}
                  className="bg-glass-bg backdrop-blur-[10px] border border-glass-border p-6 flex gap-4 items-start scroll-reveal"
                  style={{ transitionDelay: \`\${idx * 0.08}s\` }}
                >
                  <div className="w-11 h-11 shrink-0 bg-[rgba(0,212,255,0.1)] flex items-center justify-center">
                    <DynamicIcon name={item.icon} size={20} className="text-accent-secondary" />
                  </div>
                  <div>
                    <h3 className="text-[0.85rem] font-bold mb-1 font-[family-name:var(--font-ibm-plex-mono)]">
                      {item.label}
                    </h3>
                    <p className="text-[0.78rem] text-text-secondary leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
`;
}

// ── TEAM / CREW SECTION ──

function genTeamSection(): string {
  return `        {/* ════════════════════ CREW / TEAM ════════════════════ */}
        <section id="team" className="py-20 relative z-[1]">
          <div className="max-w-[1200px] mx-auto px-8">
            <div className="text-center mb-14">
              <span className="inline-block text-[0.65rem] font-semibold tracking-[0.2em] uppercase text-accent-primary py-1.5 px-3 border border-[rgba(0,255,136,0.2)] mb-4 bg-[rgba(0,255,136,0.05)] font-[family-name:var(--font-ibm-plex-mono)]">
                Production Team
              </span>
              <h2 className="text-[clamp(1.5rem,3vw,2.25rem)] font-extrabold mb-3 font-[family-name:var(--font-ibm-plex-mono)]">
                Core Crew
              </h2>
            </div>

            <div className="grid grid-cols-5 gap-5">
              {CREW_MEMBERS.map((member, idx) => (
                <div
                  key={member.role}
                  className="bg-glass-bg backdrop-blur-[10px] border border-glass-border p-6 text-center scroll-reveal"
                  style={{ transitionDelay: \`\${idx * 0.08}s\` }}
                >
                  <div className="w-12 h-12 mx-auto mb-3 bg-[rgba(0,255,136,0.1)] flex items-center justify-center">
                    <DynamicIcon name={member.icon} size={22} className="text-accent-primary" />
                  </div>
                  <h3 className="text-[0.8rem] font-bold mb-2 font-[family-name:var(--font-ibm-plex-mono)]">
                    {member.role}
                  </h3>
                  <p className="text-[0.72rem] text-text-secondary leading-relaxed">
                    {member.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
`;
}

// ── PORTFOLIO SECTION ──

function genPortfolioSection(): string {
  return `        {/* ════════════════════ PORTFOLIO ════════════════════ */}
        <section id="portfolio" className="py-20 relative z-[1]">
          <div className="max-w-[1200px] mx-auto px-8">
            <div className="text-center mb-14">
              <span className="inline-block text-[0.65rem] font-semibold tracking-[0.2em] uppercase text-accent-secondary py-1.5 px-3 border border-[rgba(0,212,255,0.2)] mb-4 bg-[rgba(0,212,255,0.05)] font-[family-name:var(--font-ibm-plex-mono)]">
                Track Record
              </span>
              <h2 className="text-[clamp(1.5rem,3vw,2.25rem)] font-extrabold mb-3 font-[family-name:var(--font-ibm-plex-mono)]">
                Past Broadcast Work
              </h2>
            </div>

            <div className="grid grid-cols-3 gap-5">
              {PORTFOLIO_ITEMS.map((item, idx) => (
                <div
                  key={item.title}
                  className="bg-glass-bg backdrop-blur-[10px] border border-glass-border p-7 scroll-reveal relative overflow-hidden"
                  style={{ transitionDelay: \`\${idx * 0.08}s\` }}
                >
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-accent-secondary to-accent-tertiary" />
                  <div className="w-11 h-11 mb-4 bg-[rgba(0,212,255,0.1)] flex items-center justify-center">
                    <DynamicIcon name={item.icon} size={20} className="text-accent-secondary" />
                  </div>
                  <h3 className="text-[0.9rem] font-bold mb-2 font-[family-name:var(--font-ibm-plex-mono)]">
                    {item.title}
                  </h3>
                  <p className="text-[0.78rem] text-text-secondary leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
`;
}

// ── IMPACT METRICS SECTION ──

function genMetricsSection(): string {
  return `        {/* ════════════════════ IMPACT METRICS ════════════════════ */}
        <section className="py-20 relative z-[1]">
          <div className="max-w-[1200px] mx-auto px-8">
            <div className="text-center mb-14">
              <span className="inline-block text-[0.65rem] font-semibold tracking-[0.2em] uppercase text-accent-secondary py-1.5 px-3 border border-[rgba(0,212,255,0.2)] mb-4 bg-[rgba(0,212,255,0.05)] font-[family-name:var(--font-ibm-plex-mono)]">
                Projected Impact
              </span>
              <h2 className="text-[clamp(1.5rem,3vw,2.25rem)] font-extrabold mb-3 font-[family-name:var(--font-ibm-plex-mono)]">
                At a Glance
              </h2>
            </div>

            <div className="grid grid-cols-5 gap-4">
              {IMPACT_METRICS.map((metric, idx) => (
                <ImpactCounter
                  key={metric.label}
                  target={metric.target}
                  suffix={metric.suffix}
                  prefix={metric.prefix}
                  label={metric.label}
                  display={metric.display}
                  even={idx % 2 === 1}
                />
              ))}
            </div>
          </div>
        </section>
`;
}

// ── MAIN EXPORT ──

export function generateConfigurator(config: ProposalConfig): string {
  const parts: string[] = [];
  parts.push(genImports(config.meta.slug));
  parts.push("");
  parts.push(genAnimatedTotalHook());
  parts.push("");
  parts.push(genImpactCounter());
  parts.push("");
  parts.push(genMarquee());
  parts.push("");
  parts.push(genNavConst(config));
  parts.push("");
  parts.push(genTierConsts(config));
  parts.push("");
  parts.push(genMainComponent(config));
  parts.push("");
  return parts.join("\n");
}
