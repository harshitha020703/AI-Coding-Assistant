
import React from 'react';
import { cn } from '@/lib/utils';

interface HeaderProps {
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ className }) => {
  return (
    <header className={cn("py-6 w-full animate-fade-in", className)}>
      <div className="container px-4 md:px-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center text-primary-foreground">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                className="h-5 w-5"
              >
                <path d="m18 16 4-4-4-4" />
                <path d="m6 8-4 4 4 4" />
                <path d="m14.5 4-5 16" />
              </svg>
            </div>
            <div>
              <h1 className="text-xl font-semibold tracking-tight">DevGenius</h1>
              <p className="text-xs text-muted-foreground">AI-Powered Coding Assistant</p>
            </div>
          </div>
          <nav className="hidden md:flex gap-6">
            <a href="#features" className="text-sm font-medium transition-colors hover:text-primary">Features</a>
            <a href="#" className="text-sm font-medium transition-colors hover:text-primary">Docs</a>
            <a href="#" className="text-sm font-medium transition-colors hover:text-primary">About</a>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
