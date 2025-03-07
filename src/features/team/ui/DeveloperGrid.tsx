import { AnimatedContainer } from "../../../shared/ui/Container";
import { DEVELOPERS } from "../lib/developers";
import { DeveloperCard } from "./DeveloperCard";
import React from "react";

export const DeveloperGrid = () => (
  <div
    className="my-6 grid grid-cols-3 grid-rows-2 gap-4"
    data-testid="developer-grid"
  >
    {DEVELOPERS.slice(0, 4).map((dev, index) => (
      <AnimatedContainer key={index}>
        <DeveloperCard {...dev} />
      </AnimatedContainer>
    ))}
    <div className="...">
      <AnimatedContainer>
        <DeveloperCard {...DEVELOPERS[4]} />
      </AnimatedContainer>
    </div>
  </div>
);
