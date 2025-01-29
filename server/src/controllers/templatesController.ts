import { Request, Response } from "express";
import { prisma } from "../models/prisma";

interface TemplatesRequestBody {
  search: string;
  page: number;
}

interface AddTemplateRequestBody {
  title: string;
}

export const PAGE_SIZE = 10;

export const getTemplates = async (req: Request, res: Response) => {
  const { search = "", page = 1 }: TemplatesRequestBody = req.body;

  const totalTemplates = await prisma.template.count({
    where: { title: { contains: search } },
  });

  const totalPages = Math.ceil(totalTemplates / PAGE_SIZE);

  const templates = await prisma.template.findMany({
    where: { title: { contains: search } },
    skip: (page - 1) * PAGE_SIZE,
    take: PAGE_SIZE,
  });

  return res.json({ templates, totalPages, currentPage: page });
};

export const getTemplate = async (id: number, res: Response) => {
  const template = await prisma.template.findUnique({
    where: { id },
  });

  return res.json({ template });
};

export const addTemplate = async (req: Request, res: Response) => {
  const { title = "New template" }: AddTemplateRequestBody = req.body;

  const userId = "cm643xycj0002mnmx58spwrpx";
  const instanceId = "cm643xy920000mnmxpoh5towf";

  const template = await prisma.template.create({
    data: {
      title,
      userId,
      instanceId,
    },
  });

  return res.json({ template });
};
