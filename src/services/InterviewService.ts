import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class InterviewService {
  static async createInterview(
    employeeId: number,
    interviewDate: Date,
    questions: string,
    answers: string,
    evaluationResult: string
  ) {
    return prisma.interview.create({
      data: {
        employeeId,
        interviewDate,
        questions,
        answers,
        evaluationResult,
      },
    });
  }

  static async getInterviewById(id: number) {
    return prisma.interview.findUnique({
      where: { id },
      include: { followups: true, employee: true },
    });
  }

  static async getAllInterviews() {
    return prisma.interview.findMany({
      include: { followups: true, employee: true },
    });
  }

  

  static async getRecentInterviewCount() {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 15); // 24 hours ago

    const count = await prisma.interview.count({
      where: {
        interviewDate: {
          gte: startDate,
        },
      },
    });

    return count;
  }
}
