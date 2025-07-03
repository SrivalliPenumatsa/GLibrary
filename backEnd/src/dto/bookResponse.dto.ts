import { Expose, Transform } from 'class-transformer';
import { Genre } from 'src/common/enums/genre.enum';

export class BookResponseDto {
  @Expose()
  bookId: string;

  @Expose()
  title: string;

  @Expose()
  author: string;

  @Expose()
  genre: Genre;

  @Expose()
  description?: string;
}