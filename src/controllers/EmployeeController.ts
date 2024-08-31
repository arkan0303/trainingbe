// src/controllers/EmployeeController.ts
import { Request, Response } from "express";
import { EmployeeService } from "../services/EmployeeService";

export class EmployeeController {
  static async createOrUpdateEmployee(req: Request, res: Response) {
    const { userId, email, plant, position } = req.body;

    try {
      const employee = await EmployeeService.createOrUpdateEmployee(
        userId,
        email,
        plant,
        position
      );
      res.status(201).json(employee);
    } catch (error: any) {
      if (error.message.includes("Employee with this userId already exists")) {
        res.status(400).json({ error: error.message });
      } else if (
        error.message.includes("Employee with this email already exists")
      ) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(500).json({ error: "Failed to create or update employee" });
      }
    }
  }

  static async getEmployeeById(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const employee = await EmployeeService.getEmployeeById(Number(id));
      if (employee) {
        res.status(200).json(employee);
      } else {
        res.status(404).json({ error: "Employee not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Failed to retrieve employee" });
    }
  }

  static async getEmployeeByUserId(req: Request, res: Response) {
    const { userId } = req.params;
    try {
      const employee = await EmployeeService.getEmployeeByUserId(
        Number(userId)
      );
      if (employee) {
        res.status(200).json(employee);
      } else {
        res.status(404).json({ error: "Employee not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Failed to retrieve employee" });
    }
  }

  static async getAllEmployees(req: Request, res: Response) {
    try {
      const employees = await EmployeeService.getAllEmployees();
      res.status(200).json(employees);
    } catch (error) {
      res.status(500).json({ error: "Failed to retrieve employees" });
    }
  }
}
