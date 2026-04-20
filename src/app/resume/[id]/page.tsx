"use client";

import React, { use } from "react";
import { useResume, useUpdateResume } from "@/hooks/useResume";
import { ThreePanelLayout } from "@/components/builder/ThreePanelLayout";
import { Header } from "@/components/builder/Header";
import { Dock } from "@/components/builder/Dock";
import { ResumePreview } from "@/components/resume/ResumePreview";
import { ModernTemplate } from "@/components/resume/templates/ModernTemplate";
import { BasicsEditor } from "@/components/builder/editors/BasicsEditor";
import { ExperienceEditor } from "@/components/builder/editors/ExperienceEditor";
import { EducationEditor } from "@/components/builder/editors/EducationEditor";
import { SkillEditor } from "@/components/builder/editors/SkillEditor";
import { Loader2, Package, Settings, User, Layout as LayoutIcon, GraduationCap, Code, FileJson, Download } from "lucide-react";
import { exportResumeToPdf, exportResumeToJson } from "@/lib/pdf-export";
import { toast } from "sonner";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";

// Placeholders for content until other editors are built
const EditorPlaceholder = ({ title }: { title: string }) => (
  <div className="flex flex-col items-center justify-center py-20 text-center opacity-40">
    <Package className="h-12 w-12 mb-4" />
    <h3 className="text-lg font-bold">{title} Editor</h3>
    <p className="text-sm">Coming soon in the next phase.</p>
  </div>
);

