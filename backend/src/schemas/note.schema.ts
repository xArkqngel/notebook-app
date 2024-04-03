import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  timestamps: true,
})
export class Note {
  @Prop({ unique: true, required: true, trim: true })
  title: string;
  @Prop({ trim: true })
  content: string;
  @Prop({ default: false })
  isArchived: boolean;
  @Prop([String])
  tags: string[];
}

export const NoteSchema = SchemaFactory.createForClass(Note);
