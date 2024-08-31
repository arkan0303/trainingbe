import { PrismaClient, TrainingModule } from "@prisma/client";

const prisma = new PrismaClient();

export const createTrainingModule = async (
  trainingModuleData: Omit<TrainingModule, "id" | "createdAt" | "updatedAt">
) => {
  return await prisma.trainingModule.create({
    data: {
      trainingId: parseInt(
        trainingModuleData.trainingId as unknown as string,
        10
      ), 
      moduleName: trainingModuleData.moduleName,
      moduleType: trainingModuleData.moduleType,
      moduleUrl: trainingModuleData.moduleUrl,
    },
  });
};

export const getTrainingModules = async () => {
  return await prisma.trainingModule.findMany({
    include: {
      training: true,
    },
  });
};

export const getTrainingModuleById = async (id: number) => {
  return await prisma.trainingModule.findUnique({
    where: { id },
    include: {
      training: true,
    },
  });
};

export const updateTrainingModule = async (
  id: number,
  data: Partial<Omit<TrainingModule, "id" | "createdAt" | "updatedAt">>
) => {
  return await prisma.trainingModule.update({
    where: { id },
    data,
  });
};

export const deleteTrainingModule = async (id: number) => {
  return await prisma.trainingModule.delete({
    where: { id },
  });
};
