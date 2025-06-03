import { PrismaClient, Project as PrismaProject, Feedback as PrismaFeedback } from "../lib/generated/prisma";

const prisma = new PrismaClient();

export interface Project {
  id: string;
  title: string;
  description: string;
  url?: string;
  feedbackType: "hustler" | "hipster" | "hacker";
  createdAt: string;
}

export interface Feedback {
  id: string;
  projectId: string;
  feedback: string;
  type: "hustler" | "hipster" | "hacker";
  helpful: number;
  notHelpful: number;
  createdAt: string;
}

function mapProject(p: PrismaProject): Project {
  return {
    id: p.id,
    title: p.title,
    description: p.description,
    url: p.url ?? undefined,
    feedbackType: p.feedbackType as Project["feedbackType"],
    createdAt: p.createdAt instanceof Date ? p.createdAt.toISOString() : p.createdAt,
  };
}

function mapFeedback(f: PrismaFeedback): Feedback {
  return {
    id: f.id,
    projectId: f.projectId,
    feedback: f.feedback,
    type: f.type as Feedback["type"],
    helpful: f.helpful,
    notHelpful: f.notHelpful,
    createdAt: f.createdAt instanceof Date ? f.createdAt.toISOString() : f.createdAt,
  };
}

// Project CRUD
export async function getProjects(): Promise<Project[]> {
  const projects = await prisma.project.findMany({ orderBy: { createdAt: "desc" } });
  return projects.map(mapProject);
}

export async function getProjectById(id: string): Promise<Project | null> {
  const project = await prisma.project.findUnique({ where: { id } });
  return project ? mapProject(project) : null;
}

export async function createProject(data: Omit<Project, "id" | "createdAt">): Promise<Project> {
  const project = await prisma.project.create({
    data: {
      ...data,
      url: data.url ?? "",
      createdAt: new Date().toISOString(),
    },
  });
  return mapProject(project);
}

export async function updateProject(id: string, data: Partial<Project>): Promise<Project | null> {
  const project = await prisma.project.update({
    where: { id },
    data,
  });
  return project ? mapProject(project) : null;
}

export async function deleteProject(id: string): Promise<Project | null> {
  const project = await prisma.project.delete({ where: { id } });
  return project ? mapProject(project) : null;
}

// Feedback CRUD
export async function getFeedback(): Promise<Feedback[]> {
  const feedbacks = await prisma.feedback.findMany({ orderBy: { createdAt: "desc" } });
  return feedbacks.map(mapFeedback);
}

export async function getFeedbackByProjectId(projectId: string): Promise<Feedback[]> {
  const feedbacks = await prisma.feedback.findMany({ where: { projectId }, orderBy: { createdAt: "desc" } });
  return feedbacks.map(mapFeedback);
}

export async function createFeedback(data: Omit<Feedback, "id" | "createdAt">): Promise<Feedback> {
  const feedback = await prisma.feedback.create({
    data: {
      ...data,
      createdAt: new Date().toISOString(),
    },
  });
  return mapFeedback(feedback);
}

export async function updateFeedback(id: string, data: Partial<Feedback>): Promise<Feedback | null> {
  const feedback = await prisma.feedback.update({
    where: { id },
    data,
  });
  return feedback ? mapFeedback(feedback) : null;
}

export async function deleteFeedback(id: string): Promise<Feedback | null> {
  const feedback = await prisma.feedback.delete({ where: { id } });
  return feedback ? mapFeedback(feedback) : null;
}

// No need for generateId, as Prisma uses cuid for IDs
