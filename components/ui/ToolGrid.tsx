import React from 'react';

export interface ToolGridItem {
  name: string;
  do: string; // activity name / how you use it
  when: string; // usage timing
  outcome: string; // expected outcome
  time: string; // duration
  icon?: string;
}

export interface ToolGridProps {
  items: ToolGridItem[];
  variant?: 'services' | 'tools';
  className?: string;
}

const headerBg = 'bg-white/10 backdrop-blur-sm border border-white/10';
const rowBgDefault = 'bg-white/5';
const rowHover = 'hover:bg-white/10';

const ToolGrid: React.FC<ToolGridProps> = ({ items, variant = 'services', className = '' }) => {
  return (
    <div className={`w-full ${className}`}>
      {/* Headers */}
      <div
        className={`grid grid-cols-2 sm:grid-cols-5 gap-2 sm:gap-4 rounded-2xl p-3 sm:p-4 ${headerBg}`}
      >
        <div className="col-span-2 sm:col-span-1 font-medium text-[var(--color-foreground)]">{variant === 'services' ? 'Service' : 'Tool'}</div>
        <div className="hidden sm:block text-[var(--color-foreground)]/80">Do</div>
        <div className="text-[var(--color-foreground)]/80">When</div>
        <div className="hidden sm:block text-[var(--color-foreground)]/80">Outcome</div>
        <div className="text-[var(--color-foreground)]/80">Time</div>
      </div>

      {/* Rows */}
      <div className="mt-2 space-y-2">
        {items.map((item, idx) => (
          <div
            key={`${item.name}-${idx}`}
            className={`grid grid-cols-2 sm:grid-cols-5 gap-2 sm:gap-4 rounded-2xl p-3 sm:p-4 ${rowBgDefault} ${rowHover} transition-colors`}
          >
            {/* Name */}
            <div className="col-span-2 sm:col-span-1 flex items-center gap-3">
              {item.icon && (
                <img
                  src={item.icon}
                  alt=""
                  className="w-6 h-6 rounded-md object-contain hidden sm:block"
                  loading="lazy"
                />
              )}
              <span className="text-[var(--color-foreground)]">{item.name}</span>
            </div>
            {/* Do */}
            <div className="hidden sm:flex items-center text-[var(--color-secondary)]">{item.do}</div>
            {/* When */}
            <div className="flex items-center text-[var(--color-secondary)]">{item.when}</div>
            {/* Outcome */}
            <div className="hidden sm:flex items-center text-[var(--color-secondary)]">{item.outcome}</div>
            {/* Time */}
            <div className="flex items-center text-[var(--color-secondary)]">{item.time}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ToolGrid;


