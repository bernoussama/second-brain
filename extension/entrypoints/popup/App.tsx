import { useState } from 'react';
import { Settings, Bot, Send } from 'lucide-react';

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

import '@/styles/globals.css';
import './App.css';

function App() {
  const [chatMessage, setChatMessage] = useState('');

  const handleSendMessage = () => {
    console.log('Sending message:', chatMessage);
    // TODO: Implement actual message sending logic
    setChatMessage('');
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
        {/* Placeholder for chat messages or other content */}
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
            {/* Placeholder for user avatar if available */}
            <AvatarFallback>ME</AvatarFallback>
          </Avatar>
        </div>
      </main>

      <Separator />

      {/* Footer - Chat Input */}
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
    </div>
  );
}

export default App;
