"use client";

import React from "react";
import { ResumeData } from "@/lib/resume-schema";
import { cn } from "@/lib/utils";

interface ModernTemplateProps {
  data: ResumeData;
  className?: string;
}

export const ModernTemplate: React.FC<ModernTemplateProps> = ({
  data,
  className,
}) => {
  const { basics, sections, metadata } = data;
  const primaryColor = metadata?.design?.primary || "#2563eb";

  const formatDate = (start?: string, end?: string, current?: boolean) => {
    if (!start) return "";
    const endStr = current ? "Present" : end || "Present";
    return `${start} — ${endStr}`;
  };

  return (
    <div 
      id="resume-render"
      className={cn(
        "resume-page relative bg-white text-slate-800 p-[30px] font-sans",
        className
      )}
      style={{
        width: "210mm",
        minHeight: "297mm",
        "--primary": primaryColor,
      } as React.CSSProperties}
    >
      {/* Header */}
      <section className="mb-8 border-b-4 pb-6" style={{ borderBottomColor: "var(--primary)" }}>
        <h1 className="text-4xl font-extrabold uppercase tracking-tighter text-slate-900">
          {basics?.name}
        </h1>
        <p className="text-xl font-medium text-slate-600 mt-1">
          {basics?.label}
        </p>
        
        <div className="flex flex-wrap gap-x-4 gap-y-1 mt-4 text-sm text-slate-500 font-medium">
          {basics?.email && (
            <span>{basics.email}</span>
          )}
          {basics?.phone && (
            <span>{basics.phone}</span>
          )}
          {basics?.location?.city && (
            <span>{basics.location.city}, {basics.location.region}</span>
          )}
          {basics?.url && (
            <a href={basics.url} className="text-slate-700 hover:underline">
              {basics.url}
            </a>
          )}
        </div>
      </section>

      {/* Main Content Layout */}
      <div className="grid grid-cols-12 gap-8">
        {/* Left Column (Main Content) */}
        <div className="col-span-8 flex flex-col gap-6">
          {/* Summary */}
          {basics?.summary && (
            <section>
              <h2 className="text-lg font-bold uppercase tracking-widest text-slate-900 border-b mb-3 pb-1">
                Summary
              </h2>
              <div 
                className="text-sm leading-relaxed text-slate-700 prose prose-slate max-w-none"
                dangerouslySetInnerHTML={{ __html: basics.summary }}
              />
            </section>
          )}

          {/* Experience */}
          {sections?.experience?.items && sections.experience.items.length > 0 && (
            <section>
              <h2 className="text-lg font-bold uppercase tracking-widest text-slate-900 border-b mb-4 pb-1">
                Experience
              </h2>
              <div className="flex flex-col gap-6">
                {sections.experience.items.filter(i => i.visible !== false).map((item) => (
                  <div key={item.id} className="relative pl-4 border-l-2" style={{ borderLeftColor: "var(--primary)" }}>
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="font-bold text-slate-900">
                        {item.position}
                      </h3>
                      <span className="text-xs font-semibold bg-slate-100 px-2 py-1 rounded">
                        {formatDate(item.startDate, item.endDate, item.isWorkingHere)}
                      </span>
                    </div>
                    <p className="text-sm font-semibold text-slate-600 mb-2">
                        {item.name} | {item.location}
                    </p>
                    <div 
                      className="text-sm prose prose-sm prose-slate"
                      dangerouslySetInnerHTML={{ __html: item.summary }}
                    />
                    {item.highlights && item.highlights.length > 0 && (
                        <ul className="mt-2 list-disc list-inside text-xs text-slate-600">
                            {item.highlights.map((h, i) => <li key={i}>{h}</li>)}
                        </ul>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Projects */}
          {sections?.projects?.items && sections.projects.items.length > 0 && (
            <section>
              <h2 className="text-lg font-bold uppercase tracking-widest text-slate-900 border-b mb-4 pb-1">
                Projects
              </h2>
              <div className="grid grid-cols-1 gap-4">
                {sections.projects.items.filter(i => (i as any).visible !== false).map((item) => (
                  <div key={item.id}>
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="font-bold text-slate-900">{item.name}</h3>
                      <span className="text-xs font-medium text-slate-500">
                        {formatDate(item.startDate, item.endDate)}
                      </span>
                    </div>
                    <p className="text-xs font-medium text-slate-600 italic mb-1">{item.description}</p>
                    {item.highlights && item.highlights.length > 0 && (
                        <ul className="mt-1 list-disc list-inside text-[10px] text-slate-600">
                            {item.highlights.map((h, i) => <li key={i}>{h}</li>)}
                        </ul>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Right Column (Sidebar) */}
        <div className="col-span-4 flex flex-col gap-6">
           {/* Skills */}
           {sections?.skills?.items && sections.skills.items.length > 0 && (
            <section>
              <h2 className="text-lg font-bold uppercase tracking-widest text-slate-900 border-b mb-4 pb-1">
                Skills
              </h2>
              <div className="flex flex-wrap gap-2">
                {sections.skills.items.filter(i => (i as any).visible !== false).map((item) => {
                  let levelPercent = "50%";
                  if (item.level === "Expert") levelPercent = "100%";
                  else if (item.level === "Advanced") levelPercent = "75%";
                  else if (item.level === "Intermediate") levelPercent = "50%";
                  else if (item.level === "Beginner") levelPercent = "25%";
                  
                  return (
                    <div key={item.id} className="w-full">
                      <div className="flex justify-between text-[10px] mb-1">
                        <span className="font-bold text-slate-800 uppercase tracking-tighter">{item.name}</span>
                        <span className="text-slate-500 font-medium">{item.level}</span>
                      </div>
                      <div className="w-full h-1 bg-slate-100 rounded-full overflow-hidden">
                        <div 
                          className="h-full rounded-full" 
                          style={{ 
                              width: levelPercent,
                              backgroundColor: "var(--primary)"
                          }} 
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          )}

          {/* Education */}
          {sections?.education?.items && sections.education.items.length > 0 && (
            <section>
              <h2 className="text-lg font-bold uppercase tracking-widest text-slate-900 border-b mb-4 pb-1">
                Education
              </h2>
              <div className="flex flex-col gap-4">
                {sections.education.items.filter(i => (i as any).visible !== false).map((item) => (
                  <div key={item.id}>
                    <h3 className="font-bold text-slate-900 text-sm">{item.studyType} in {item.area}</h3>
                    <p className="text-xs font-semibold text-slate-600">{item.institution}</p>
                    <p className="text-[10px] text-slate-500 mt-1">
                        {formatDate(item.startDate, item.endDate)}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Languages */}
          {sections?.languages?.items && sections.languages.items.length > 0 && (
            <section>
              <h2 className="text-lg font-bold uppercase tracking-widest text-slate-900 border-b mb-4 pb-1">
                Languages
              </h2>
              <div className="grid grid-cols-1 gap-2">
                {sections.languages.items.filter(i => (i as any).visible !== false).map((item) => (
                    <div key={item.id} className="flex justify-between items-center text-xs">
                        <span className="font-bold text-slate-800">{item.language}</span>
                        <span className="text-slate-500">{item.fluency}</span>
                    </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};
