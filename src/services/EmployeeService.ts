// src/services/EmployeeService.ts
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class EmployeeService {
  static async createOrUpdateEmployee(
    userId: number,
    email: string,
    plant: string,
    position: string
  ) {
    try {
      // Cek apakah employee dengan userId yang sama sudah ada
      const existingEmployee = await prisma.employee.findUnique({
        where: { userId: userId },
      });

      if (existingEmployee) {
        // Jika ada, perbarui entri yang ada
        return await prisma.employee.update({
          where: { userId: userId },
          data: {
            email,
            plant,
            position,
            interviewStatus: "Pending",
          },
        });
      } else {
        // Jika tidak ada, buat entri baru
        return await prisma.employee.create({
          data: {
            userId,
            email,
            plant,
            position,
            interviewStatus: "Pending",
          },
        });
      }
    } catch (error) {
      console.error("Error creating or updating employee:", error);
      throw error;
    }
  }

  static async getEmployeeById(id: number) {
    return prisma.employee.findUnique({
      where: { id },
    });
  }

  static async getEmployeeByUserId(userId: number) {
    return prisma.employee.findUnique({
      where: { userId },
      include: {
        employeeTrainings: {
          select: {
            id: true,
            training: true,
          },
        },
        interviews: true,
        notification: true,
        user: true,
        interviewFollowups: true,
      },
    });
  }

  static async getAllEmployees() {
    return prisma.employee.findMany({
      include: {
        user: true,
        interviews: true,
        employeeTrainings: true,
        interviewFollowups: true,
        notification: true,
      },
    });
  }
}
