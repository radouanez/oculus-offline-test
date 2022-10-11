import NoteDataSource from "../../adapters/datasource/note.datasource";
import { HTTP_STATUS } from "../helper/const";
import { IResponse } from "../helper/types";
import Note from "../model/note";
import NoteRepository from "./note.repository";

class NotePort {
  noteRepository: NoteRepository;

  constructor(noteRepository: NoteRepository) {
    this.noteRepository = noteRepository;
  }

  async getById(id: string): Promise<IResponse<Note | unknown>> {
    const note: Note | unknown = await this.noteRepository.getById(id);
    if (!note) {
      return { status: HTTP_STATUS.NOT_FOUND, error: "not found" };
    }

    return { status: HTTP_STATUS.OK, data: note };
  }

  async getAll(): Promise<IResponse<Note[]>> {
    try {
      const notes: Note[] = await this.noteRepository.getAll();
      return { status: HTTP_STATUS.OK, data: notes };
    } catch (e: any) {
      return { status: HTTP_STATUS.INTERNAL_SERVER_ERROR, error: e.message };
    }
  }

  async updateById(note: Note, id: string): Promise<IResponse<Note>> {
    try {
      const result = await this.noteRepository.updateById(note, id);
      return { status: HTTP_STATUS.OK, data: result };
    } catch (e: any) {
      return { status: HTTP_STATUS.INTERNAL_SERVER_ERROR, error: e.message };
    }
  }

  async deleteById(id: string) {
    try {
      const result = await this.noteRepository.deleteById(id);
      return { status: HTTP_STATUS.OK, data: result };
    } catch (e: any) {
      return { status: HTTP_STATUS.INTERNAL_SERVER_ERROR, error: e.message };
    }
  }

  async create(note: Note) {
    try {
      const result = await this.noteRepository.create(note);
      return { status: HTTP_STATUS.OK, data: result };
    } catch (e: any) {
      return { status: HTTP_STATUS.INTERNAL_SERVER_ERROR, error: e.message };
    }
  }
}
const noteDataSource = new NoteDataSource();
const notePort = new NotePort(noteDataSource);

export default notePort;
