// Proposal scaffold — page.tsx generator

import type { ProposalConfig } from "./types";

export function generatePage(config: ProposalConfig): string {
  const { meta, seo } = config;
  const name = meta.componentName;

  return `import type { Metadata } from "next";
import ${name}Configurator from "./${name}Configurator";

export const metadata: Metadata = {
  title: ${JSON.stringify(seo.title)},
  description:
    ${JSON.stringify(seo.description)},
  openGraph: {
    title: ${JSON.stringify(seo.title)},
    description:
      ${JSON.stringify(seo.description)},
  },
};

export default function ${name}Page() {
  return <${name}Configurator />;
}
`;
}
