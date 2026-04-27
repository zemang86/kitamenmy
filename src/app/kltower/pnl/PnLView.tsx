"use client";

import { useState, useMemo, useCallback } from "react";
import {
  Download,
  TrendingUp,
  TrendingDown,
  Target,
  ArrowRight,
  Info,
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import {
  type ScenarioKey,
  SCENARIO_LABELS,
  COST_CATEGORIES,
  TOTAL_GROSS_COST,
  IN_KIND_OFFSETS,
  REVENUE_STREAMS,
  SPONSORSHIP_TIERS,
  CASH_FLOW_TIMELINE,
  computeScenarioSummary,
  totalRevenueByScenario,
  totalInKindByScenario,
  formatRM,
  formatPct,
  generateCSV,
} from "@/lib/budget-data/kltower-pnl";
import {
  COST_DETAIL,
  generateDetailedCostCSV,
} from "@/lib/budget-data/kltower-cost-detail";

// ── UI Primitives ──────────────────────────────────────────────────────────

function Card({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`bg-white border border-neutral-200 rounded-lg ${className}`}
    >
      {children}
    </div>
  );
}

function SectionHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="mb-6">
      {eyebrow && (
        <div className="text-xs font-medium tracking-widest text-black uppercase mb-2">
          {eyebrow}
        </div>
      )}
      <h2 className="text-2xl font-semibold text-black tracking-tight">
        {title}
      </h2>
      {description && (
        <p className="text-sm text-black mt-2 max-w-2xl">
          {description}
        </p>
      )}
    </div>
  );
}

// ── Main View ──────────────────────────────────────────────────────────────

