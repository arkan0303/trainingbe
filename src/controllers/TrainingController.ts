import { Request, Response } from "express";
import * as trainingService from "../services/TrainingService";

export const createTraining = async (req: Request, res: Response) => {
  try {
    const trainingData = req.body;
    const newTraining = await trainingService.createTraining(trainingData);
    res.status(201).json(newTraining);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getTrainings = async (req: Request, res: Response) => {
  try {
    const trainings = await trainingService.getTrainings();
    res.status(200).json(trainings);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getTrainingById = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10);
    const training = await trainingService.getTrainingById(id);
    if (!training) {
      return res.status(404).json({ error: "Training not found" });
    }
    res.status(200).json(training);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const updateTraining = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10);
    const data = req.body;
    const updatedTraining = await trainingService.updateTraining(id, data);
    res.status(200).json(updatedTraining);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteTraining = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10);
    await trainingService.deleteTraining(id);
    res.status(204).send();
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
