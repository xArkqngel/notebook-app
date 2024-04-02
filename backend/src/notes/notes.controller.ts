import { Controller, Get, Post, Delete, Put } from '@nestjs/common';
import { NotesService } from './notes.service';

@Controller('notes')
export class NotesController {
  constructor(private notesService: NotesService) {}

  @Get()
  findAll() {
    return 'Get all notes';
  }

  @Get(':id')
  findOne() {
    return 'Get a note by id';
  }

  @Post()
  create() {
    return 'Create a note';
  }

  @Put(':id')
  update() {
    return 'Update a note by id';
  }

  @Delete(':id')
  remove() {
    return 'Delete a note by id';
  }
}
