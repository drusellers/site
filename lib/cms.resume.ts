import YAML from "yaml";
import * as z from "zod";
import { getFile } from "@/lib/cms";

const RoleSchema = z.object({
	title: z.string(),
	start: z.string(),
	end: z.string(),
	description: z.array(z.string()),
	bullets: z.array(z.string()),
});
export type Role = z.infer<typeof RoleSchema>;

const EngagementSchema = z.object({
	name: z.string(),
	start: z.string(),
	end: z.string(),
	description: z.array(z.string()),
});
export type Engagement = z.infer<typeof EngagementSchema>;

const EmployerSchema = z.object({
	employer: z.string(),
	url: z.optional(z.string()),
	url_label: z.optional(z.string()),
	roles: z.array(RoleSchema),
	engagements: z.optional(z.array(EngagementSchema)),
});
export type Employer = z.infer<typeof EmployerSchema>;

const EducationSchema = z.object({
	school: z.string(),
	url: z.string(),
	url_label: z.string(),
	start: z.string(),
	end: z.string(),
	major: z.string(),
	minor: z.string(),
});
export type Education = z.infer<typeof EducationSchema>;

const ResumeSchema = z.object({
	title: z.string(),
	startYear: z.number(),
	layout: z.string(),
	summary: z.string(),
	employers: z.array(EmployerSchema),
	archived_employers: z.array(EmployerSchema),
	education: z.array(EducationSchema),
	activities: z.array(z.string()),
});
export type Resume = z.infer<typeof ResumeSchema>;

export function getResumeData(): Resume {
	const fileContents = getFile("resume.yml");
	const data = YAML.parse(fileContents);

	return ResumeSchema.parse(data);
}
