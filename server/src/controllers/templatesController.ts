import { Request, Response } from "express";
import { prisma } from "../models/prisma";

interface TemplatesRequestBody {
  search: string;
  page: number;
}

const PAGE_SIZE = 24;

export const Templates = async (req: Request, res: Response) => {
  const { search = "", page = 1 }: TemplatesRequestBody = req.body;

  const templates = await prisma.template.findMany({
    where: { title: search },
    skip: (page - 1) * PAGE_SIZE,
    take: PAGE_SIZE,
  });

  return res.json({ templates });
};
