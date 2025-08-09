import React from 'react';
import Section from '../layout/Section';
import ToolGrid, { ToolGridItem } from '../ui/ToolGrid';

interface ServicesGridSectionProps {
  id?: string;
}

const services: ToolGridItem[] = [
  { name: 'Bi-weekly Calls', do: 'live implementation', when: 'bi-weekly', outcome: 'momentum & feedback', time: '~60–90 min' },
  { name: 'Self Dashboard', do: 'daily tracking', when: 'daily', outcome: 'consistency', time: '2 min/day' },
  { name: 'Tool Library', do: 'on demand', when: 'as needed', outcome: 'internal alignment', time: '5–10 min each' },
];

const ServicesGridSection: React.FC<ServicesGridSectionProps> = ({ id }) => {
  return (
    <Section id={id} className="py-12">
      <div className="container mx-auto px-4 md:px-8">
        <h2 className="font-sans text-3xl md:text-4xl text-[var(--color-foreground)] mb-6 font-light text-center">
          What You Get
        </h2>
        <p className="text-center text-[var(--color-secondary)] mb-6">Do • When • Outcome • Time</p>
        <ToolGrid items={services} variant="services" />
      </div>
    </Section>
  );
};

export default ServicesGridSection;


