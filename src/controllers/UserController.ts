import { Request, Response } from "express";
import { UserService } from "../services/UserService";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export class UserController {
  static async createUser(req: Request, res: Response) {
    const { name, email, password, role } = req.body;
    try {
      const user = await UserService.createUser(name, email, password, role);
      res.status(201).json(user);
    } catch (error) {
      res.status(500).json({ error: "Failed to create user" });
    }
  }

  static async getUserById(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const user = await UserService.getUserById(Number(id));
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ error: "User not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Failed to retrieve user" });
    }
  }

  static async getAllUsers(req: Request, res: Response) {
    try {
      const users = await UserService.getAllUsers();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ error: "Failed to retrieve users" });
    }
  }

  static async login(req: Request, res: Response) {
    const { email, password } = req.body;
    try {
      const user = await UserService.getUserByEmail(email);
      if (user && (await bcrypt.compare(password, user.password))) {
        const token = jwt.sign({ id: user.id, role: user.role }, "data", {
          expiresIn: "1h",
        });

        // Kirimkan token dan role dalam respons
        res.status(200).json({ token, role: user.role, id: user.id });
      } else {
        res.status(401).json({ error: "Invalid email or password" });
      }
    } catch (error) {
      res.status(500).json({ error: "Failed to login" });
    }
  }

  static async getCountUsers(req: Request, res: Response) {
    try {
      const count = await UserService.getCountUsers();
      res.status(200).json({ count });
    } catch (error) {
      res.status(500).json({ error: "Failed to retrieve count of users" });
    }
  }
}
