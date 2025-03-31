import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface NeumorphicCardProps {
  children: ReactNode;
  className?: string;
  isFoggy?: boolean;
  isHoverable?: boolean;
  isFloating?: boolean;
  onClick?: () => void;
}

export const NeumorphicCard: React.FC<NeumorphicCardProps> = ({
  children,
  className = '',
  isFoggy = false,
  isHoverable = false,
  isFloating = false,
  onClick,
}) => {
  return (
    <motion.div
      className={`
        neu-element p-6 relative
        ${isFoggy ? 'foggy-glass' : 'bg-mist-100/70'}
        ${isHoverable ? 'hover-lift' : ''}
        ${isFloating ? 'float-element' : ''}
        ${className}
      `}
      whileHover={isHoverable ? { y: -5, scale: 1.02 } : {}}
      whileTap={isHoverable ? { scale: 0.98 } : {}}
      transition={{ duration: 0.7, ease: [0.34, 1.56, 0.64, 1] }}
      onClick={onClick}
    >
      {children}
      <div className="misty-overlay"></div>
    </motion.div>
  );
};

interface NeumorphicButtonProps {
  children: ReactNode;
  className?: string;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isRounded?: boolean;
  onClick?: () => void;
  disabled?: boolean;
  isPulsing?: boolean;
}

export const NeumorphicButton: React.FC<NeumorphicButtonProps> = ({
  children,
  className = '',
  variant = 'primary',
  size = 'md',
  isRounded = true,
  onClick,
  disabled = false,
  isPulsing = false,
}) => {
  const baseClasses = 'font-light tracking-wide transition-all duration-slow';
  
  const variantClasses = {
    primary: 'bg-sky-100/50 text-sky-700 hover:bg-sky-200/50',
    secondary: 'bg-mist-100/30 text-mist-700 hover:bg-mist-200/30',
    ghost: 'bg-transparent text-mist-700 hover:bg-mist-100/20 border border-mist-200/50',
  };
  
  const sizeClasses = {
    sm: 'text-sm py-2 px-4',
    md: 'text-base py-3 px-6',
    lg: 'text-lg py-4 px-8',
  };
  
  const roundedClasses = isRounded ? 'rounded-full' : 'rounded-xl';
  
  return (
    <motion.button
      className={`
        ${baseClasses}
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        ${roundedClasses}
        ${isPulsing ? 'pulse-soft' : ''}
        shadow-neu-sm hover:shadow-neu-md
        disabled:opacity-50 disabled:cursor-not-allowed
        ${className}
      `}
      whileHover={!disabled ? { y: -2 } : {}}
      whileTap={!disabled ? { y: 1, boxShadow: 'inset 3px 3px 6px rgba(0, 0, 0, 0.1)' } : {}}
      transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </motion.button>
  );
};

interface FogBackgroundProps {
  intensity?: 'light' | 'medium' | 'heavy';
  className?: string;
}

export const FogBackground: React.FC<FogBackgroundProps> = ({
  intensity = 'medium',
  className = '',
}) => {
  const intensityMap = {
    light: 'opacity-30 blur-xl',
    medium: 'opacity-50 blur-2xl',
    heavy: 'opacity-70 blur-3xl',
  };
  
  return (
    <div className={`fog-container ${className}`}>
      <div className={`fog ${intensityMap[intensity]}`}></div>
      <div className={`fog fog-2 ${intensityMap[intensity]}`}></div>
    </div>
  );
};

interface GlassModuleProps {
  children: ReactNode;
  className?: string;
  blur?: 'sm' | 'md' | 'lg';
  opacity?: 'low' | 'medium' | 'high';
}

export const GlassModule: React.FC<GlassModuleProps> = ({
  children,
  className = '',
  blur = 'md',
  opacity = 'medium',
}) => {
  const blurMap = {
    sm: 'backdrop-blur-sm',
    md: 'backdrop-blur-md',
    lg: 'backdrop-blur-lg',
  };
  
  const opacityMap = {
    low: 'bg-white/10',
    medium: 'bg-white/20',
    high: 'bg-white/30',
  };
  
  return (
    <div className={`
      rounded-2xl border border-white/20
      ${blurMap[blur]} ${opacityMap[opacity]}
      ${className}
    `}>
      {children}
    </div>
  );
};

interface FloatingElementProps {
  children: ReactNode;
  className?: string;
  amplitude?: number; // Floating amplitude in pixels
  duration?: number; // Animation duration in seconds
}

export const FloatingElement: React.FC<FloatingElementProps> = ({
  children,
  className = '',
  amplitude = 10,
  duration = 6,
}) => {
  return (
    <motion.div
      className={className}
      animate={{
        y: [0, -amplitude, 0, amplitude, 0],
      }}
      transition={{
        duration,
        ease: "easeInOut",
        repeat: Infinity,
        repeatType: "loop",
      }}
    >
      {children}
    </motion.div>
  );
};

export default {
  NeumorphicCard,
  NeumorphicButton,
  FogBackground,
  GlassModule,
  FloatingElement,
};
