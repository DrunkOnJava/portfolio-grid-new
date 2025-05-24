import { useState, useRef, useEffect } from 'react';

interface TooltipProps {
  className?: string;
  content: string;
  placement?: 'top' | 'bottom' | 'left' | 'right';
  children: React.ReactNode;
}

const Tooltip = ({
  className,
  content,
  placement = 'top',
  children,
}: TooltipProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const triggerRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isVisible && triggerRef.current && tooltipRef.current) {
      const triggerRect = triggerRef.current.getBoundingClientRect();
      const tooltipRect = tooltipRef.current.getBoundingClientRect();
      
      let top = 0;
      let left = 0;

      switch (placement) {
        case 'top':
          top = triggerRect.top - tooltipRect.height - 8;
          left = triggerRect.left + (triggerRect.width - tooltipRect.width) / 2;
          break;
        case 'bottom':
          top = triggerRect.bottom + 8;
          left = triggerRect.left + (triggerRect.width - tooltipRect.width) / 2;
          break;
        case 'left':
          top = triggerRect.top + (triggerRect.height - tooltipRect.height) / 2;
          left = triggerRect.left - tooltipRect.width - 8;
          break;
        case 'right':
          top = triggerRect.top + (triggerRect.height - tooltipRect.height) / 2;
          left = triggerRect.right + 8;
          break;
      }

      setPosition({ top, left });
    }
  }, [isVisible, placement]);

  return (
    <>
      <div
        ref={triggerRef}
        className={`inline-flex ${className || ''}`}
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
      >
        {children}
      </div>
      {isVisible && (
        <div
          ref={tooltipRef}
          className="fixed z-50 px-2 py-1 text-sm text-white bg-gray-900 rounded pointer-events-none"
          style={{ top: `${position.top}px`, left: `${position.left}px` }}
        >
          {content}
        </div>
      )}
    </>
  );
};

export default Tooltip;