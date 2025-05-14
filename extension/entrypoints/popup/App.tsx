import { useState, useEffect } from 'react';
import { Settings, Bot, Send, BookOpen, FileText, Check, X, ArrowLeft } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';

import '@/styles/globals.css';
import './App.css';

// Define the type for captured content
interface CapturedContent {
  type: 'page' | 'selection';
  url: string;
  title: string;
  content: string;
  timestamp: string;
}

function App() {
  const [chatMessage, setChatMessage] = useState('');
  const [capturedContent, setCapturedContent] = useState<CapturedContent | null>(null);
  const [showCategorization, setShowCategorization] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notification, setNotification] = useState<{ type: 'success' | 'error', message: string } | null>(null);

  // Fetch captured content when popup opens
  useEffect(() => {
    browser.runtime.sendMessage({ action: 'GET_CAPTURED_CONTENT' }, (response) => {
      if (response) {
        setCapturedContent(response);
        setShowCategorization(true);
      }
    });
  }, []);

  const handleSendMessage = () => {
    console.log('Sending message:', chatMessage);
    // TODO: Implement actual message sending logic
    setChatMessage('');
  };

  const handleCategorize = async (category: 'tried_worked' | 'not_tried') => {
    if (!capturedContent) return;

    setIsSubmitting(true);

    try {
      // TODO: Replace with actual API call to backend
      console.log('Categorizing content:', { 
        content: capturedContent, 
        category 
      });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Clear the captured content from background script
      browser.runtime.sendMessage({ 
        action: 'GET_CAPTURED_CONTENT', 
        clearAfterRetrieving: true 
      });

      // Show success notification
      setNotification({
        type: 'success',
        message: 'Content saved successfully!'
      });

      // Reset state
      setShowCategorization(false);
      setCapturedContent(null);
      
      // Clear notification after a delay
      setTimeout(() => {
        setNotification(null);
      }, 3000);
    } catch (error) {
      console.error('Error categorizing content:', error);
      setNotification({
        type: 'error',
        message: 'Failed to save content. Please try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const cancelCapture = () => {
    // Clear the captured content from background script
    browser.runtime.sendMessage({ 
      action: 'GET_CAPTURED_CONTENT', 
      clearAfterRetrieving: true 
    });
    
    setShowCategorization(false);
    setCapturedContent(null);
  };

  return (
    <div className="flex flex-col h-[600px] w-[400px] text-foreground bg-background dark overflow-hidden">
      {/* Header */}
      <header className="flex items-center justify-between p-3 border-b border-border shrink-0">
        <div className="flex items-center space-x-2">
          <Bot className="h-6 w-6 text-primary" />
          <h1 className="text-lg font-semibold">2ndBrain</h1>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <Settings className="h-5 w-5" />
              <span className="sr-only">Settings</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Settings</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Appearance</DropdownMenuItem>
            <DropdownMenuItem>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 p-4 overflow-y-auto space-y-4 custom-scrollbar">
        {notification && (
          <Alert className={notification.type === 'success' ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}>
            <AlertDescription>{notification.message}</AlertDescription>
          </Alert>
        )}

        {showCategorization && capturedContent ? (
          <div className="space-y-4">
            <div className="flex items-center">
              <Button variant="ghost" size="sm" onClick={cancelCapture} className="mr-2">
                <ArrowLeft className="h-4 w-4 mr-1" />
                Back
              </Button>
              <h2 className="text-lg font-medium">Categorize Captured Content</h2>
            </div>
            
            <Card>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-base">{capturedContent.title}</CardTitle>
                    <CardDescription className="text-xs truncate max-w-[300px]">
                      {capturedContent.url}
                    </CardDescription>
                  </div>
                  <Badge variant="outline">{capturedContent.type === 'page' ? 'Full Page' : 'Selection'}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="max-h-[200px] overflow-y-auto text-sm border rounded-md p-2 bg-muted/30">
                  {capturedContent.content.length > 300 
                    ? `${capturedContent.content.substring(0, 300)}...` 
                    : capturedContent.content}
                </div>
              </CardContent>
              <CardFooter className="flex flex-col space-y-2">
                <Button 
                  className="w-full" 
                  onClick={() => handleCategorize('tried_worked')}
                  disabled={isSubmitting}
                >
                  <Check className="h-4 w-4 mr-2" />
                  Things/Solutions Tried and Worked
                </Button>
                <Button 
                  className="w-full" 
                  variant="outline"
                  onClick={() => handleCategorize('not_tried')}
                  disabled={isSubmitting}
                >
                  <FileText className="h-4 w-4 mr-2" />
                  Things/Solutions Not Tried
                </Button>
              </CardFooter>
            </Card>
          </div>
        ) : (
          <>
            {/* Default chat view - only shown when not categorizing */}
            <div className="flex items-start space-x-3">
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div className="p-3 rounded-lg bg-muted">
                <p className="text-sm">Hello! How can I help you today?</p>
              </div>
            </div>
            <div className="flex items-start space-x-3 justify-end">
              <div className="p-3 rounded-lg bg-primary text-primary-foreground">
                <p className="text-sm">I need help with setting up my RAG.</p>
              </div>
              <Avatar>
                <AvatarFallback>ME</AvatarFallback>
              </Avatar>
            </div>
          </>
        )}
      </main>

      <Separator />

      {/* Footer - Chat Input (only shown when not categorizing) */}
      {!showCategorization && (
        <footer className="p-3 border-t border-border shrink-0">
          <div className="flex items-center space-x-2">
            <Input
              type="text"
              placeholder="Ask anything..."
              className="flex-1"
              value={chatMessage}
              onChange={(e) => setChatMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            />
            <Button type="submit" size="icon" onClick={handleSendMessage} disabled={!chatMessage.trim()}>
              <Send className="h-5 w-5" />
              <span className="sr-only">Send</span>
            </Button>
          </div>
        </footer>
      )}
    </div>
  );
}

export default App;
