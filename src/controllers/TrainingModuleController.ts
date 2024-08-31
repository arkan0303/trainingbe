import { Request, Response } from "express";
import * as trainingModuleService from "../services/TrainingModuleService";

export const createTrainingModule = async (req: Request, res: Response) => {
  try {
    const { trainingId, moduleName, moduleType } = req.body;

    // Ambil URL dari file yang diunggah
    const moduleUrl = req.file ? `/uploads/${req.file.filename}` : "";

    // Panggil service untuk menyimpan data
    const newModule = await trainingModuleService.createTrainingModule({
      trainingId,
      moduleName,
      moduleType,
      moduleUrl,
    });

    res.status(201).json(newModule);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getTrainingModules = async (req: Request, res: Response) => {
  try {
    const trainingModules = await trainingModuleService.getTrainingModules();
    res.status(200).json(trainingModules);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getTrainingModuleById = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10);
    const trainingModule = await trainingModuleService.getTrainingModuleById(
      id
    );
    if (!trainingModule) {
      return res.status(404).json({ error: "TrainingModule not found" });
    }
    res.status(200).json(trainingModule);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const updateTrainingModule = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10);
    const data = req.body;
    const updatedTrainingModule =
      await trainingModuleService.updateTrainingModule(id, data);
    res.status(200).json(updatedTrainingModule);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteTrainingModule = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10);
    await trainingModuleService.deleteTrainingModule(id);
    res.status(204).send();
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
