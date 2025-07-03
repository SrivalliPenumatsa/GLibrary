import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { BookSchema, Book } from 'src/schemas/book.schema';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [MongooseModule.forFeature([{ name: Book.name, schema: BookSchema }]), HttpModule],
  controllers: [BooksController],
  providers: [BooksService],
})
export class BooksModule {}