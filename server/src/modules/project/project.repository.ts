import { prisma } from "../../config/db.js";

export const projectRepository = {
  create(data: { title: string; description?: string; ownerId: string }) {
    return prisma.project.create({ data });
  },

  findAllByOwner(ownerId: string) {
    return prisma.project.findMany({
      where: { ownerId },
      orderBy: { createdAt: "desc" },
    });
  },

  findById(id: string) {
    return prisma.project.findUnique({ where: { id } });
  },

  update(id: string, data: { title?: string; description?: string }) {
    return prisma.project.update({
      where: { id },
      data,
    });
  },

  remove(id: string) {
    return prisma.project.delete({
      where: { id },
    });
  },
};