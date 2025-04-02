import React, { useState } from "react";
import Section from '../layout/Section';

interface SimpleAccordionItemProps {
  value: string;
  isOpen?: boolean;
  onToggle?: () => void;
  children: React.ReactNode;
  className?: string;
}

const ChevronDownIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 15 15" {...props}>
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M3.135 6.158a.5.5 0 0 1 .707-.023L7.5 9.565l3.658-3.43a.5.5 0 0 1 .684.73l-4 3.75a.5.5 0 0 1-.684 0l-4-3.75a.5.5 0 0 1-.023-.707"
      clipRule="evenodd"
    />
  </svg>
);

interface SimpleAccordionProps {
  type?: "single" | "multiple";
  collapsible?: boolean;
  children: React.ReactNode;
  defaultValue?: string | null;
  className?: string;
}

const SimpleAccordion: React.FC<SimpleAccordionProps> = ({
  type = "single",
  collapsible = true,
  children,
  defaultValue = null,
  className = "",
}) => {
  const [openValue, setOpenValue] = useState<string | null>(defaultValue);

  const handleTriggerClick = (value: string) => {
    setOpenValue((prevValue) => {
      if (prevValue === value && collapsible) {
        return null;
      }
      return value;
    });
  };

  return (
    <div className={className}>
      {React.Children.map(children, (child) => {
        if (
          React.isValidElement<SimpleAccordionItemProps>(child) &&
          (child.type as any).displayName === "SimpleAccordionItem"
        ) {
          return React.cloneElement<SimpleAccordionItemProps>(child, {
            isOpen: openValue === child.props.value,
            onToggle: () => handleTriggerClick(child.props.value),
            className: child.props.className || "accordion-item",
          });
        }
        return child;
      })}
    </div>
  );
};

const SimpleAccordionItem: React.FC<SimpleAccordionItemProps> = ({
  value,
  isOpen,
  onToggle,
  children,
  className = "",
}) => {
  // Update the type declarations to accept React elements or null
  let trigger: React.ReactElement | null = null;
  let content: React.ReactElement | null = null;

  React.Children.forEach(children, (child) => {
    if (React.isValidElement(child)) {
      if ((child.type as any).displayName === "SimpleAccordionTrigger") {
        trigger = child;
      } else if ((child.type as any).displayName === "SimpleAccordionContent") {
        content = child;
      }
    }
  });

  return (
    <div className={className}>
      {trigger && React.cloneElement(trigger, { isOpen, onClick: onToggle })}
      {content && React.cloneElement(content, { isOpen })}
    </div>
  );
};
SimpleAccordionItem.displayName = "SimpleAccordionItem";

interface SimpleAccordionTriggerProps {
  isOpen?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
}

const SimpleAccordionTrigger: React.FC<SimpleAccordionTriggerProps> = ({ isOpen, onClick, children }) => {
  return (
    <button type="button" onClick={onClick} className={`accordion-trigger ${isOpen ? "open" : ""}`}>
      {children}
      <ChevronDownIcon width={16} height={16} />
    </button>
  );
};
SimpleAccordionTrigger.displayName = "SimpleAccordionTrigger";

interface SimpleAccordionContentProps {
  isOpen?: boolean;
  children: React.ReactNode;
}

const SimpleAccordionContent: React.FC<SimpleAccordionContentProps> = ({ isOpen, children }) => {
  return (
    <div className={`accordion-content ${isOpen ? "open" : ""}`}>
      <div className="accordion-content-text">{children}</div>
    </div>
  );
};
SimpleAccordionContent.displayName = "SimpleAccordionContent";

const items = [
  {
    id: "1",
    title: "Your Creative Journey",
    sub: null,
    content:
      "You've built a business or creative career that sometimes feels like a miracle, but it wasn't luck or a fluke. You created this. Your energy, your choices, and your identity have shaped your current level of progress and success (amazing job, I hope you're hearing roaring applause as you read this). Yet as you continue to carve out a business and career that is uniquely yours, moments of doubt are a natural occurrence. When that doubt becomes chronic or heavy that's because the status quo insists that progress comes only from correctness, obedience, and relentless sacrifice.",
  },
  {
    id: "2",
    title: "Operating Beyond the Status Quo",
    sub: null,
    content:
      "Consider: the status quo is none of your business. You've chosen to be someone who operates from a different plane of reality, one where your desired business and career are continuously inevitable. In your reality (congrats on choosing this one btw, you have great taste), success unfolds on the way you want, and your livelihood is built on your terms and conditions. Your job is to stay connected to that reality and keep stepping into the person who brings this vision to life, over and over again.",
  },
  {
    id: "3",
    title: "Who is the Toolkit for",
    sub: null,
    content:
      "The Realization ToolKit is the hub, a space designed by a creative like you, for creatives like you, the self-led and spirit-driven. It's where you'll find tools that make it easy to operate from a frequency that transcends the norm so you can live and continue developing the business and career you want, the way you want. (Because what you want is divine and genius.)",
  },
  {
    id: "4",
    title: "Other Options",
    sub: null,
    content:
      "*I have also added the option to access either the Alchemical Tools, Power Tools or just the Refiner separately. You can see what's included in all options when you scroll to the bottom.*",
  },
  {
    id: "5",
    title: "Enrollment Information",
    sub: null,
    content:
      "Enrollment is open the first week of every month. See you inside.",
  },
];


const ContentAccordion: React.FC = () => {
  return (
    <Section>
      <div className="accordion-container">
        <h2 className="text-xl font-bold mb-4 text-center">Realization ToolKit</h2>
        <SimpleAccordion type="single" collapsible className="w-full">
          {items.map((item) => (
            <SimpleAccordionItem value={item.id} key={item.id}>
              <SimpleAccordionTrigger>
                <span className="flex flex-col space-y-1">
                  <span className="accordion-title-text">{item.title}</span>
                  {item.sub && <span className="accordion-sub-text">{item.sub}</span>}
                </span>
              </SimpleAccordionTrigger>
              <SimpleAccordionContent>{item.content}</SimpleAccordionContent>
            </SimpleAccordionItem>
          ))}
        </SimpleAccordion>
      </div>
    </Section>
  );
};

interface ErrorBoundaryState {
  hasError: boolean;
  error: any;
}

class ErrorBoundary extends React.Component<{ children?: React.ReactNode }, ErrorBoundaryState> {
  constructor(props: {}) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error: any) {
    return { hasError: true, error: error };
  }
  componentDidCatch(error: any, errorInfo: any) {
    console.error("Accordion rendering error:", error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{ color: "red", padding: "1rem", border: "1px solid red", margin: "1rem" }}>
          <h2>Something went wrong rendering the accordion.</h2>
          <pre>{this.state.error?.message}</pre>
        </div>
      );
    }
    return this.props.children;
  }
}

const MembershipBenefits: React.FC = () => {
  return (
    <ErrorBoundary>
      <ContentAccordion />
    </ErrorBoundary>
  );
};

export default MembershipBenefits;
