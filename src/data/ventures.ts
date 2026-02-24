export interface Venture {
  name: string;
  description: string;
  url?: string;
  urlText: string;
  href?: string;
  comingSoon?: boolean;
}

export const ventures: Venture[] = [
  { name: "KITAMEN", description: "Esports infrastructure — gaming lounges, tournaments, and PlayPod rentals", url: "https://www.kitamen.my", urlText: "kitamen.my →" },
  { name: "1MiLabs", description: "AI training bootcamps for teams and organizations", url: "https://www.1milabs.com", urlText: "1milabs.com →" },
  { name: "Special Ops", description: "Parent company — venture building and operations", url: "https://www.specialops.co", urlText: "specialops.co →" },
  { name: "Edventure+", description: "EdTech platform with adaptive learning paths", url: "https://www.edventure.plus", urlText: "edventure.plus →" },
  { name: "HalalGo Places", description: "Halal food and travel discovery platform", url: "https://www.halalgo.fun", urlText: "halalgo.fun →" },
  { name: "MatchOps", description: "Esports match operations and tournament management", url: "https://www.matchops.my", urlText: "matchops.my →" },
  { name: "ERacing MY", description: "Sim racing community and competitive league", url: "https://www.eracing.my", urlText: "eracing.my →" },
  { name: "FounderX", description: "Founder community and startup resource hub", url: "https://thefounderx.netlify.app", urlText: "founderx.co →" },
  { name: "Damaura", description: "AI-powered digital assistant platform", url: "https://damaura.ai", urlText: "damaura.ai →" },
  { name: "Mimpilab", description: "Creative lab for gaming content and experiences", url: "https://mlbb.my", urlText: "mimpilab.my →" },
  { name: "Central Intelligence", description: "Business intelligence and data automation", url: "https://www.centralintelligence.my", urlText: "centralintelligence.my →" },
  { name: "Aura HFE", description: "Human factors engineering consultancy", url: "https://afhe.io", urlText: "aurahfe.io →" },
  { name: "PlayMasters", description: "Gaming talent and content creator network", url: "https://playmaster.my", urlText: "playmaster.my →" },
  { name: "SuperPA", description: "AI-powered personal assistant for SMEs", urlText: "Coming soon", comingSoon: true },
  { name: "LegalX", description: "AI legal document automation", urlText: "Coming soon", comingSoon: true },
  { name: "Sereniti Lab", description: "", url: "https://sereniti.my", urlText: "sereniti.my →" },
  { name: "Startrise Asia", description: "Startup ecosystem and regional accelerator", url: "https://startrise.asia", urlText: "startrise.asia →" },
];
