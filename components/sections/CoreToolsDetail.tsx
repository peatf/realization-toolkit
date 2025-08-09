import React from 'react';
import Section from '../layout/Section';

interface ToolSummary {
  name: string;
  whenToUse: string;
  whatItDoes: string;
  timeRequired: string;
}

const toolCollections: ToolSummary[] = [
  {
    name: 'Power Tools Collection',
    whenToUse: 'When seeking momentum, alignment, and business expansion',
    whatItDoes: 'Moves reality forward. Clear action, completed projects, smoother launches, momentum you can measure.',
    timeRequired: '5–45 min per tool (avg 15 min)'
  },
  {
    name: 'Alchemical Tools Collection',
    whenToUse: 'When needing clarity, transformation, and identity evolution',
    whatItDoes: 'Creates internal order. Clean choices, easier access to a steady internal world, behavior that aligns you with your goals AND values.',
    timeRequired: '10–30 min per tool (avg 20 min)'
  }
];

const CoreToolsDetail: React.FC = () => {
  return (
    <Section id="core-tools" className="py-12">
      <div className="container mx-auto px-4 md:px-8">
        <h2 className="font-sans text-3xl md:text-4xl text-[var(--color-foreground)] mb-6 font-light text-center">
          Tool Collections Overview
        </h2>
        <p className="text-center text-[var(--color-secondary)] mb-6">Name • When to Use • What it Does • Time</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {toolCollections.map((tool) => (
            <div
              key={tool.name}
              className="rounded-2xl p-5 bg-white/5 border border-white/10 backdrop-blur-sm"
            >
              <h3 className="text-[var(--color-foreground)] text-xl font-medium mb-3">{tool.name}</h3>
              <div className="space-y-2 text-[var(--color-secondary)]">
                <p><span className="text-[var(--color-foreground)]/80">When to use:</span> {tool.whenToUse}</p>
                <p><span className="text-[var(--color-foreground)]/80">What it does:</span> {tool.whatItDoes}</p>
                <p><span className="text-[var(--color-foreground)]/80">Time:</span> {tool.timeRequired}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
};

export default CoreToolsDetail;


