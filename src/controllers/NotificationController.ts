import { Request, Response } from "express";
import NotificationService from "../services/NotificationService";

class NotificationController {
  async getAll(req: Request, res: Response) {
    try {
      const notifications = await NotificationService.getAllNotifications();
      res.json(notifications);
    } catch (error) {
      res.status(500).json({ error: "Failed to retrieve notifications" });
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const notification = await NotificationService.getNotificationById(
        Number(id)
      );
      if (!notification)
        return res.status(404).json({ error: "Notification not found" });
      res.json(notification);
    } catch (error) {
      res.status(500).json({ error: "Failed to retrieve notification" });
    }
  }

  async create(req: Request, res: Response) {
    try {
      const notification = await NotificationService.createNotification(
        req.body
      );
      res.status(201).json(notification);
    } catch (error) {
      res.status(500).json({ error: "Failed to create notification" });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const notification = await NotificationService.updateNotification(
        Number(id),
        req.body
      );
      res.json(notification);
    } catch (error) {
      res.status(500).json({ error: "Failed to update notification" });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await NotificationService.deleteNotification(Number(id));
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Failed to delete notification" });
    }
  }
}

export default new NotificationController();
