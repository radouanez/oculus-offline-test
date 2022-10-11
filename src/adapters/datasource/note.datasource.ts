import Note from "../../domain/model/note";
import NoteRepository from "../../domain/ports/note.repository";
import NoteModel from "./note.model";

class NoteDataSource implements NoteRepository {
  public async getById(id: string): Promise<Note | null> {
    const note: Note | null = await NoteModel.findByPk(id);
    return note;
  }

  public async getAll(): Promise<Note[]> {
    const notes: Note[] = await NoteModel.findAll();
    return notes;
  }

  public async create(noteInput: Note): Promise<Note> {
    const note: Note = await NoteModel.create(noteInput);
    return note;
  }

  public async updateById(noteInput: Note, id: string): Promise<Note | any> {
    const result= await NoteModel.update(noteInput, {
      where: { id },
      returning: true,
    });
    return result;
  }

  public async deleteById(id: string): Promise<unknown> {
    const result = await NoteModel.destroy({ where: { id } });
    return result;
  }
}

export default NoteDataSource;
