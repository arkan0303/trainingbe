import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
interface FollowupData {
  employeeId: number;
  interviewId: number;
  followupDate: Date;
  result: string;
}

class InterviewFollowupService {
  async getAllFollowups() {
    return prisma.interviewFollowup.findMany({
      include: {
        employee: true,
        interview: true,
      },
    });
  }

  async getFollowupById(id: number) {
    return prisma.interviewFollowup.findUnique({
      where: { id },
      include: {
        employee: true,
        interview: true,
      },
    });
  }

  async createFollowup(data: FollowupData) {
    // Validasi data
    if (
      !data.employeeId ||
      !data.interviewId ||
      !data.followupDate ||
      !data.result
    ) {
      throw new Error("Missing required fields");
    }

    return prisma.interviewFollowup.create({
      data: {
        employeeId: data.employeeId,
        interviewId: data.interviewId,
        followupDate: new Date(data.followupDate),
        result: data.result,
      },
    });
  }

  async updateFollowup(id: number, data: any) {
    return prisma.interviewFollowup.update({
      where: { id },
      data,
    });
  }

  async deleteFollowup(id: number) {
    return prisma.interviewFollowup.delete({
      where: { id },
    });
  }
}

export default new InterviewFollowupService();
