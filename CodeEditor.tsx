
import React, { useState } from 'react';
import Tesseract from 'tesseract.js';
import { cn } from '@/lib/utils';
import { Feature, FeatureType, TranslatorOptions, ErrorDetectionOptions } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { MessageSquare, Code, AlertTriangle, Sparkles, ArrowLeftRight, BugOff } from 'lucide-react';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';

interface CodeEditorProps {
  featureType: FeatureType;
  onSubmit: (code: string, options?: TranslatorOptions | ErrorDetectionOptions) => void;
  loading: boolean;
  className?: string;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ 
  featureType, 
  onSubmit, 
  loading,
  className 
}) => {
  const [code, setCode] = useState('');
  const [fromLanguage, setFromLanguage] = useState('javascript');
  const [toLanguage, setToLanguage] = useState('python');
  const [codeLanguage, setCodeLanguage] = useState('javascript');
  
  const features: Record<FeatureType, Feature> = {
    question: {
      id: "question",
      name: "Ask a Question",
      description: "Get AI-generated answers to your coding queries",
      icon: "MessageSquare",
      placeholder: "Ask any coding-related question...",
      buttonText: "Get Answer"
    },
    explanation: {
      id: "explanation",
      name: "Code Explanation",
      description: "Break down complex code into simple explanations",
      icon: "Code",
      placeholder: "Paste code you want explained...",
      buttonText: "Explain Code"
    },
    error: {
      id: "error",
      name: "Error Finder",
      description: "Detect and explain errors in your code",
      icon: "AlertTriangle",
      placeholder: "Paste code with errors...",
      buttonText: "Find Errors"
    },
    error_detection: {
      id: "error_detection",
      name: "Error Detection",
      description: "Advanced error analysis with corrected code",
      icon: "BugOff",
      placeholder: "Paste code for error detection...",
      buttonText: "Detect Errors"
    },
    optimizer: {
      id: "optimizer",
      name: "Code Optimizer",
      description: "Refactor and improve your code efficiency",
      icon: "Sparkles",
      placeholder: "Paste code to optimize...",
      buttonText: "Optimize Code"
    },
    translator: {
      id: "translator",
      name: "Language Translator",
      description: "Convert code between programming languages",
      icon: "ArrowLeftRight",
      placeholder: "Paste code to translate...",
      buttonText: "Translate Code"
    }
  };
  
  const selectedFeature = features[featureType];
  
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'MessageSquare': return <MessageSquare className="h-5 w-5" />;
      case 'Code': return <Code className="h-5 w-5" />;
      case 'AlertTriangle': return <AlertTriangle className="h-5 w-5" />;
      case 'Sparkles': return <Sparkles className="h-5 w-5" />;
      case 'ArrowLeftRight': return <ArrowLeftRight className="h-5 w-5" />;
      case 'BugOff': return <BugOff className="h-5 w-5" />;
      default: return <Code className="h-5 w-5" />;
    }
  };
  
  const languages = [
    "javascript", "typescript", "python", "java", "c", "cpp", "csharp", 
    "go", "ruby", "php", "swift", "kotlin", "rust"
  ];
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!code.trim()) return;
    
    if (featureType === "translator") {
      onSubmit(code, { fromLanguage, toLanguage } as TranslatorOptions);
    } else if (featureType === "error_detection") {
      onSubmit(code, { language: codeLanguage } as ErrorDetectionOptions);
    } else {
      onSubmit(code);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={cn("space-y-4", className)}>
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium leading-none">
            {selectedFeature.name}
          </label>
          <div className="text-xs text-muted-foreground">
            {featureType === "question" ? "Ask anything coding related" : "Paste your code below"}
          </div>
        </div>
        
        <textarea
          className="code-input w-full min-h-[200px]"
          placeholder={selectedFeature.placeholder}
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
      </div>
      
      {featureType === "translator" && (
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="space-y-2 flex-1">
            <label className="text-sm font-medium">From Language</label>
            <Select value={fromLanguage} onValueChange={setFromLanguage}>
              <SelectTrigger>
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent>
                {languages.map((lang) => (
                  <SelectItem key={`from-${lang}`} value={lang}>
                    {lang.charAt(0).toUpperCase() + lang.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex items-center justify-center pt-6">
            <ArrowLeftRight className="h-5 w-5 text-muted-foreground" />
          </div>
          
          <div className="space-y-2 flex-1">
            <label className="text-sm font-medium">To Language</label>
            <Select value={toLanguage} onValueChange={setToLanguage}>
              <SelectTrigger>
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent>
                {languages.map((lang) => (
                  <SelectItem key={`to-${lang}`} value={lang}>
                    {lang.charAt(0).toUpperCase() + lang.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      )}

      {featureType === "error_detection" && (
        <div className="space-y-2">
          <label className="text-sm font-medium">Code Language</label>
          <Select value={codeLanguage} onValueChange={setCodeLanguage}>
            <SelectTrigger>
              <SelectValue placeholder="Select language" />
            </SelectTrigger>
            <SelectContent>
              {languages.map((lang) => (
                <SelectItem key={lang} value={lang}>
                  {lang.charAt(0).toUpperCase() + lang.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}
      
      <div className="flex justify-end">
        <Button type="submit" disabled={loading || !code.trim()} className="transition-all duration-300">
          {getIcon(selectedFeature.icon)}
          <span className="ml-2">{loading ? "Processing..." : selectedFeature.buttonText}</span>
        </Button>
      </div>
    </form>
  );
};

export default CodeEditor;
