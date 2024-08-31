import * as express from "express";
import { UserController } from "../controllers/UserController";
import { EmployeeController } from "../controllers/EmployeeController";
import { InterviewController } from "../controllers/InterviewController";
import * as trainingController from "../controllers/TrainingController";
import * as employeeTrainingController from "../controllers/EmployeeTrainingController";
import * as trainingModuleController from "../controllers/TrainingModuleController";
import { upload } from "../middlewares/uploadMiddleware";
import InterviewFollowupController from "../controllers/InterviewFollowupController";
import NotificationController from "../controllers/NotificationController";

const Routes = express.Router();

Routes.post("/users", UserController.createUser);
Routes.get("/users/:id", UserController.getUserById);
Routes.get("/users", UserController.getAllUsers);
Routes.get("/users-count", UserController.getCountUsers);
Routes.post("/login", UserController.login);

Routes.post("/employees", EmployeeController.createOrUpdateEmployee);
Routes.get("/employees/:id", EmployeeController.getEmployeeById);
Routes.get("/employees", EmployeeController.getAllEmployees);
Routes.get("/employees-user/:userId", EmployeeController.getEmployeeByUserId);

Routes.post("/interviews", InterviewController.createInterview);
Routes.get("/interviews/:id", InterviewController.getInterviewById);
Routes.get("/interviews", InterviewController.getAllInterviews);
Routes.get("/interviews-count", InterviewController.getRecentInterviewCount);

Routes.post("/trainings", trainingController.createTraining);
Routes.get("/trainings", trainingController.getTrainings);
Routes.get("/trainings/:id", trainingController.getTrainingById);
Routes.put("/trainings/:id", trainingController.updateTraining);
Routes.delete("/trainings/:id", trainingController.deleteTraining);

Routes.post(
  "/employee-trainings",
  employeeTrainingController.createEmployeeTraining
);
Routes.get(
  "/employee-trainings",
  employeeTrainingController.getEmployeeTrainings
);
Routes.get(
  "/employee-trainings/:id",
  employeeTrainingController.getEmployeeTrainingById
);
Routes.get(
  "/employee-trainingss/:userId",
  employeeTrainingController.getEmployeeTrainingsByUserId
);
Routes.put(
  "/employee-trainings/:id",
  employeeTrainingController.updateEmployeeTraining
);
Routes.delete(
  "/employee-trainings/:id",
  employeeTrainingController.deleteEmployeeTraining
);

Routes.post(
  "/training-modules",
  upload.single("file"),
  trainingModuleController.createTrainingModule
);
Routes.get("/training-modules", trainingModuleController.getTrainingModules);
Routes.get(
  "/training-modules/:id",
  trainingModuleController.getTrainingModuleById
);
Routes.put(
  "/training-modules/:id",
  trainingModuleController.updateTrainingModule
);
Routes.delete(
  "/training-modules/:id",
  trainingModuleController.deleteTrainingModule
);

Routes.get("/interview-followups", InterviewFollowupController.getAll);
Routes.get("/interview-followups/:id", InterviewFollowupController.getById);
Routes.post("/interview-followups", InterviewFollowupController.create);
Routes.put("/interview-followups/:id", InterviewFollowupController.update);
Routes.delete("/interview-followups/:id", InterviewFollowupController.delete);

Routes.get("/notifications", NotificationController.getAll);
Routes.get("/notifications/:id", NotificationController.getById);
Routes.post("/notifications", NotificationController.create);
Routes.put("/notifications/:id", NotificationController.update);
Routes.delete("/notifications/:id", NotificationController.delete);

export default Routes;
