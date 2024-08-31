import { Request, Response } from "express";
import InterviewFollowupService from "../services/InterviewFollowupService";

class InterviewFollowupController {
  async getAll(req: Request, res: Response) {
    try {
      const followups = await InterviewFollowupService.getAllFollowups();
      res.json(followups);
    } catch (error) {
      res.status(500).json({ error: "Failed to retrieve follow-ups" });
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const followup = await InterviewFollowupService.getFollowupById(
        Number(id)
      );
      if (!followup)
        return res.status(404).json({ error: "Follow-up not found" });
      res.json(followup);
    } catch (error) {
      res.status(500).json({ error: "Failed to retrieve follow-up" });
    }
  }

  async create(req: Request, res: Response) {
    try {
      const { employeeId, interviewId, followupDate, result } = req.body;

      // Validasi input
      if (!employeeId || !interviewId || !followupDate || !result) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      // Pastikan bahwa followupDate adalah tanggal yang valid
      const parsedDate = new Date(followupDate);
      if (isNaN(parsedDate.getTime())) {
        return res.status(400).json({ error: "Invalid followupDate" });
      }

      // Panggil service untuk membuat follow-up
      const followup = await InterviewFollowupService.createFollowup({
        employeeId: parseInt(employeeId, 10),
        interviewId: parseInt(interviewId, 10),
        followupDate: parsedDate,
        result,
      });

      console.log(followup);
      res.status(201).json(followup);
    } catch (error) {
      console.error("Error creating follow-up:", error);
      res.status(500).json({ error: "Failed to create follow-up" });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const followup = await InterviewFollowupService.updateFollowup(
        Number(id),
        req.body
      );
      res.json(followup);
    } catch (error) {
      res.status(500).json({ error: "Failed to update follow-up" });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await InterviewFollowupService.deleteFollowup(Number(id));
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Failed to delete follow-up" });
    }
  }
}

export default new InterviewFollowupController();
