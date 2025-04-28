
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Settings } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ApiKeyInputProps {
  apiKey: string;
  onApiKeyChange: (apiKey: string) => void;
}

const ApiKeyInput: React.FC<ApiKeyInputProps> = ({ apiKey, onApiKeyChange }) => {
  const [localApiKey, setLocalApiKey] = useState(apiKey);
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();

  // Check for API key in localStorage on mount
  useEffect(() => {
    const savedApiKey = localStorage.getItem('gemini_api_key');
    if (savedApiKey) {
      setLocalApiKey(savedApiKey);
      onApiKeyChange(savedApiKey);
    }
  }, [onApiKeyChange]);

  const handleSave = () => {
    if (!localApiKey.trim()) {
      toast({
        title: "API Key Required",
        description: "Please enter a valid Gemini API key to continue.",
        variant: "destructive",
      });
      return;
    }

    // Save to localStorage
    localStorage.setItem('gemini_api_key', localApiKey);
    onApiKeyChange(localApiKey);
    setIsOpen(false);
    
    toast({
      title: "API Key Saved",
      description: "Your Gemini API key has been saved.",
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Settings className="h-4 w-4" />
          <span>{apiKey ? "Change API Key" : "Set API Key"}</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Gemini API Key</DialogTitle>
          <DialogDescription>
            Enter your Google Gemini API key to use the AI features. 
            You can get a key from the <a href="https://makersuite.google.com/app/apikey" target="_blank" rel="noreferrer" className="text-primary underline">Google AI Studio</a>.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-2 py-4">
          <Input
            value={localApiKey}
            onChange={(e) => setLocalApiKey(e.target.value)}
            placeholder="Enter your Gemini API key..."
            className="font-mono text-sm"
            type="password"
          />
          <p className="text-xs text-muted-foreground">
            Your API key is stored locally in your browser and is never sent to our servers.
          </p>
        </div>
        <DialogFooter>
          <Button onClick={handleSave}>Save API Key</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ApiKeyInput;
