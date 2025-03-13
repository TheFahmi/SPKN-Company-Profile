"use client";

import React, { useState, useEffect } from "react";
import HeroSection from "./components/HeroSection";
import CompanySection from "./components/CompanySection";
import VisionMissionSection from "./components/VisionMissionSection";
import JourneySection from "./components/JourneySection";
import TeamSection from "./components/TeamSection";

export default function AboutPage() {
  const [isVisible, setIsVisible] = useState({
    header: false,
    content: false,
    timeline: false,
    values: false,
  });

  useEffect(() => {
    setIsVisible({
      header: true,
      content: true,
      timeline: true,
      values: true,
    });
  }, []);

  return (
    <>
      <HeroSection isVisible={isVisible.header} />
      <CompanySection isVisible={isVisible.content} />
      <VisionMissionSection isVisible={isVisible.values} />
      <JourneySection isVisible={isVisible.timeline} />
      <TeamSection isVisible={isVisible.values} />
    </>
  );
}
