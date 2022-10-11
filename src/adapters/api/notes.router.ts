import { NextFunction, Request, Response } from "express";
import { Route } from "../../infrastructure/common/types";
import { NotesController } from "./notes.controller";

const notesController = new NotesController();

const routes: Route[] = [
  {
    path: "/api/v1/notes",
    method: "post",
    handler: async (req: Request, res: Response, next: NextFunction) =>
      await notesController.handleCreateNote(req, res, next),
  },
  {
    path: "/api/v1/notes",
    method: "get",
    handler: async (req: Request, res: Response, next: NextFunction) =>
      await notesController.handleGetNotes(req, res, next),
  },
  {
    path: "/api/v1/notes/:id",
    method: "get",
    handler: async (req: Request, res: Response, next: NextFunction) =>
      await notesController.handleGetNoteById(req, res, next),
  },
  {
    path: "/api/v1/notes",
    method: "put",
    handler: async (req: Request, res: Response, next: NextFunction) =>
      await notesController.handleUpdateNote(req, res, next),
  },
  {
    path: "/api/v1/notes/:id",
    method: "delete",
    handler: async (req: Request, res: Response, next: NextFunction) =>
      await notesController.handleDeleteNote(req, res, next),
  },
];

export default routes;