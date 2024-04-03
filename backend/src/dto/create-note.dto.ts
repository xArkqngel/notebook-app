import { IsString, IsBoolean, IsOptional, IsNotEmpty } from 'class-validator';

export class CreateNoteDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsOptional()
  content?: string;

  @IsBoolean()
  @IsOptional()
  isArchived?: boolean;

  @IsString({ each: true })
  @IsOptional()
  tags?: string[];
}
