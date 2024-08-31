import { PrismaClient, Training } from "@prisma/client";

const prisma = new PrismaClient();

export const createTraining = async (
  trainingData: Omit<Training, "id" | "createdAt" | "updatedAt">
) => {
  return await prisma.training.create({
    data: {
      trainingType: trainingData.trainingType,
      trainingDate: trainingData.trainingDate, // Ensure this is a Date object
      location: trainingData.location,
    },
  });
};

export const getTrainings = async () => {
  return await prisma.training.findMany({
    include: {
      employeeTrainings: true,
      trainingModules: true,
    },
  });
};

export const getTrainingById = async (id: number) => {
  return await prisma.training.findUnique({
    where: { id },
    include: {
      employeeTrainings: true,
      trainingModules: true,
    },
  });
};

export const updateTraining = async (
  id: number,
  data: Partial<Omit<Training, "id" | "createdAt" | "updatedAt">>
) => {
  return await prisma.training.update({
    where: { id },
    data,
  });
};

export const deleteTraining = async (id: number) => {
  return await prisma.training.delete({
    where: { id },
  });
};
