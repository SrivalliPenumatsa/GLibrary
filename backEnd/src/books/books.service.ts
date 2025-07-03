import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Book } from 'src/schemas/book.schema';
import { CreateBookDto } from 'src/dto/createBook.dto';
import { BookResponseDto } from 'src/dto/bookResponse.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class BooksService {
  constructor(@InjectModel(Book.name) private bookModel: Model<Book>) {}

  async findAll(search?: string, genre?: string): Promise<BookResponseDto[]> {
    const query: any = {};
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { author: { $regex: search, $options: 'i' } },
      ];
    }
    if (genre) {
      query.genre = genre;
    }
    const books = await this.bookModel
      .find(query)
      .select('bookId title author genre')
      .lean()
      .exec();
    const dtos = books.map(book => Object.assign(new BookResponseDto(), book));
    return dtos;
  }

  async findOne(bookId: string){
    const book = await this.bookModel
      .findOne({ bookId })
      .select('bookId title author genre description')
      .lean()
      .exec();

    if (!book) {
      throw new BadRequestException(`Book with bookId ${bookId} not found`);
    }
    const bookDto = Object.assign(new BookResponseDto(), book);
    return bookDto;
  }

  async create(createBookDto: CreateBookDto): Promise<Book> {    
    const createdBook = new this.bookModel({
      ...createBookDto,
      bookId: uuidv4(),
      
    });
    return createdBook.save();
  }
}