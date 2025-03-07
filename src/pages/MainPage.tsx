import { statsItems } from "../features/main/lib/constants";
import { Container } from "../shared/ui/Container";
import { FeaturesBlock } from "../widgets/features/ui/FeaturesBlock";
import { Hero } from "../widgets/hero";
import { StatsGrid } from "../widgets/stats/ui/StatsGrid";
import { TeamSection } from "../widgets/team/TeamSection";
import React from "react";

const MainPage = () => {
  return (
    <>
      <Container border>
        <Hero
          title="Predict. Vote. Earn."
          subtitle="Decentralized prediction market platform where your insight meets opportunity"
        />
      </Container>

      <StatsGrid items={statsItems} />

      <Container border>
        <FeaturesBlock />
      </Container>

      <TeamSection />
    </>
  );
};

export default MainPage;
