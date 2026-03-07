import { getPageMetadata } from "@/app/seo";
import OnboardingPage from "./client";

export const metadata = getPageMetadata("onboarding");

export default function Page() {
  return <OnboardingPage />;
}
