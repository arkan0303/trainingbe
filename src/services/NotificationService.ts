import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class NotificationService {
  async getAllNotifications() {
    return prisma.notification.findMany({
      include: {
        employee: true,
      },
    });
  }

  async getNotificationById(id: number) {
    return prisma.notification.findUnique({
      where: { id },
      include: {
        employee: true,
      },
    });
  }

  async createNotification(data: any) {
    return prisma.notification.create({
      data,
    });
  }

  async updateNotification(id: number, data: any) {
    return prisma.notification.update({
      where: { id },
      data,
    });
  }

  async deleteNotification(id: number) {
    return prisma.notification.delete({
      where: { id },
    });
  }
}

export default new NotificationService();
