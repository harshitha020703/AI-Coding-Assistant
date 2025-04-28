
import React from 'react';
import { cn } from '@/lib/utils';
import { ErrorDetectionResult } from '@/lib/types';
import { BugOff } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface ErrorDetectionDisplayProps {
  result: ErrorDetectionResult;
  className?: string;
}

const ErrorDetectionDisplay: React.FC<ErrorDetectionDisplayProps> = ({ 
  result,
  className 
}) => {
  const { errors, correctedCode } = result;
  
  return (
    <div className={cn("border rounded-lg p-6", className)}>
      <div className="flex items-center space-x-2 mb-4">
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
          <BugOff className="h-5 w-5 text-primary" />
        </div>
        <h3 className="font-medium">Error Analysis Results</h3>
      </div>

      <Tabs defaultValue="errors" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-4">
          <TabsTrigger value="errors">Errors</TabsTrigger>
          <TabsTrigger value="corrected">Corrected Code</TabsTrigger>
        </TabsList>
        
        <TabsContent value="errors" className="prose prose-sm max-w-none">
          <div className="bg-muted p-4 rounded-md overflow-auto">
            <pre className="whitespace-pre-wrap">{errors}</pre>
          </div>
        </TabsContent>
        
        <TabsContent value="corrected" className="prose prose-sm max-w-none">
          <div className="bg-muted p-4 rounded-md overflow-auto">
            <pre className="font-mono text-sm whitespace-pre-wrap">{correctedCode}</pre>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ErrorDetectionDisplay;
