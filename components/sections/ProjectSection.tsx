// components/sections/ProjectSection.tsx
"use client";

import CinematicJourney from "./CinematicJourney";
import PlanpointSection from "./PlanpointSection";
import ProjectGallery from "./ProjectGallery";

export default function ProjectSection() {
  return (
    <section id="project" aria-label="The Project — Azurea Villas">
      <CinematicJourney />
    
   
      <ProjectGallery />
      <PlanpointSection /> {/* <-- Add it here */}
    </section>
  );
}