import { Module } from '@nestjs/common';
import { NotesModule } from './notes/notes.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost/db'), NotesModule],
})
export class AppModule {}
