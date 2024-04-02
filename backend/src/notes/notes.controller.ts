import {
  Controller,
  Get,
  Post,
  Delete,
  Put,
  Body,
  Param,
  ConflictException,
  NotFoundException,
  HttpCode,
} from '@nestjs/common';
import { NotesService } from './notes.service';
import { CreateNoteDto } from 'src/dto/create-note.dto';
import { UpdateNoteDto } from 'src/dto/update-note.dto';

@Controller('notes')
export class NotesController {
  constructor(private notesService: NotesService) {}

  @Get()
  findAll() {
    return this.notesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const note = await this.notesService.findOne(id);
    if (!note) {
      throw new NotFoundException('Note not found');
    }
    return note;
  }

  @Post()
  async create(@Body() body: CreateNoteDto) {
    try {
      return await this.notesService.create(body);
    } catch (e) {
      if (e.code === 11000) {
        throw new ConflictException('Note with this title already exists');
      }
      throw e;
    }
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() body: UpdateNoteDto) {
    const note = await this.notesService.update(id, body);
    if (!note) {
      throw new NotFoundException('Note not found');
    }
    return note;
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id') id: string) {
    const note = await this.notesService.delete(id);
    if (!note) {
      throw new NotFoundException('Note not found');
    }
    return note;
  }
}
