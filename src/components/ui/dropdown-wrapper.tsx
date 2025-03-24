
import React from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

interface DropdownWrapperProps {
  trigger: React.ReactNode;
  children: React.ReactNode;
  align?: 'start' | 'center' | 'end';
  className?: string;
}

export function DropdownWrapper({ 
  trigger, 
  children, 
  align = 'center',
  className 
}: DropdownWrapperProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {trigger}
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align={align} 
        className={className} 
        forceMount
      >
        {children}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
