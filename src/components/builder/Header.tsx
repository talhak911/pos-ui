"use client";

import React from "react";
import Link from "next/link";
import { 
  ChevronLeft, 
  Download, 
  Eye, 
  FileJson, 
  Plus, 
  Save, 
  Settings as SettingsIcon,
  Share2,
  Loader2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface HeaderProps {
  title: string;
  onTitleChange?: (title: string) => void;
  onExport?: () => void;
  isExporting?: boolean;
  className?: string;
}

export const Header: React.FC<HeaderProps> = ({
  title,
  onTitleChange,
  onExport,
  isExporting,
  className,
}) => {
  return (
    <header className={cn(
      "flex h-16 w-full items-center justify-between border-b px-4 glass z-50",
      className
    )}>
      <div className="flex items-center gap-4">
        <Link href="/">
          <Button variant="ghost" size="icon" className="rounded-full">
            <ChevronLeft className="h-5 w-5" />
          </Button>
        </Link>
        <div className="h-6 w-px bg-border mx-2" />
        <input
          type="text"
          value={title}
          onChange={(e) => onTitleChange?.(e.target.value)}
          className="bg-transparent text-lg font-bold outline-none hover:bg-accent/50 focus:bg-accent px-2 py-1 rounded-md transition-colors"
        />
      </div>

      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm" className="gap-2">
          <Eye className="h-4 w-4" />
          Preview
        </Button>
        <Button variant="outline" size="sm" className="gap-2">
          <Share2 className="h-4 w-4" />
          Share
        </Button>
        <Button 
          variant="default" 
          size="sm" 
          className="gap-2 shadow-primary/20 shadow-lg min-w-[100px]" 
          onClick={onExport}
          disabled={isExporting}
        >
          {isExporting ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Download className="h-4 w-4" />
          )}
          {isExporting ? "Exporting..." : "Export"}
        </Button>
      </div>
    </header>
  );
};
