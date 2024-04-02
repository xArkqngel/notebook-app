import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Note } from '../schemas/note.schema';
import { Model } from 'mongoose';
import { CreateNoteDto } from 'src/dto/create-note.dto';
import { UpdateNoteDto } from 'src/dto/update-note.dto';

@Injectable()
export class NotesService {
  constructor(@InjectModel(Note.name) private noteModel: Model<Note>) {}

  findAll() {
    this.noteModel.find();
  }

  async create(createNote: CreateNoteDto) {
    const newNote = new this.noteModel(createNote);
    return newNote.save();
  }

  async findOne(id: string) {
    return this.noteModel.findById(id);
  }

  async delete(id: string) {
    return this.noteModel.findByIdAndDelete(id);
  }

  async update(id: string, updateNote: UpdateNoteDto) {
    return this.noteModel.findByIdAndUpdate(id, updateNote);
  }
}
