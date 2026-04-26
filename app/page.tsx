// app/page.tsx
import Hero from "@/components/sections/Hero";
import LocationSection from "@/components/sections/LocationSection";
import ProjectSection from "@/components/sections/ProjectSection";
import DeveloperSection from "@/components/sections/DeveloperSection";
import ProcessJourney from "@/components/sections/ProcessJourney";
import InquiryForm from "@/components/ui/InquiryForm";

export default function HomePage() {
  return (
    <>
      <Hero />
      <LocationSection />
      <ProjectSection />
      <DeveloperSection />
      <ProcessJourney />
      <InquiryForm/>
    </>
  );
}