export default function PnLView() {
  const [scenario, setScenario] = useState<ScenarioKey>("realistic");
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
    new Set(),
  );

  const summary = useMemo(() => computeScenarioSummary(scenario), [scenario]);

  const downloadFile = (csv: string, filename: string) => {
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", filename);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleDownloadCSV = useCallback(() => {
    downloadFile(generateCSV(), "kltower-pnl.csv");
  }, []);

  const handleDownloadCostCSV = useCallback(() => {
    downloadFile(generateDetailedCostCSV(), "kltower-cost-breakdown.csv");
  }, []);

  const toggleCategory = (code: string) => {
    setExpandedCategories((prev) => {
      const next = new Set(prev);
      if (next.has(code)) next.delete(code);
      else next.add(code);
      return next;
    });
  };

  const expandAll = () => {
    setExpandedCategories(new Set(COST_DETAIL.map((c) => c.code)));
  };

  const collapseAll = () => {
    setExpandedCategories(new Set());
  };

  const isProfit = summary.netPL >= 0;

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* ── Header ── */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-sm border-b border-neutral-200">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between gap-4">
          <div>
            <div className="text-xs font-medium tracking-widest text-black uppercase">
              Year 1 Pilot · 2026
            </div>
            <h1 className="text-lg font-semibold text-black tracking-tight">
              Gaming in the Sky · KL Tower — P&L
            </h1>
          </div>
          <button
            onClick={handleDownloadCSV}
            className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-md text-sm font-medium hover:bg-neutral-800 transition-colors"
          >
            <Download className="w-4 h-4" />
            <span>Download CSV</span>
          </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-12 space-y-16">
        {/* ── Scenario Toggle ── */}
        <section>
          <div className="text-xs font-medium tracking-widest text-black uppercase mb-3">
            Scenario
          </div>
          <div className="inline-flex bg-white border border-neutral-200 rounded-lg p-1">
            {(["conservative", "realistic", "optimistic"] as ScenarioKey[]).map(
              (s) => (
                <button
                  key={s}
                  onClick={() => setScenario(s)}
                  className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${
                    scenario === s
                      ? "bg-black text-white"
                      : "text-black hover:text-black"
                  }`}
                >
                  {SCENARIO_LABELS[s]}
                </button>
              ),
            )}
          </div>
        </section>

        {/* ── Headline Numbers ── */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="p-6">
            <div className="text-xs font-medium tracking-wider text-black uppercase mb-2">
              Total Revenue
            </div>
            <div className="text-3xl font-semibold text-black tracking-tight">
              {formatRM(summary.totalRevenue, true)}
            </div>
            <div className="text-xs text-black mt-2">
              {formatRM(summary.totalRevenue)}
            </div>
          </Card>

          <Card className="p-6">
            <div className="text-xs font-medium tracking-wider text-black uppercase mb-2">
              Net Cash Cost
            </div>
            <div className="text-3xl font-semibold text-black tracking-tight">
              {formatRM(summary.netCost, true)}
            </div>
            <div className="text-xs text-black mt-2">
              Gross {formatRM(summary.grossCost, true)} · In-kind offset −
              {formatRM(summary.inKindOffset, true)}
            </div>
          </Card>

          <div className="p-6 bg-black rounded-lg border border-black text-white">
            <div className="text-xs font-medium tracking-wider text-white/70 uppercase mb-2">
              Net P&L
            </div>
            <div className="flex items-baseline gap-2">
              <div className="text-3xl font-semibold tracking-tight text-white">
                {summary.netPL >= 0 ? "+" : ""}
                {formatRM(summary.netPL, true)}
              </div>
              {isProfit ? (
                <TrendingUp className="w-5 h-5 text-white" />
              ) : (
                <TrendingDown className="w-5 h-5 text-white" />
              )}
            </div>
            <div className="text-xs mt-2 font-medium text-white/70">
              {formatPct(summary.netMargin)} net margin
            </div>
          </div>
        </section>

        {/* ── Sponsorship Target Callout ── */}
        <section>
          <div className="p-6 md:p-8 bg-black rounded-lg border border-black text-white">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-md bg-white/10 flex items-center justify-center shrink-0">
                <Target className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <div className="text-xs font-medium tracking-widest text-white/60 uppercase mb-1">
                  Sponsorship Target
                </div>
                <div className="text-2xl md:text-3xl font-semibold tracking-tight">
                  {formatRM(summary.sponsorshipCash, true)} cash sponsorship
                </div>
                <div className="text-sm text-white/70 mt-2">
                  Plus {formatRM(summary.inKindOffset, true)} in-kind offsets ·
                  Combined sponsor value{" "}
                  {formatRM(summary.sponsorshipCash + summary.inKindOffset, true)}
                </div>
                <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-white/10">
                  <div>
                    <div className="text-xs text-white/60 uppercase tracking-wider">
                      Survival
                    </div>
                    <div className="text-lg font-semibold mt-1">RM 700K</div>
                  </div>
                  <div>
                    <div className="text-xs text-white/60 uppercase tracking-wider">
                      Realistic
                    </div>
                    <div className="text-lg font-semibold mt-1">RM 1.2M</div>
                  </div>
                  <div>
                    <div className="text-xs text-white/60 uppercase tracking-wider">
                      Stretch
                    </div>
                    <div className="text-lg font-semibold mt-1">RM 1.8M</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Revenue Breakdown ── */}
        <section>
          <SectionHeader
            eyebrow="Revenue"
            title="Revenue by Stream"
            description={`${SCENARIO_LABELS[scenario]} scenario, with all three scenarios shown for context.`}
          />
          <Card className="overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-neutral-50 border-b border-neutral-200">
                <tr>
                  <th className="text-left px-4 py-3 font-medium text-black text-xs uppercase tracking-wider w-12">
                    #
                  </th>
                  <th className="text-left px-4 py-3 font-medium text-black text-xs uppercase tracking-wider">
                    Stream
                  </th>
                  <th className="text-right px-4 py-3 font-medium text-black text-xs uppercase tracking-wider">
                    Conservative
                  </th>
                  <th className="text-right px-4 py-3 font-medium text-black text-xs uppercase tracking-wider">
                    Realistic
                  </th>
                  <th className="text-right px-4 py-3 font-medium text-black text-xs uppercase tracking-wider">
                    Optimistic
                  </th>
                </tr>
              </thead>
              <tbody>
                {REVENUE_STREAMS.map((rev) => {
                  const activeValue = rev[scenario];
                  return (
                    <tr
                      key={rev.code}
                      className="border-b border-neutral-100 last:border-b-0 hover:bg-neutral-50/50 transition-colors"
                    >
                      <td className="px-4 py-3 text-black font-mono text-xs">
                        {rev.code}
                      </td>
                      <td className="px-4 py-3">
                        <div className="text-black">{rev.name}</div>
                        {rev.note && (
                          <div className="text-xs text-black mt-0.5">
                            {rev.note}
                          </div>
                        )}
                      </td>
                      <td
                        className={`px-4 py-3 text-right tabular-nums ${
                          scenario === "conservative"
                            ? "text-black font-semibold"
                            : "text-black"
                        }`}
                      >
                        {formatRM(rev.conservative)}
                      </td>
                      <td
                        className={`px-4 py-3 text-right tabular-nums ${
                          scenario === "realistic"
                            ? "text-black font-semibold"
                            : "text-black"
                        }`}
                      >
                        {formatRM(rev.realistic)}
                      </td>
                      <td
                        className={`px-4 py-3 text-right tabular-nums ${
                          scenario === "optimistic"
                            ? "text-black font-semibold"
                            : "text-black"
                        }`}
                      >
                        {formatRM(rev.optimistic)}
                      </td>
                    </tr>
                  );
                })}
                <tr className="bg-neutral-100 font-semibold">
                  <td className="px-4 py-3"></td>
                  <td className="px-4 py-3 text-black">Total Revenue</td>
                  <td className="px-4 py-3 text-right tabular-nums text-black">
                    {formatRM(totalRevenueByScenario("conservative"))}
                  </td>
                  <td className="px-4 py-3 text-right tabular-nums text-black">
                    {formatRM(totalRevenueByScenario("realistic"))}
                  </td>
                  <td className="px-4 py-3 text-right tabular-nums text-black">
                    {formatRM(totalRevenueByScenario("optimistic"))}
                  </td>
                </tr>
              </tbody>
            </table>
          </Card>
        </section>

        {/* ── Sponsorship Tier Detail ── */}
        <section>
          <SectionHeader
            eyebrow="Sponsorship"
            title="Sponsorship Tier Pipeline"
            description="Cash targets per tier across scenarios. Hackathon-specific tiers added as separate revenue streams."
          />
          <Card className="overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-neutral-50 border-b border-neutral-200">
                <tr>
                  <th className="text-left px-4 py-3 font-medium text-black text-xs uppercase tracking-wider">
                    Tier
                  </th>
                  <th className="text-left px-4 py-3 font-medium text-black text-xs uppercase tracking-wider">
                    Slots
                  </th>
                  <th className="text-left px-4 py-3 font-medium text-black text-xs uppercase tracking-wider">
                    Unit Price
                  </th>
                  <th className="text-right px-4 py-3 font-medium text-black text-xs uppercase tracking-wider">
                    Conservative
                  </th>
                  <th className="text-right px-4 py-3 font-medium text-black text-xs uppercase tracking-wider">
                    Realistic
                  </th>
                  <th className="text-right px-4 py-3 font-medium text-black text-xs uppercase tracking-wider">
                    Optimistic
                  </th>
                </tr>
              </thead>
              <tbody>
                {SPONSORSHIP_TIERS.map((tier) => (
                  <tr
                    key={tier.name}
                    className="border-b border-neutral-100 last:border-b-0 hover:bg-neutral-50/50"
                  >
                    <td className="px-4 py-3 text-black">{tier.name}</td>
                    <td className="px-4 py-3 text-black">
                      {tier.slots}
                    </td>
                    <td className="px-4 py-3 text-black">
                      {tier.unitPrice}
                    </td>
                    <td
                      className={`px-4 py-3 text-right tabular-nums ${
                        scenario === "conservative"
                          ? "text-black font-semibold"
                          : "text-black"
                      }`}
                    >
                      {formatRM(tier.conservative)}
                    </td>
                    <td
                      className={`px-4 py-3 text-right tabular-nums ${
                        scenario === "realistic"
                          ? "text-black font-semibold"
                          : "text-black"
                      }`}
                    >
                      {formatRM(tier.realistic)}
                    </td>
                    <td
                      className={`px-4 py-3 text-right tabular-nums ${
                        scenario === "optimistic"
                          ? "text-black font-semibold"
                          : "text-black"
                      }`}
                    >
                      {formatRM(tier.optimistic)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        </section>

        {/* ── Cost Breakdown ── */}
        <section>
          <SectionHeader
            eyebrow="Costs"
            title="Cost Categories"
            description="Gross cost across all event categories. Category A is provided in-kind by KL Tower; production cost is RM 2.4M."
          />
          <Card className="overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-neutral-50 border-b border-neutral-200">
                <tr>
                  <th className="text-left px-4 py-3 font-medium text-black text-xs uppercase tracking-wider w-12">
                    #
                  </th>
                  <th className="text-left px-4 py-3 font-medium text-black text-xs uppercase tracking-wider">
                    Category
                  </th>
                  <th className="text-right px-4 py-3 font-medium text-black text-xs uppercase tracking-wider">
                    Cost
                  </th>
                  <th className="text-right px-4 py-3 font-medium text-black text-xs uppercase tracking-wider">
                    % of Total
                  </th>
                </tr>
              </thead>
              <tbody>
                {COST_CATEGORIES.map((cat) => {
                  const pct =
                    TOTAL_GROSS_COST > 0
                      ? (cat.total / TOTAL_GROSS_COST) * 100
                      : 0;
                  return (
                    <tr
                      key={cat.code}
                      className="border-b border-neutral-100 last:border-b-0 hover:bg-neutral-50/50"
                    >
                      <td className="px-4 py-3 text-black font-mono text-xs">
                        {cat.code}
                      </td>
                      <td className="px-4 py-3">
                        <div className="text-black">{cat.name}</div>
                        {cat.note && (
                          <div className="text-xs text-black mt-0.5">
                            {cat.note}
                          </div>
                        )}
                      </td>
                      <td className="px-4 py-3 text-right tabular-nums text-black">
                        {cat.total === 0 ? (
                          <span className="text-black italic">
                            in-kind
                          </span>
                        ) : (
                          formatRM(cat.total)
                        )}
                      </td>
                      <td className="px-4 py-3 text-right tabular-nums text-black">
                        {cat.total === 0 ? "—" : `${pct.toFixed(1)}%`}
                      </td>
                    </tr>
                  );
                })}
                <tr className="bg-neutral-100 font-semibold">
                  <td className="px-4 py-3"></td>
                  <td className="px-4 py-3 text-black">
                    Total Gross Cash Cost
                  </td>
                  <td className="px-4 py-3 text-right tabular-nums text-black">
                    {formatRM(TOTAL_GROSS_COST)}
                  </td>
                  <td className="px-4 py-3 text-right tabular-nums text-black">
                    100%
                  </td>
                </tr>
              </tbody>
            </table>
          </Card>
        </section>

        {/* ── Detailed Cost Breakdown ── */}
        <section>
          <div className="flex items-end justify-between gap-4 mb-6">
            <div>
              <div className="text-xs font-medium tracking-widest text-black uppercase mb-2">
                Cost · Line Items
              </div>
              <h2 className="text-2xl font-semibold text-black tracking-tight">
                Full Cost Breakdown
              </h2>
              <p className="text-sm text-black mt-2 max-w-2xl">
                Every line item across all categories. Click a category to
                expand and see line-by-line detail.
              </p>
            </div>
            <div className="flex gap-2 shrink-0">
              <button
                onClick={expandAll}
                className="px-3 py-1.5 text-xs font-medium text-black bg-white border border-neutral-200 rounded-md hover:bg-neutral-50"
              >
                Expand all
              </button>
              <button
                onClick={collapseAll}
                className="px-3 py-1.5 text-xs font-medium text-black bg-white border border-neutral-200 rounded-md hover:bg-neutral-50"
              >
                Collapse all
              </button>
              <button
                onClick={handleDownloadCostCSV}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-black rounded-md hover:bg-neutral-800 transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                Cost CSV
              </button>
            </div>
          </div>

          <div className="space-y-2">
            {COST_DETAIL.map((cat) => {
              const isOpen = expandedCategories.has(cat.code);
              return (
                <Card key={cat.code} className="overflow-hidden">
                  <button
                    onClick={() => toggleCategory(cat.code)}
                    className="w-full flex items-center gap-3 px-4 py-3 hover:bg-neutral-50 transition-colors"
                  >
                    <div className="text-black">
                      {isOpen ? (
                        <ChevronDown className="w-4 h-4" />
                      ) : (
                        <ChevronRight className="w-4 h-4" />
                      )}
                    </div>
                    <div className="font-mono text-xs text-black w-6">
                      {cat.code}
                    </div>
                    <div className="flex-1 text-left">
                      <div className="text-sm text-black font-medium">
                        {cat.name}
                      </div>
                      {cat.inKind && (
                        <div className="text-xs text-black mt-0.5">
                          Provided in-kind by KL Tower — items pending venue
                          confirmation.
                        </div>
                      )}
                    </div>
                    <div className="tabular-nums text-sm font-semibold text-black">
                      {cat.inKind ? (
                        <span className="text-black italic font-normal">
                          in-kind
                        </span>
                      ) : (
                        formatRM(cat.subtotal)
                      )}
                    </div>
                  </button>

                  {isOpen && (
                    <div className="border-t border-neutral-200 bg-neutral-50/60">
                      {cat.groups.map((grp) => (
                        <div
                          key={grp.code}
                          className="border-b border-neutral-200 last:border-b-0"
                        >
                          <div className="px-4 py-2.5 bg-neutral-100/60">
                            <div className="flex items-baseline gap-2">
                              <span className="font-mono text-xs text-black">
                                {grp.code}
                              </span>
                              <span className="text-xs font-semibold text-black uppercase tracking-wider">
                                {grp.name}
                              </span>
                            </div>
                          </div>
                          <table className="w-full text-sm">
                            <thead>
                              <tr className="border-b border-neutral-200 text-xs text-black uppercase tracking-wider">
                                <th className="text-left px-4 py-2 font-medium">
                                  Item
                                </th>
                                <th className="text-left px-4 py-2 font-medium">
                                  Detail
                                </th>
                                <th className="text-left px-4 py-2 font-medium w-32">
                                  Qty
                                </th>
                                <th className="text-right px-4 py-2 font-medium w-28">
                                  Unit
                                </th>
                                <th className="text-right px-4 py-2 font-medium w-28">
                                  Total
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {grp.items.map((it, idx) => (
                                <tr
                                  key={idx}
                                  className="border-b border-neutral-100 last:border-b-0 hover:bg-white"
                                >
                                  <td className="px-4 py-2.5 text-black">
                                    {it.item}
                                  </td>
                                  <td className="px-4 py-2.5 text-black">
                                    {it.detail}
                                  </td>
                                  <td className="px-4 py-2.5 text-black text-xs">
                                    {it.qty}
                                  </td>
                                  <td className="px-4 py-2.5 text-right tabular-nums text-black text-xs">
                                    {it.unitRM === 0 ? (
                                      <span className="text-black italic">
                                        TBC
                                      </span>
                                    ) : (
                                      formatRM(it.unitRM)
                                    )}
                                  </td>
                                  <td className="px-4 py-2.5 text-right tabular-nums text-black font-medium">
                                    {it.totalRM === 0 ? (
                                      <span className="text-black italic font-normal">
                                        TBC
                                      </span>
                                    ) : (
                                      formatRM(it.totalRM)
                                    )}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      ))}
                      {!cat.inKind && (
                        <div className="px-4 py-3 bg-neutral-100 flex items-center justify-between">
                          <span className="text-xs font-semibold text-black uppercase tracking-wider">
                            Subtotal — {cat.name}
                          </span>
                          <span className="tabular-nums text-sm font-semibold text-black">
                            {formatRM(cat.subtotal)}
                          </span>
                        </div>
                      )}
                    </div>
                  )}
                </Card>
              );
            })}

            <div className="p-4 bg-black rounded-lg text-white flex items-center justify-between">
              <span className="text-sm font-semibold uppercase tracking-wider">
                Total Gross Cash Cost (excl. KL Tower in-kind)
              </span>
              <span className="tabular-nums text-lg font-semibold">
                {formatRM(TOTAL_GROSS_COST)}
              </span>
            </div>
          </div>
        </section>

        {/* ── In-Kind Offsets ── */}
        <section>
          <SectionHeader
            eyebrow="In-Kind Sponsor Offsets"
            title="Non-Cash Sponsor Value"
            description="Sponsor contributions in goods, services, or co-spending — reduces hard cash exposure but doesn't appear in revenue."
          />
          <Card className="overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-neutral-50 border-b border-neutral-200">
                <tr>
                  <th className="text-left px-4 py-3 font-medium text-black text-xs uppercase tracking-wider">
                    Partner
                  </th>
                  <th className="text-left px-4 py-3 font-medium text-black text-xs uppercase tracking-wider">
                    Description
                  </th>
                  <th className="text-right px-4 py-3 font-medium text-black text-xs uppercase tracking-wider">
                    Conservative
                  </th>
                  <th className="text-right px-4 py-3 font-medium text-black text-xs uppercase tracking-wider">
                    Realistic
                  </th>
                  <th className="text-right px-4 py-3 font-medium text-black text-xs uppercase tracking-wider">
                    Optimistic
                  </th>
                </tr>
              </thead>
              <tbody>
                {IN_KIND_OFFSETS.map((o) => (
                  <tr
                    key={o.partner}
                    className="border-b border-neutral-100 last:border-b-0 hover:bg-neutral-50/50"
                  >
                    <td className="px-4 py-3 text-black">{o.partner}</td>
                    <td className="px-4 py-3 text-black">
                      {o.description}
                    </td>
                    <td
                      className={`px-4 py-3 text-right tabular-nums ${
                        scenario === "conservative"
                          ? "text-black font-semibold"
                          : "text-black"
                      }`}
                    >
                      {formatRM(o.conservative)}
                    </td>
                    <td
                      className={`px-4 py-3 text-right tabular-nums ${
                        scenario === "realistic"
                          ? "text-black font-semibold"
                          : "text-black"
                      }`}
                    >
                      {formatRM(o.realistic)}
                    </td>
                    <td
                      className={`px-4 py-3 text-right tabular-nums ${
                        scenario === "optimistic"
                          ? "text-black font-semibold"
                          : "text-black"
                      }`}
                    >
                      {formatRM(o.optimistic)}
                    </td>
                  </tr>
                ))}
                <tr className="bg-neutral-100 font-semibold">
                  <td className="px-4 py-3"></td>
                  <td className="px-4 py-3 text-black">
                    Total In-Kind Offset
                  </td>
                  <td className="px-4 py-3 text-right tabular-nums text-black">
                    {formatRM(totalInKindByScenario("conservative"))}
                  </td>
                  <td className="px-4 py-3 text-right tabular-nums text-black">
                    {formatRM(totalInKindByScenario("realistic"))}
                  </td>
                  <td className="px-4 py-3 text-right tabular-nums text-black">
                    {formatRM(totalInKindByScenario("optimistic"))}
                  </td>
                </tr>
              </tbody>
            </table>
          </Card>
        </section>

        {/* ── Cash Flow Timeline ── */}
        <section>
          <SectionHeader
            eyebrow="Cash Flow"
            title="Cash Flow Timeline (Realistic)"
            description="Month-by-month cash position from T-6 to event week. Note T-1 working capital dip — bridging facility recommended."
          />
          <Card className="overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-neutral-50 border-b border-neutral-200">
                <tr>
                  <th className="text-left px-4 py-3 font-medium text-black text-xs uppercase tracking-wider">
                    Phase
                  </th>
                  <th className="text-left px-4 py-3 font-medium text-black text-xs uppercase tracking-wider">
                    Activity
                  </th>
                  <th className="text-right px-4 py-3 font-medium text-black text-xs uppercase tracking-wider">
                    Cash In
                  </th>
                  <th className="text-right px-4 py-3 font-medium text-black text-xs uppercase tracking-wider">
                    Cash Out
                  </th>
                  <th className="text-right px-4 py-3 font-medium text-black text-xs uppercase tracking-wider">
                    Net
                  </th>
                  <th className="text-right px-4 py-3 font-medium text-black text-xs uppercase tracking-wider">
                    Cumulative
                  </th>
                </tr>
              </thead>
              <tbody>
                {(() => {
                  let cumulative = 0;
                  return CASH_FLOW_TIMELINE.map((cf) => {
                    const net = cf.cashIn - cf.cashOut;
                    cumulative += net;
                    return (
                      <tr
                        key={cf.phase}
                        className="border-b border-neutral-100 last:border-b-0 hover:bg-neutral-50/50"
                      >
                        <td className="px-4 py-3 text-black font-mono text-xs">
                          {cf.phase}
                        </td>
                        <td className="px-4 py-3 text-black">
                          {cf.monthLabel}
                        </td>
                        <td className="px-4 py-3 text-right tabular-nums text-black">
                          {formatRM(cf.cashIn)}
                        </td>
                        <td className="px-4 py-3 text-right tabular-nums text-black">
                          ({formatRM(cf.cashOut)})
                        </td>
                        <td className="px-4 py-3 text-right tabular-nums font-medium text-black">
                          {net >= 0 ? "+" : ""}
                          {formatRM(net)}
                        </td>
                        <td className="px-4 py-3 text-right tabular-nums font-semibold text-black">
                          {formatRM(cumulative)}
                        </td>
                      </tr>
                    );
                  });
                })()}
              </tbody>
            </table>
          </Card>
        </section>

        {/* ── Notes ── */}
        <section>
          <SectionHeader title="Notes & Assumptions" />
          <div className="space-y-3 text-sm text-black">
            <div className="flex gap-3">
              <Info className="w-4 h-4 text-black shrink-0 mt-0.5" />
              <p>
                Pricing basis: 2026 Kuala Lumpur / SEA market rates,
                benchmarked against MPL MY Finals, MPLI, Comic Fiesta KL, MGS
                Asia, and WirForce TW.
              </p>
            </div>
            <div className="flex gap-3">
              <Info className="w-4 h-4 text-black shrink-0 mt-0.5" />
              <p>
                Year 1 framing: brand-establishment pilot. Cost includes 12%
                contingency reserve (industry standard for first-time pilot
                events). All currency figures in Ringgit Malaysia (RM).
              </p>
            </div>
            <div className="flex gap-3">
              <Info className="w-4 h-4 text-black shrink-0 mt-0.5" />
              <p>
                Critical dependencies: Title Sponsor commitment by T-6 months,
                Tourism Malaysia / airline MOU by T-4 months, Hackathon Title
                Sponsor by T-5 months. Without these, scope must downsize.
              </p>
            </div>
            <div className="flex gap-3">
              <Info className="w-4 h-4 text-black shrink-0 mt-0.5" />
              <p>
                Source documents: <code className="bg-neutral-100 px-1 py-0.5 rounded text-xs">costing-brief.md</code>{" "}
                and{" "}
                <code className="bg-neutral-100 px-1 py-0.5 rounded text-xs">revenue-brief.md</code>{" "}
                — full line-item detail available on request.
              </p>
            </div>
          </div>
        </section>

        {/* ── Footer ── */}
        <footer className="pt-8 border-t border-neutral-200">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-sm text-black">
            <div>
              Gaming in the Sky @ KL Tower — Year 1 P&L · Prepared by KITAMEN
              / Special Ops Sdn Bhd
            </div>
            <button
              onClick={handleDownloadCSV}
              className="flex items-center gap-2 text-black hover:text-black font-medium"
            >
              <Download className="w-4 h-4" />
              Download CSV
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </footer>
      </main>
    </div>
  );
}
