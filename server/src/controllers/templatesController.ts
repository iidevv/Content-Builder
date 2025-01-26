import { Request, Response } from "express";
import { prisma } from "../models/prisma";

interface TemplatesRequestBody {
  search: string;
  page: number;
}

export const PAGE_SIZE = 10;

export const Templates = async (req: Request, res: Response) => {
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

