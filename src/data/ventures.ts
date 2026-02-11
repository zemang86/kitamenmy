export interface Venture {
  name: string;
  url?: string;
  urlText: string;
  href?: string;
  comingSoon?: boolean;
}

export const ventures: Venture[] = [
  { name: "KITAMEN", url: "https://www.kitamen.my", urlText: "www.kitamen.my \u2192" },
  { name: "1MiLabs", url: "https://www.1milabs.com", urlText: "www.1milabs.com \u2192" },
  { name: "Special Ops", url: "https://www.specialops.co", urlText: "www.specialops.co \u2192" },
  { name: "Edventure+", url: "https://www.edventure.plus", urlText: "www.edventure.plus \u2192" },
  { name: "HalalGo Places", url: "https://www.halalgo.fun", urlText: "www.halalgo.fun \u2192" },
  { name: "MatchOps", url: "https://www.matchops.my", urlText: "www.matchops.my \u2192" },
  { name: "ERacing My", url: "https://www.eracing.my/display", urlText: "www.eracing.my \u2192" },
  { name: "FounderX", url: "https://thefounderx.netlify.app", urlText: "thefounderx.netlify.app \u2192" },
  { name: "Damaura", url: "https://damaura.ai", urlText: "damaura.ai \u2192" },
  { name: "Mimpilab", url: "https://mlbb.my", urlText: "mlbb.my \u2192" },
  { name: "Central Intelligence", url: "https://www.centralintelligence.my", urlText: "www.centralintelligence.my \u2192" },
  { name: "Aura HFE", url: "https://afhe.io", urlText: "afhe.io \u2192" },
  { name: "PlayMasters", url: "https://playmaster.my", urlText: "playmaster.my \u2192" },
  { name: "SuperPA", urlText: "Coming soon", comingSoon: true },
  { name: "LegalX", urlText: "Coming soon", comingSoon: true },
  { name: "Startrise Asia", url: "https://startrise.asia", urlText: "startrise.asia \u2192" },
];
