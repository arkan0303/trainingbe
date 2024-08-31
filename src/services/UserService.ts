import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export class UserService {
  static async createUser(
    name: string,
    email: string,
    password: string,
    role: string
  ) {
    const hashedPassword = await bcrypt.hash(password, 10);
    return prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role,
      },
    });
  }

  static async getUserById(id: number) {
    return prisma.user.findUnique({
      where: { id },
    });
  }

  static async getUserByEmail(email: string) {
    return prisma.user.findUnique({
      where: { email },
    });
  }

  static async getAllUsers() {
    return prisma.user.findMany();
  }

  static async getCountUsers() {
    return prisma.user.count();
  }
}
