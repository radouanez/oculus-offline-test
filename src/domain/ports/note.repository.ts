import Note from "../model/note";

interface NoteRepository {
  getById(id: string): Promise<Note | unknown>;
  getAll(): Promise<Note[]>;
  create(note: Note): Promise<Note>;
  updateById(note: Note, id: string): Promise<Note>;
  deleteById(id: string): Promise<string |unknown>;
}
export default NoteRepository;