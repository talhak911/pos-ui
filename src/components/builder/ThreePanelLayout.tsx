"use client";

import React from "react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { cn } from "@/lib/utils";

interface ThreePanelLayoutProps {
  leftPanel: React.ReactNode;
  centerPanel: React.ReactNode;
  rightPanel: React.ReactNode;
  className?: string;
}

export const ThreePanelLayout: React.FC<ThreePanelLayoutProps> = ({
  leftPanel,
  centerPanel,
  rightPanel,
  className,
}) => {
  return (
    <div className={cn("flex h-[calc(100vh-64px)] w-full overflow-hidden bg-background", className)}>
      <ResizablePanelGroup direction="horizontal">
        {/* Left Panel: Content Editors */}
        <ResizablePanel
          defaultSize={25}
          minSize={20}
          maxSize={40}
          className="bg-card/30 backdrop-blur-sm border-r"
        >
          <div className="h-full overflow-y-auto p-4 custom-scrollbar">
            {leftPanel}
          </div>
        </ResizablePanel>

        <ResizableHandle withHandle />

        {/* Center Panel: Resume Preview */}
        <ResizablePanel defaultSize={50} className="relative bg-muted/30">
          <div className="h-full w-full overflow-hidden">
            {centerPanel}
          </div>
        </ResizablePanel>

        <ResizableHandle withHandle />

        {/* Right Panel: Settings/Design */}
        <ResizablePanel
          defaultSize={25}
          minSize={20}
          maxSize={40}
          className="bg-card/30 backdrop-blur-sm border-l"
        >
          <div className="h-full overflow-y-auto p-4 custom-scrollbar">
            {rightPanel}
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};
