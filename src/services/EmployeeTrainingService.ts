import { PrismaClient, EmployeeTraining } from "@prisma/client";

const prisma = new PrismaClient();

export const createEmployeeTraining = async (
  employeeTrainingData: Omit<EmployeeTraining, "id" | "createdAt" | "updatedAt">
) => {
  return await prisma.employeeTraining.create({
    data: employeeTrainingData,
  });
};

export const getEmployeeTrainings = async () => {
  return await prisma.employeeTraining.findMany({
    include: {
      employee: true,
      training: true,
    },
  });
};

export const getEmployeeTrainingById = async (id: number) => {
  return await prisma.employeeTraining.findUnique({
    where: { id },
    include: {
      employee: true,
      training: true,
    },
  });
};

export const getEmployeeTrainingsByUserId = async (userId: number) => {
  return await prisma.employeeTraining.findMany({
    where: { employee: { userId } },
    include: {
      employee: true,
      training: {
        select: {
          id: true,
          trainingType: true,
          trainingDate: true,
          location: true,
          trainingModules: {
            select: {
              id: true,
              moduleName: true,
              moduleType: true,
              moduleUrl: true,
            },
          },
        },
      },
    },
  });
};

export const updateEmployeeTraining = async (
  id: number,
  data: Partial<Omit<EmployeeTraining, "id" | "createdAt" | "updatedAt">>
) => {
  return await prisma.employeeTraining.update({
    where: { id },
    data,
  });
};

export const deleteEmployeeTraining = async (id: number) => {
  return await prisma.employeeTraining.delete({
    where: { id },
  });
};
