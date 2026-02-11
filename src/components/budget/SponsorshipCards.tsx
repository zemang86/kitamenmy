import { Check } from "lucide-react";
import { SPONSORSHIP_TIERS } from "@/lib/budget-data/kltower";

export default function SponsorshipCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-[1400px] mx-auto">
      {SPONSORSHIP_TIERS.map((tier) => (
        <div
          key={tier.name}
          className={`
            scroll-reveal bg-glass-bg backdrop-blur-[10px] border border-glass-border rounded-2xl p-6
            transition-all duration-400 ease-[cubic-bezier(0.4,0,0.2,1)]
            hover:bg-glass-bg-hover hover:border-glass-border-hover hover:-translate-y-1
            hover:shadow-[0_20px_40px_rgba(0,0,0,0.3),0_0_30px_rgba(0,255,136,0.05)]
            border-t-4 ${tier.colorClass}
          `}
        >
          <div className="text-xs font-bold uppercase tracking-wider text-text-tertiary mb-2">
            {tier.name}
          </div>
          <div className="text-lg font-bold mb-1 bg-gradient-to-br from-accent-primary to-accent-secondary bg-clip-text text-transparent">
            {tier.price}
          </div>
          <div className="text-text-tertiary text-xs mb-5">{tier.slots}</div>

          <ul className="space-y-2.5 mb-6">
            {tier.benefits.map((benefit) => (
              <li
                key={benefit}
                className="flex items-start gap-2 text-text-secondary text-sm leading-relaxed"
              >
                <Check
                  size={14}
                  className="text-accent-primary mt-0.5 shrink-0"
                />
                <span>{benefit}</span>
              </li>
            ))}
          </ul>

          <div className="pt-4 border-t border-glass-border">
            <div className="text-text-tertiary text-[0.7rem] uppercase tracking-wider mb-2 font-medium">
              Potential Sponsors
            </div>
            <div className="flex flex-wrap gap-1.5">
              {tier.potentialSponsors.map((sponsor) => (
                <span
                  key={sponsor}
                  className="inline-block bg-glass-bg border border-glass-border px-2.5 py-1 rounded-md text-xs text-text-secondary"
                >
                  {sponsor}
                </span>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
