
import React from 'react';
import { cn } from '@/lib/utils';
import { Feature, FeatureType } from '@/lib/types';
import { Code, MessageSquare, AlertTriangle, Sparkles, ArrowLeftRight, BugOff } from 'lucide-react';

interface FeatureSelectorProps {
  selectedFeature: FeatureType;
  onSelectFeature: (feature: FeatureType) => void;
  className?: string;
}

const FeatureSelector: React.FC<FeatureSelectorProps> = ({ 
  selectedFeature, 
  onSelectFeature,
  className 
}) => {
  const features: Feature[] = [
    {
      id: "question",
      name: "Ask a Question",
      description: "Get AI-generated answers to your coding queries",
      icon: "MessageSquare",
      placeholder: "Ask any coding-related question...",
      buttonText: "Get Answer"
    },
    {
      id: "explanation",
      name: "Code Explanation",
      description: "Break down complex code into simple explanations",
      icon: "Code",
      placeholder: "Paste code you want explained...",
      buttonText: "Explain Code"
    },
    {
      id: "error",
      name: "Error Finder",
      description: "Detect and explain errors in your code",
      icon: "AlertTriangle",
      placeholder: "Paste code with errors...",
      buttonText: "Find Errors"
    },
    {
      id: "error_detection",
      name: "Error Detection",
      description: "Advanced error analysis with corrected code",
      icon: "BugOff",
      placeholder: "Paste code for error detection...",
      buttonText: "Detect Errors"
    },
    {
      id: "optimizer",
      name: "Code Optimizer",
      description: "Refactor and improve your code efficiency",
      icon: "Sparkles",
      placeholder: "Paste code to optimize...",
      buttonText: "Optimize Code"
    },
    {
      id: "translator",
      name: "Language Translator",
      description: "Convert code between programming languages",
      icon: "ArrowLeftRight",
      placeholder: "Paste code to translate...",
      buttonText: "Translate Code"
    }
  ];
  
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'MessageSquare': return <MessageSquare className="h-6 w-6" />;
      case 'Code': return <Code className="h-6 w-6" />;
      case 'AlertTriangle': return <AlertTriangle className="h-6 w-6" />;
      case 'Sparkles': return <Sparkles className="h-6 w-6" />;
      case 'ArrowLeftRight': return <ArrowLeftRight className="h-6 w-6" />;
      case 'BugOff': return <BugOff className="h-6 w-6" />;
      default: return <Code className="h-6 w-6" />;
    }
  };

  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4", className)}>
      {features.map((feature) => (
        <button
          key={feature.id}
          onClick={() => onSelectFeature(feature.id)}
          className={cn(
            "feature-card text-left transition-all duration-300 hover:-translate-y-1",
            selectedFeature === feature.id ? "ring-2 ring-primary ring-offset-2" : ""
          )}
        >
          <div className={cn(
            "w-12 h-12 rounded-full flex items-center justify-center mb-4",
            selectedFeature === feature.id 
              ? "bg-primary text-primary-foreground" 
              : "bg-secondary text-foreground"
          )}>
            {getIcon(feature.icon)}
          </div>
          <h3 className="font-medium text-lg mb-2">{feature.name}</h3>
          <p className="text-sm text-muted-foreground">{feature.description}</p>
        </button>
      ))}
    </div>
  );
};

export default FeatureSelector;
