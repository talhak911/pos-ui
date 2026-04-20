import { z } from 'zod';

// ============================================================================
// RESUME DATA SCHEMA - Complete structure for resume builder
// ============================================================================

// Basic Contact Information
export const BasicsPictureSchema = z.object({
  url: z.string().url().optional(),
  size: z.number().min(20).max(200).default(64),
  aspectRatio: z.number().default(1),
  borderRadius: z.number().default(0),
  opacity: z.number().min(0).max(1).default(1),
});

export const BasicsSchema = z.object({
  name: z.string().default(''),
  label: z.string().default(''),
  email: z.string().email().optional(),
  phone: z.string().optional(),
  url: z.string().url().optional(),
  summary: z.string().default(''),
  location: z.object({
    address: z.string().default(''),
    postalCode: z.string().default(''),
    city: z.string().default(''),
    countryCode: z.string().default(''),
    region: z.string().default(''),
  }).default({}),
  customFields: z.array(z.object({
    id: z.string(),
    label: z.string(),
    value: z.string(),
    visible: z.boolean().default(true),
  })).default([]),
});

// Profile / Social Links
const ProfileSchema = z.object({
  id: z.string(),
  network: z.string(),
  username: z.string(),
  url: z.string().url(),
  icon: z.string().optional(),
});

// Experience / Work History
export const ExperienceItemSchema = z.object({
  id: z.string(),
  name: z.string().default(''),
  position: z.string().default(''),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  summary: z.string().default(''),
  highlights: z.array(z.string()).default([]),
  isWorkingHere: z.boolean().default(false),
  location: z.string().default(''),
  visible: z.boolean().default(true),
});

export const ExperienceSchema = z.object({
  id: z.string(),
  visible: z.boolean().default(true),
  name: z.string().default('Experience'),
  items: z.array(ExperienceItemSchema).default([]),
});

// Education
export const EducationItemSchema = z.object({
  id: z.string(),
  institution: z.string().default(''),
  studyType: z.string().default(''),
  area: z.string().default(''),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  score: z.string().default(''),
  summary: z.string().default(''),
  visible: z.boolean().default(true),
});

export const EducationSchema = z.object({
  id: z.string(),
  visible: z.boolean().default(true),
  name: z.string().default('Education'),
  items: z.array(EducationItemSchema).default([]),
});

// Projects
const ProjectItemSchema = z.object({
  id: z.string(),
  name: z.string().default(''),
  description: z.string().default(''),
  highlights: z.array(z.string()).default([]),
  keywords: z.array(z.string()).default([]),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  url: z.string().url().optional(),
  roles: z.array(z.string()).default([]),
  entity: z.string().default(''),
  type: z.string().default(''),
  visible: z.boolean().default(true),
});

const ProjectSchema = z.object({
  id: z.string(),
  visible: z.boolean().default(true),
  name: z.string().default('Projects'),
  items: z.array(ProjectItemSchema).default([]),
});

// Skills
export const SkillItemSchema = z.object({
  id: z.string(),
  name: z.string().default(''),
  level: z.enum(['Beginner', 'Intermediate', 'Advanced', 'Expert']).default('Intermediate'),
  keywords: z.array(z.string()).default([]),
  visible: z.boolean().default(true),
});

export const SkillSchema = z.object({
  id: z.string(),
  visible: z.boolean().default(true),
  name: z.string().default('Skills'),
  items: z.array(SkillItemSchema).default([]),
});

// Languages
const LanguageItemSchema = z.object({
  id: z.string(),
  language: z.string().default(''),
  fluency: z.enum(['Elementary', 'Limited Working', 'Professional Working', 'Full Professional', 'Native Speaker']).default('Limited Working'),
  visible: z.boolean().default(true),
});

const LanguageSchema = z.object({
  id: z.string(),
  visible: z.boolean().default(true),
  name: z.string().default('Languages'),
  items: z.array(LanguageItemSchema).default([]),
});

// Interests
const InterestItemSchema = z.object({
  id: z.string(),
  name: z.string().default(''),
  keywords: z.array(z.string()).default([]),
});

const InterestSchema = z.object({
  id: z.string(),
  visible: z.boolean().default(true),
  name: z.string().default('Interests'),
  items: z.array(InterestItemSchema).default([]),
});

// Awards
const AwardItemSchema = z.object({
  id: z.string(),
  title: z.string().default(''),
  date: z.string().optional(),
  awarder: z.string().default(''),
  summary: z.string().default(''),
});

const AwardSchema = z.object({
  id: z.string(),
  visible: z.boolean().default(true),
  name: z.string().default('Awards'),
  items: z.array(AwardItemSchema).default([]),
});

// Certifications
const CertificationItemSchema = z.object({
  id: z.string(),
  name: z.string().default(''),
  issuer: z.string().default(''),
  issueDate: z.string().optional(),
  expirationDate: z.string().optional(),
  url: z.string().url().optional(),
});

const CertificationSchema = z.object({
  id: z.string(),
  visible: z.boolean().default(true),
  name: z.string().default('Certifications'),
  items: z.array(CertificationItemSchema).default([]),
});

