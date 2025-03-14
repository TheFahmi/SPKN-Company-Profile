"use client";

import React, { useState, useEffect } from "react";
import HeroSection from "../components/tentang-kami/HeroSection";
import CompanyOverview from "../components/tentang-kami/CompanyOverview";
import VisionMission from "../components/tentang-kami/VisionMission";
import CompanyTimeline from "../components/tentang-kami/CompanyTimeline";
import TeamSection from "../components/tentang-kami/TeamSection";

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
      {/* Hero Section */}
      <HeroSection isVisible={isVisible.header} />

      {/* Company Overview */}
      <CompanyOverview isVisible={isVisible.content} />

      {/* Vision and Mission */}
      <VisionMission isVisible={isVisible.values} />

      {/* Company Timeline */}
      <CompanyTimeline isVisible={isVisible.timeline} />
      
      {/* Team Section */}
      <TeamSection isVisible={isVisible.values} />
    </>
  );
}