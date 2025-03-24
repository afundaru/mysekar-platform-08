
import React from 'react';
import {
  Tooltip as TooltipPrimitive,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip';

interface TooltipWrapperProps {
  content: React.ReactNode;
  children: React.ReactNode;
  side?: 'top' | 'right' | 'bottom' | 'left';
  align?: 'start' | 'center' | 'end';
}

export function TooltipWrapper({ content, children, side = 'top', align = 'center' }: TooltipWrapperProps) {
  return (
    <TooltipProvider>
      <TooltipPrimitive>
        <TooltipTrigger asChild>
          {children}
        </TooltipTrigger>
        <TooltipContent side={side} align={align}>
          {content}
        </TooltipContent>
      </TooltipPrimitive>
    </TooltipProvider>
  );
}
