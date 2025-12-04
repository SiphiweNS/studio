import { FileText } from 'lucide-react';
import { ThemeToggle } from '../theme-toggle';

export default function Header() {
  return (
    <header className="border-b sticky top-0 bg-background/95 backdrop-blur z-10">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
            <FileText className="h-7 w-7 text-primary" />
            <h1 className="text-2xl font-headline font-bold text-foreground">ProResume AI</h1>
        </div>
        <ThemeToggle />
      </div>
    </header>
  );
}
