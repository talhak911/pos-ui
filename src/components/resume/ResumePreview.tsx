"use client";

import React, { useRef } from "react";
import { TransformWrapper, TransformComponent, ReactZoomPanPinchRef } from "react-zoom-pan-pinch";
import { cn } from "@/lib/utils";

interface ResumePreviewProps {
  children: React.ReactNode;
  className?: string;
  onInit?: (ref: ReactZoomPanPinchRef) => void;
}

export const ResumePreview: React.FC<ResumePreviewProps> = ({
  children,
  className,
  onInit,
}) => {
  const transformRef = useRef<ReactZoomPanPinchRef>(null);

  const handleInit = (ref: ReactZoomPanPinchRef) => {
    if (onInit) onInit(ref);
  };

  return (
    <div className={cn("relative h-full w-full bg-muted/40", className)}>
      <TransformWrapper
        initialScale={0.8}
        minScale={0.2}
        maxScale={2}
        centerOnInit
        limitToBounds={false}
        ref={transformRef}
        onInit={handleInit}
      >
        <TransformComponent
          wrapperStyle={{
            width: "100%",
            height: "100%",
          }}
          contentStyle={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div className="p-20">
            <div className="resume-page-shadow">
               {children}
            </div>
          </div>
        </TransformComponent>
      </TransformWrapper>

      <style jsx global>{`
        .resume-page-shadow {
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 20px rgba(0, 0, 0, 0.05);
          transition: transform 0.2s ease-out;
        }
        
        .resume-page-shadow:hover {
          transform: translateY(-2px);
          box-shadow: 0 35px 60px -15px rgba(0, 0, 0, 0.3);
        }
      `}</style>
    </div>
  );
};
