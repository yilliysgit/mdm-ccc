import React from "react";
import HomeHero from "../components/hero/HomeHero";
import SectionUpcoming from "../components/SectionUpcoming";
import SectionRoute from "../components/SectionRoute";
import DesertStory from "../components/ScrollingRevealText/DesertStory";
import ParallaxSection from "../components/parallaxsection/ParallaxSection";
import RallyMapLeafletClient from "../components/kaart/RallyMapLeafletClient";
import PartnersSlider from "../components/slider/PartnerSlider";

const LINES = [
  "Klassieke auto's zijn meer dan voertuigen uit het verleden.",
  "Ze zijn rijdende verhalen van vakmanschap, stijl en trots.",
  "Binnen Marocains du Monde Classic Car Club verbinden deze tijdloze machines generaties, landen en culturen.",
  "Van Casablanca tot Parijs, van Amsterdam tot Marrakech.",
  "Elke oldtimer brengt mensen samen en creëert onvergetelijke momenten.",
  "Onze club is meer dan een autoclub — het is een gemeenschap.",
  "Met rallies, culturele events en educatieve projecten bewaren we erfgoed én stimuleren we verbinding.",
  "Uiteindelijk draait het om de mensen erachter en de verhalen die ze onderweg delen.",
];

export default function Home() {
  return (
    <>
      <HomeHero />
      <RallyMapLeafletClient />
      <SectionUpcoming />
      <SectionRoute />
      <DesertStory
        title="De verbindende kracht van klassiekers"
        lines={LINES}
        primaryCta={{ label: "Ontdek onze rally's", href: "/rallys" }}
        secondaryCta={{ label: "Doe mee aan editie 2025", href: "/inschrijven" }}
      />
      <ParallaxSection
        src="/images/test4.jpg"
        alt="Een klassieke auto rijdt door een uitgestrekte woestijnlandschap onder een heldere blauwe lucht."
        height="70vh"
        overlay={false}
      />

      <PartnersSlider />
    </>
  );
}
