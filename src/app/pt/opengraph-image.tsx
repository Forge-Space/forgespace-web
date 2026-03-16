import { ogTemplate, OG_SIZE } from "../_og-template";

export const runtime = "edge";
export const alt = "Forge Space — IDP open-source para times sem equipe de plataforma";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return ogTemplate({
    title: "Geração de código com IA.\nGovernança integrada.",
    subtitle:
      "Plataforma de desenvolvimento open-source com scorecards de governança e trilhas de auditoria. Gratuito.",
    badge: "Open Source · MIT",
  });
}
