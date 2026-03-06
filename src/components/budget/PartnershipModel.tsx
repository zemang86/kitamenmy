"use client";

import {
  Building2,
  Gamepad2,
  ArrowRight,
  Ticket,
  Handshake,
  CheckCircle,
} from "lucide-react";

interface PartnershipModelProps {
  total: number;
}

export default function PartnershipModel({ total }: PartnershipModelProps) {
  const klCommitment = 60_000;
  const productionGap = total - klCommitment;

  return (
    <div className="max-w-[1100px] mx-auto">
      {/* Two-column deal structure */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* KL Tower side */}
        <div className="bg-glass-bg backdrop-blur-[20px] border border-glass-border rounded-3xl p-6 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-accent-secondary to-accent-tertiary" />
          <div className="flex items-center gap-3 mb-5">
            <div className="w-11 h-11 rounded-xl bg-accent-secondary/15 flex items-center justify-center">
              <Building2 size={22} className="text-accent-secondary" />
            </div>
            <div>
              <h3 className="text-lg font-bold">KL Tower</h3>
              <span className="text-text-tertiary text-xs">Venue Partner</span>
            </div>
          </div>

          <div className="space-y-3 mb-6">
            <div className="text-text-tertiary text-[0.7rem] uppercase tracking-wider font-semibold">
              Contributes
            </div>
            <div className="flex items-start gap-2.5">
              <CheckCircle size={16} className="text-accent-secondary mt-0.5 shrink-0" />
              <div>
                <span className="text-sm font-semibold">RM {klCommitment.toLocaleString()}</span>
                <span className="text-text-secondary text-sm"> commitment fee</span>
              </div>
            </div>
            <div className="flex items-start gap-2.5">
              <CheckCircle size={16} className="text-accent-secondary mt-0.5 shrink-0" />
              <span className="text-sm text-text-secondary">Venue &amp; facilities (in-kind)</span>
            </div>
            <div className="flex items-start gap-2.5">
              <CheckCircle size={16} className="text-accent-secondary mt-0.5 shrink-0" />
              <span className="text-sm text-text-secondary">Existing infrastructure &amp; permits</span>
            </div>
          </div>

          <div className="pt-4 border-t border-glass-border">
            <div className="text-text-tertiary text-[0.7rem] uppercase tracking-wider font-semibold mb-2">
              Receives
            </div>
            <div className="flex items-center gap-2.5">
              <Ticket size={16} className="text-accent-primary shrink-0" />
              <span className="text-sm font-semibold text-accent-primary">
                Admission ticket revenue
              </span>
            </div>
            <p className="text-text-tertiary text-xs mt-2 ml-[26px]">
              100% of General Admission + 50% of VIP Experience Pass (jointly curated)
            </p>
          </div>
        </div>

        {/* KITAMEN side */}
        <div className="bg-glass-bg backdrop-blur-[20px] border border-glass-border rounded-3xl p-6 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-accent-primary to-accent-secondary" />
          <div className="flex items-center gap-3 mb-5">
            <div className="w-11 h-11 rounded-xl bg-accent-primary/15 flex items-center justify-center">
              <Gamepad2 size={22} className="text-accent-primary" />
            </div>
            <div>
              <h3 className="text-lg font-bold">KITAMEN</h3>
              <span className="text-text-tertiary text-xs">Event Producer</span>
            </div>
          </div>

          <div className="space-y-3 mb-6">
            <div className="text-text-tertiary text-[0.7rem] uppercase tracking-wider font-semibold">
              Delivers
            </div>
            <div className="flex items-start gap-2.5">
              <CheckCircle size={16} className="text-accent-primary mt-0.5 shrink-0" />
              <span className="text-sm text-text-secondary">Full event production &amp; execution</span>
            </div>
            <div className="flex items-start gap-2.5">
              <CheckCircle size={16} className="text-accent-primary mt-0.5 shrink-0" />
              <span className="text-sm text-text-secondary">Sponsorship sales &amp; management</span>
            </div>
            <div className="flex items-start gap-2.5">
              <CheckCircle size={16} className="text-accent-primary mt-0.5 shrink-0" />
              <span className="text-sm text-text-secondary">Talent, broadcast, ops &amp; marketing</span>
            </div>
          </div>

          <div className="pt-4 border-t border-glass-border">
            <div className="text-text-tertiary text-[0.7rem] uppercase tracking-wider font-semibold mb-2">
              Receives
            </div>
            <div className="flex items-center gap-2.5">
              <Handshake size={16} className="text-accent-primary shrink-0" />
              <span className="text-sm font-semibold text-accent-primary">
                Sponsorship + participation revenue
              </span>
            </div>
            <p className="text-text-tertiary text-xs mt-2 ml-[26px]">
              Sponsorship, tournament fees, LAN seats, exhibitor booths — to fund the RM {productionGap.toLocaleString()} production gap
            </p>
          </div>
        </div>
      </div>

      {/* How it works flow */}
      <div className="bg-glass-bg backdrop-blur-[20px] border border-glass-border rounded-3xl p-6">
        <h3 className="text-sm font-bold mb-5 text-text-tertiary uppercase tracking-wider">
          Why This Works
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="text-center p-4">
            <div className="w-10 h-10 rounded-xl bg-accent-secondary/15 flex items-center justify-center mx-auto mb-3">
              <Building2 size={20} className="text-accent-secondary" />
            </div>
            <div className="text-sm font-semibold mb-1">KL Tower Breaks Even</div>
            <p className="text-text-tertiary text-xs leading-relaxed">
              RM 60K commitment is recoverable from ticket sales alone — conservative estimate already covers it
            </p>
          </div>
          <div className="text-center p-4">
            <div className="w-10 h-10 rounded-xl bg-accent-primary/15 flex items-center justify-center mx-auto mb-3">
              <Gamepad2 size={20} className="text-accent-primary" />
            </div>
            <div className="text-sm font-semibold mb-1">KITAMEN Funds Production</div>
            <p className="text-text-tertiary text-xs leading-relaxed">
              1 Title Sponsor or a mix of Gold + Silver tiers covers the full production budget
            </p>
          </div>
          <div className="text-center p-4">
            <div className="w-10 h-10 rounded-xl bg-[rgba(255,215,0,0.15)] flex items-center justify-center mx-auto mb-3">
              <ArrowRight size={20} className="text-[#ffd700]" />
            </div>
            <div className="text-sm font-semibold mb-1">Aligned Incentives</div>
            <p className="text-text-tertiary text-xs leading-relaxed">
              KL Tower drives attendance (more revenue), KITAMEN delivers quality (more sponsors). Both win.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
