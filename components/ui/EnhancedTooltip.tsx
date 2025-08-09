import React, { useCallback, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import useScrollLock from '../../utils/useScrollLock';

export interface EnhancedTooltipProps {
  isOpen: boolean;
  onClose: () => void;
  content: React.ReactNode;
  preventBodyScroll?: boolean;
  ariaLabel?: string;
  className?: string;
}

const EnhancedTooltip: React.FC<EnhancedTooltipProps> = ({
  isOpen,
  onClose,
  content,
  preventBodyScroll = true,
  ariaLabel = 'Tooltip dialog',
  className = ''
}) => {
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const { lock, unlock } = useScrollLock(false);

  // lock/unlock body scroll when open changes
  useEffect(() => {
    if (!preventBodyScroll) return;
    if (isOpen) {
      lock();
    } else {
      unlock();
    }
    return () => {
      unlock();
    };
  }, [isOpen, preventBodyScroll, lock, unlock]);

  // Close on ESC
  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.stopPropagation();
        onClose();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen, onClose]);

  // Prevent scroll on overlay for touch devices
  useEffect(() => {
    const overlay = overlayRef.current;
    if (!overlay || !isOpen) return;
    const prevent = (e: TouchEvent) => {
      // if touch originated outside content, prevent scroll
      const target = e.target as Node;
      if (contentRef.current && !contentRef.current.contains(target)) {
        e.preventDefault();
      }
    };
    overlay.addEventListener('touchmove', prevent, { passive: false });
    return () => overlay.removeEventListener('touchmove', prevent as EventListener);
  }, [isOpen]);

  const handleOverlayClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();
      onClose();
    },
    [onClose]
  );

  const handleContentClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  }, []);

  if (!isOpen) return null;
  if (typeof document === 'undefined') return null;

  return createPortal(
    <div
      ref={overlayRef}
      role="dialog"
      aria-modal="true"
      aria-label={ariaLabel}
      className={`fixed inset-0 z-[9999] flex items-center justify-center p-4 ${className}`}
      onClick={handleOverlayClick}
      style={{
        backgroundImage: 'radial-gradient(rgba(0, 0, 0, 0.4) 1px, transparent 1px)',
        backgroundSize: '4px 4px',
        backdropFilter: 'brightness(0.9) blur(3px)',
        animation: 'fadeIn 0.2s ease-out',
        opacity: 1,
        overscrollBehavior: 'contain',
        WebkitOverflowScrolling: 'auto',
        touchAction: 'none'
      }}
    >
      <div
        ref={contentRef}
        className="bg-white rounded-2xl shadow-xl max-w-md w-full p-4 sm:p-6 relative text-gray-800 border-0 outline-none"
        onClick={handleContentClick}
        style={{
          animation: 'zoomIn 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
          maxWidth: '95vw'
        }}
      >
        {content}
      </div>
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes zoomIn {
          from { opacity: 0; transform: scale(0.95) translateY(10px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>
    </div>,
    document.body
  );
};

export default EnhancedTooltip;