export default function BuilderPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { data: resume, isLoading, error } = useResume(id);
  const updateResume = useUpdateResume(id);
  const [isExporting, setIsExporting] = useState(false);

  const handleExportPdf = async () => {
    if (!resume) return;
    setIsExporting(true);
    try {
      const fullName = resume.basics?.name || "Resume";
      await exportResumeToPdf("resume-render", fullName);
      toast.success("Resume exported successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to export PDF. Please try again.");
    } finally {
      setIsExporting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="h-screen w-full flex flex-col items-center justify-center gap-4">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
        <p className="text-sm font-bold uppercase tracking-widest animate-pulse">Initializing Builder...</p>
      </div>
    );
  }

  if (error || !resume) {
    return (
      <div className="h-screen w-full flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-bold text-destructive">Resume Not Found</h1>
          <p className="text-muted-foreground">The document you are looking for does not exist or has been deleted.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen w-screen flex flex-col overflow-hidden bg-background">
      <Header 
        title={resume.basics?.name || "Untitled Resume"} 
        onTitleChange={(title) => {
          const currentBasics = resume.basics || {
            name: "",
            label: "",
            email: "",
            phone: "",
            url: "",
            summary: "",
            location: { address: "", city: "", region: "", postalCode: "", countryCode: "" },
            customFields: []
          };
          updateResume.mutate({ 
            ...resume, 
            basics: { ...currentBasics, name: title } 
          });
        }}
        onExport={handleExportPdf}
        isExporting={isExporting}
      />

      <ThreePanelLayout
        leftPanel={
          <div className="space-y-6 pb-20">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-black italic tracking-tight uppercase px-1">Content</h2>
              <div className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-[10px] font-bold">DRAFT</div>
            </div>

            <Tabs defaultValue="basics" className="w-full">
              <TabsList className="w-full h-auto p-1 bg-muted/50 rounded-2xl mb-8">
                <TabsTrigger value="basics" className="flex-1 gap-2 py-3 rounded-xl data-[state=active]:bg-background data-[state=active]:shadow-sm">
                  <User className="h-4 w-4" />
                  <span className="text-xs font-bold">Basics</span>
                </TabsTrigger>
                <TabsTrigger value="experience" className="flex-1 gap-2 py-3 rounded-xl data-[state=active]:bg-background data-[state=active]:shadow-sm">
                  <Package className="h-4 w-4" />
                  <span className="text-xs font-bold">Exp</span>
                </TabsTrigger>
                <TabsTrigger value="sections" className="flex-1 gap-2 py-3 rounded-xl data-[state=active]:bg-background data-[state=active]:shadow-sm">
                  <LayoutIcon className="h-4 w-4" />
                  <span className="text-xs font-bold">More</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="basics">
                <BasicsEditor 
                  data={resume.basics || { name: "", label: "", email: "", phone: "", summary: "", location: { city: "", region: "", address: "", postalCode: "", countryCode: "" }, customFields: [] }} 
                  onChange={(basics) => updateResume.mutate({ ...resume, basics })} 
                />
              </TabsContent>
              <TabsContent value="experience">
                <ExperienceEditor 
                  data={resume.sections?.experience || { id: "experience", name: "Experience", items: [], visible: true }} 
                  onChange={(experience) => {
                    const defaultSection = { id: "", name: "", items: [], visible: true };
                    const sections = resume.sections || {
                        experience: { ...defaultSection, id: "experience", name: "Experience" },
                        education: { ...defaultSection, id: "education", name: "Education" },
                        projects: { ...defaultSection, id: "projects", name: "Projects" },
                        skills: { ...defaultSection, id: "skills", name: "Skills" },
                        languages: { ...defaultSection, id: "languages", name: "Languages" }
                    };
                    updateResume.mutate({ 
                        ...resume, 
                        sections: { ...sections, experience } 
                    } as any);
                  }} 
                />
              </TabsContent>
              <TabsContent value="sections">
                <div className="space-y-6">
                    <EducationEditor 
                        data={resume.sections?.education || { id: "education", name: "Education", items: [], visible: true }} 
                        onChange={(education) => {
                            const defaultSection = { id: "", name: "", items: [], visible: true };
                            const sections = resume.sections || {
                                experience: { ...defaultSection, id: "experience", name: "Experience" },
                                education: { ...defaultSection, id: "education", name: "Education" },
                                projects: { ...defaultSection, id: "projects", name: "Projects" },
                                skills: { ...defaultSection, id: "skills", name: "Skills" },
                                languages: { ...defaultSection, id: "languages", name: "Languages" }
                            };
                            updateResume.mutate({ 
                                ...resume, 
                                sections: { ...sections, education } 
                            } as any);
                        }} 
                    />

                    <SkillEditor 
                        data={resume.sections?.skills || { id: "skills", name: "Skills", items: [], visible: true }} 
                        onChange={(skills) => {
                            const defaultSection = { id: "", name: "", items: [], visible: true };
                            const sections = resume.sections || {
                                experience: { ...defaultSection, id: "experience", name: "Experience" },
                                education: { ...defaultSection, id: "education", name: "Education" },
                                projects: { ...defaultSection, id: "projects", name: "Projects" },
                                skills: { ...defaultSection, id: "skills", name: "Skills" },
                                languages: { ...defaultSection, id: "languages", name: "Languages" }
                            };
                            updateResume.mutate({ 
                                ...resume, 
                                sections: { ...sections, skills } 
                            } as any);
                        }} 
                    />
                </div>
              </TabsContent>
            </Tabs>
          </div>
        }
        centerPanel={
          <ResumePreview>
            <ModernTemplate data={resume} />
          </ResumePreview>
        }
        rightPanel={
          <div className="space-y-6">
            <div className="flex items-center gap-2 mb-4">
              <Settings className="h-5 w-5 text-primary" />
              <h2 className="text-xl font-black italic tracking-tight uppercase px-1">Design</h2>
            </div>
            
            <div className="space-y-8">
                <div className="space-y-3">
                    <label className="text-xs font-black uppercase tracking-widest text-muted-foreground px-1">Templates</label>
                    <div className="grid grid-cols-2 gap-3">
                        <div className="aspect-[3/4] rounded-xl border-2 border-primary bg-card flex items-center justify-center text-[10px] b-shadow-md font-bold">Modern</div>
                        <div className="aspect-[3/4] rounded-xl border border-dashed bg-muted/30 flex items-center justify-center text-[10px] font-bold text-muted-foreground">More soon...</div>
                    </div>
                </div>

                <div className="space-y-3">
                    <label className="text-xs font-black uppercase tracking-widest text-muted-foreground px-1">Global Color</label>
                    <div className="flex gap-3">
                        {["#2563eb", "#dc2626", "#16a34a", "#9333ea", "#ea580c"].map((color) => (
                            <button 
                                key={color}
                                className="h-8 w-8 rounded-full border-2 border-background ring-1 ring-border shadow-sm transition-all hover:scale-125 focus:ring-2 focus:ring-primary focus:outline-none"
                                style={{ backgroundColor: color }}
                                onClick={() => {
                                    const metadata = resume.metadata || {};
                                    const design = (metadata as any).design || {};
                                    
                                    updateResume.mutate({
                                        ...resume,
                                        metadata: {
                                            ...metadata,
                                            design: {
                                                ...design,
                                                primary: color
                                            }
                                        }
                                    } as any);
                                }}
                            />
                        ))}
                    </div>
                </div>
            </div>

            <div className="pt-6 border-t mt-auto">
                <Button 
                    variant="outline" 
                    className="w-full gap-2 h-12 rounded-xl"
                    onClick={() => {
                        const fullName = resume.basics?.name || "Resume";
                        exportResumeToJson(resume, fullName);
                    }}
                >
                    <FileJson className="h-4 w-4" />
                    Export as JSON
                </Button>
                <p className="mt-2 text-[10px] text-muted-foreground px-1">
                    Download a JSON copy of your data for backup or portability.
                </p>
            </div>
          </div>
        }
      />

      <Dock 
        onZoomIn={() => {}} 
        onZoomOut={() => {}}
        onResetZoom={() => {}}
      />
    </div>
  );
}
