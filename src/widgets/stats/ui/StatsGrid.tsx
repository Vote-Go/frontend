import React from "react";
import { StatItem } from "../../../entities/stats/stats";
import { Container } from "../../../shared/ui/Container";
import { StatsItem } from "./StatsItem";
import { v4 as uuidv4 } from "uuid";

export const StatsGrid = ({ items }: { items: StatItem[] }) => (
  <Container border>
    <div
      className="flex flex-wrap -m-4 text-center"
      data-testid="flex-container"
    >
      {items.map((item) => (
        <StatsItem key={uuidv4()} value={item.value} label={item.label} />
      ))}
    </div>
  </Container>
);
