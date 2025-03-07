import { FeatureItem } from "../../../entities/feature/feature";
import React from "react";

export const FeaturesList = ({ items }: { items: FeatureItem[] }) => (
  <div className="flex items-center justify-between lg:py-6 lg:px-12">
    <div className="flex flex-col flex-wrap -mb-10 lg:w-1/2 lg:text-left text-center">
      {items.map((item) => (
        <FeatureListItem key={item.id} {...item} />
      ))}
    </div>

    <div className="border-2 border-accent rounded-4xl">
      <img
        src="/feature.jpeg"
        alt="Platform features"
        width={400}
        className="rounded-4xl p-4"
      />
    </div>
  </div>
);

export const FeatureListItem = ({ title, description }: FeatureItem) => (
  <div className="flex flex-col mb-10 lg:items-start items-center">
    <div className="flex-grow">
      <h3 className="text-xl font-semibold mb-2 text">{title}</h3>
      <p className="hover-text leading-relaxed">{description}</p>
    </div>
  </div>
);