// Publications
const PublicationItemSchema = z.object({
  id: z.string(),
  name: z.string().default(''),
  publisher: z.string().default(''),
  releaseDate: z.string().optional(),
  url: z.string().url().optional(),
  summary: z.string().default(''),
});

const PublicationSchema = z.object({
  id: z.string(),
  visible: z.boolean().default(true),
  name: z.string().default('Publications'),
  items: z.array(PublicationItemSchema).default([]),
});

// Volunteer
const VolunteerItemSchema = z.object({
  id: z.string(),
  organization: z.string().default(''),
  position: z.string().default(''),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  summary: z.string().default(''),
  highlights: z.array(z.string()).default([]),
});

const VolunteerSchema = z.object({
  id: z.string(),
  visible: z.boolean().default(true),
  name: z.string().default('Volunteer'),
  items: z.array(VolunteerItemSchema).default([]),
});

// References
const ReferenceItemSchema = z.object({
  id: z.string(),
  name: z.string().default(''),
  email: z.string().email().optional(),
  phone: z.string().optional(),
  summary: z.string().default(''),
});

const ReferenceSchema = z.object({
  id: z.string(),
  visible: z.boolean().default(true),
  name: z.string().default('References'),
  items: z.array(ReferenceItemSchema).default([]),
});

// Summary Section
const SummarySchema = z.object({
  id: z.string().default('summary'),
  visible: z.boolean().default(true),
  name: z.string().default('Professional Summary'),
  content: z.string().default(''),
  columns: z.number().min(1).max(2).default(1),
});

// Custom Sections
const CustomSectionSchema = z.object({
  id: z.string(),
  name: z.string(),
  content: z.string().default(''),
  visible: z.boolean().default(true),
});

// Design/Styling
export const DesignSchema = z.object({
  primary: z.string().default('#000000'),
  background: z.string().default('#ffffff'),
  accent: z.string().default('#0066cc'),
  text: z.string().default('#000000'),
  border: z.string().default('#e0e0e0'),
  spacing: z.object({
    top: z.number().default(16),
    right: z.number().default(16),
    bottom: z.number().default(16),
    left: z.number().default(16),
  }).optional(),
});

// Typography
const TypographySchema = z.object({
  family: z.object({
    body: z.string().default('Segoe UI, Tahoma, Geneva, Verdana, sans-serif'),
    heading: z.string().default('Segoe UI, Tahoma, Geneva, Verdana, sans-serif'),
  }).optional(),
  size: z.object({
    body: z.number().default(11),
    heading: z.number().default(14),
  }).optional(),
  lineHeight: z.number().default(1.5),
});

// Layout Configuration
const LayoutSchema = z.object({
  template: z.string().default('modern'),
  pageSize: z.enum(['A4', 'Letter', 'Free']).default('A4'),
  sidebarWidth: z.number().min(180).max(400).default(240),
  hiddenSections: z.array(z.string()).default([]),
  itemsPerPage: z.number().default(999),
});

// Metadata
export const MetadataSchema = z.object({
  template: z.string().default('modern'),
  layout: LayoutSchema.optional(),
  design: DesignSchema.optional(),
  typography: TypographySchema.optional(),
  page: z.object({
    width: z.number().default(210),
    height: z.number().default(297),
    margin: z.object({
      top: z.number().default(10),
      right: z.number().default(10),
      bottom: z.number().default(10),
      left: z.number().default(10),
    }).optional(),
  }).optional(),
  css: z.string().default(''),
  notes: z.string().default(''),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
});

// Main Resume Data Schema
export const ResumeDataSchema = z.object({
  id: z.string(),
  name: z.string().default('My Resume'),
  picture: BasicsPictureSchema.optional(),
  basics: BasicsSchema.optional(),
  summary: SummarySchema.optional(),
  sections: z.object({
    profiles: z.array(ProfileSchema).default([]),
    experience: ExperienceSchema.optional(),
    education: EducationSchema.optional(),
    projects: ProjectSchema.optional(),
    skills: SkillSchema.optional(),
    languages: LanguageSchema.optional(),
    interests: InterestSchema.optional(),
    awards: AwardSchema.optional(),
    certifications: CertificationSchema.optional(),
    publications: PublicationSchema.optional(),
    volunteer: VolunteerSchema.optional(),
    references: ReferenceSchema.optional(),
  }).optional(),
  customSections: z.array(CustomSectionSchema).default([]),
  metadata: MetadataSchema.optional(),
});

export type ResumeData = z.infer<typeof ResumeDataSchema>;
export type Basics = z.infer<typeof BasicsSchema>;
export type Experience = z.infer<typeof ExperienceSchema>;
export type ExperienceItem = z.infer<typeof ExperienceItemSchema>;
export type Education = z.infer<typeof EducationSchema>;
export type EducationItem = z.infer<typeof EducationItemSchema>;
export type Skill = z.infer<typeof SkillSchema>;
export type SkillItem = z.infer<typeof SkillItemSchema>;
export type Project = z.infer<typeof ProjectSchema>;
export type ProjectItem = z.infer<typeof ProjectItemSchema>;
