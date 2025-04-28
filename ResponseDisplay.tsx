
import React from 'react';
import { cn } from '@/lib/utils';
import { AIResponse, FeatureType, ErrorDetectionResult } from '@/lib/types';
import { MessageSquare, Code, AlertTriangle, Sparkles, ArrowLeftRight, BugOff } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ErrorDetectionDisplay from './ErrorDetectionDisplay';

interface ResponseDisplayProps {
  response: AIResponse;
  featureType: FeatureType;
  className?: string;
  errorDetectionResult?: ErrorDetectionResult;
}

const ResponseDisplay: React.FC<ResponseDisplayProps> = ({ 
  response, 
  featureType,
  className,
  errorDetectionResult
}) => {
  if (featureType === 'error_detection' && errorDetectionResult) {
    return <ErrorDetectionDisplay result={errorDetectionResult} className={className} />;
  }
  
  if (response.loading) {
    return (
      <div className={cn("ai-response flex items-center justify-center py-12", className)}>
        <div className="flex flex-col items-center space-y-4">
          <div className="relative w-16 h-16">
            <div className="absolute top-0 w-full h-full rounded-full border-4 border-primary/20 border-t-primary animate-spin"></div>
          </div>
          <p className="text-sm text-muted-foreground">Processing your request...</p>
        </div>
      </div>
    );
  }
  
  if (response.error) {
    return (
      <div className={cn("ai-response border-destructive bg-destructive/5 p-6 rounded-lg", className)}>
        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-destructive/10 flex items-center justify-center">
            <AlertTriangle className="h-5 w-5 text-destructive" />
          </div>
          <div>
            <h3 className="font-medium mb-2">Error</h3>
            <p className="text-muted-foreground">{response.error}</p>
          </div>
        </div>
      </div>
    );
  }
  
  if (!response.content) {
    return (
      <div className={cn("ai-response h-full border border-dashed border-border rounded-lg flex items-center justify-center p-6", className)}>
        <div className="text-center text-muted-foreground">
          <Code className="h-8 w-8 mx-auto mb-2 opacity-50" />
          <p>Your AI-powered response will appear here</p>
        </div>
      </div>
    );
  }
  
  const getIcon = (type: FeatureType) => {
    switch (type) {
      case 'question': return <MessageSquare className="h-5 w-5 text-primary" />;
      case 'explanation': return <Code className="h-5 w-5 text-primary" />;
      case 'error': return <AlertTriangle className="h-5 w-5 text-primary" />;
      case 'optimizer': return <Sparkles className="h-5 w-5 text-primary" />;
      case 'translator': return <ArrowLeftRight className="h-5 w-5 text-primary" />;
      case 'error_detection': return <BugOff className="h-5 w-5 text-primary" />;
      default: return <Code className="h-5 w-5 text-primary" />;
    }
  };
  
  const getTitle = (type: FeatureType) => {
    switch (type) {
      case 'question': return 'Answer';
      case 'explanation': return 'Code Explanation';
      case 'error': return 'Error Analysis';
      case 'optimizer': return 'Optimized Code';
      case 'translator': return 'Translated Code';
      case 'error_detection': return 'Error Detection';
      default: return 'Response';
    }
  };

  // Process the content to format code blocks properly
  const formatResponse = (content: string) => {
    // Replace markdown code blocks with HTML
    return content.replace(/```([\s\S]*?)```/g, (match, code) => {
      // Check if the code block has a language specifier
      const hasLanguage = code.match(/^(\w+)\n/);
      let formattedCode = code;
      
      if (hasLanguage) {
        // Remove the language specifier
        formattedCode = code.replace(/^(\w+)\n/, '');
      }
      
      return `<pre class="bg-muted p-4 rounded-md overflow-x-auto"><code>${formattedCode.trim()}</code></pre>`;
    });
  };

  return (
    <div className={cn("ai-response border rounded-lg p-6", className)}>
      <div className="flex items-center space-x-2 mb-4">
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
          {getIcon(featureType)}
        </div>
        <h3 className="font-medium">{getTitle(featureType)}</h3>
      </div>
      
      <div className="prose prose-sm max-w-none">
        <div 
          className="response-content" 
          dangerouslySetInnerHTML={{ __html: formatResponse(response.content) }} 
        />
      </div>
    </div>
  );
};

export default ResponseDisplay;
