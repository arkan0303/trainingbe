import { Request, Response } from "express";
import * as employeeTrainingService from "../services/EmployeeTrainingService";

export const createEmployeeTraining = async (req: Request, res: Response) => {
  try {
    const employeeTrainingData = req.body;
    const newEmployeeTraining =
      await employeeTrainingService.createEmployeeTraining(
        employeeTrainingData
      );
    res.status(201).json(newEmployeeTraining);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getEmployeeTrainings = async (req: Request, res: Response) => {
  try {
    const employeeTrainings =
      await employeeTrainingService.getEmployeeTrainings();
    res.status(200).json(employeeTrainings);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getEmployeeTrainingById = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10);
    const employeeTraining =
      await employeeTrainingService.getEmployeeTrainingById(id);
    if (!employeeTraining) {
      return res.status(404).json({ error: "EmployeeTraining not found" });
    }
    res.status(200).json(employeeTraining);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const updateEmployeeTraining = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10);
    const data = req.body;
    const updatedEmployeeTraining =
      await employeeTrainingService.updateEmployeeTraining(id, data);
    res.status(200).json(updatedEmployeeTraining);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteEmployeeTraining = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10);
    await employeeTrainingService.deleteEmployeeTraining(id);
    res.status(204).send();
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getEmployeeTrainingsByUserId = async (
  req: Request,
  res: Response
) => {
  try {
    const userId = parseInt(req.params.userId, 10);
    const employeeTrainings =
      await employeeTrainingService.getEmployeeTrainingsByUserId(userId);
    if (!employeeTrainings.length) {
      return res.status(404).json({ error: "No training found for this user" });
    }
    res.status(200).json(employeeTrainings);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
