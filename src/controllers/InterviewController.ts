// src/controllers/InterviewController.ts
import { Request, Response } from "express";
import { InterviewService } from "../services/InterviewService";

export class InterviewController {
  static async createInterview(req: Request, res: Response) {
    const { employeeId, interviewDate, questions, answers, evaluationResult } =
      req.body;
    try {
      const interview = await InterviewService.createInterview(
        employeeId,
        new Date(interviewDate),
        questions,
        answers,
        evaluationResult
      );
      res.status(201).json(interview);
    } catch (error) {
      res.status(500).json({ error: "Failed to create interview" });
    }
  }

  static async getInterviewById(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const interview = await InterviewService.getInterviewById(Number(id));
      if (interview) {
        res.status(200).json(interview);
      } else {
        res.status(404).json({ error: "Interview not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Failed to retrieve interview" });
    }
  }

  static async getAllInterviews(req: Request, res: Response) {
    try {
      const interviews = await InterviewService.getAllInterviews();
      res.status(200).json(interviews);
    } catch (error) {
      res.status(500).json({ error: "Failed to retrieve interviews" });
    }
  }

  static async getRecentInterviewCount(req: Request, res: Response) {
    try {
      const count = await InterviewService.getRecentInterviewCount();
      res.status(200).json({ count });
    } catch (error) {
      res
        .status(500)
        .json({ error: "Failed to retrieve recent interview count" });
    }
  }
}
