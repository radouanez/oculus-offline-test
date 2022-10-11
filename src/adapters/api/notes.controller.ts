import { NextFunction, Request, Response } from "express";

import notePort from "../../domain/ports/note.port";

export class NotesController {
  constructor() { }

  async handleCreateNote(req: Request, res: Response, next: NextFunction): Promise<any> {
    const { body } = req
    const { status, data, error } = await notePort.create(body);
    res.status(status).json({ data, error });
  }

  async handleGetNotes(req: Request, res: Response, next: NextFunction): Promise<any> {
    const { status, data, error } = await notePort.getAll();
    res.status(status).json({ data, error });
  }

  async handleGetNoteById(req: Request, res: Response, next: NextFunction): Promise<any> {
    const { id } = req.params;
    const { status, data, error } = await notePort.getById(id);
    res.status(status).json({ data, error });
  }

  async handleUpdateNote(req: Request, res: Response, next: NextFunction): Promise<any> {
    const { body } = req
    const { status, data, error } = await notePort.updateById(body, body?.id);
    res.status(status).json({ data, error });
  }

  async handleDeleteNote(req: Request, res: Response, next: NextFunction): Promise<any> {
    const { id } = req.params
    const { status, data, error } = await notePort.deleteById(id);
    res.status(status).json({ data, error });
  }
}
