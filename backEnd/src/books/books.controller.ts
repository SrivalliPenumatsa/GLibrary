import { Controller, Get, Post, Body, Query, UseGuards, Param } from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from 'src/dto/createBook.dto';
import { Book } from 'src/schemas/book.schema';
import { Genre } from 'src/common/enums/genre.enum';
import { BookResponseDto } from 'src/dto/bookResponse.dto';
import { ApiHeader, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from 'src/common/guards/jwt.guard';

@ApiHeader({
  name: 'authorize',
  description: 'Custom header example',
  required: true,
})

@ApiTags('books')
@Controller('books')
@UseGuards(JwtGuard)
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get()
  async findAll(
    @Query('search') search?: string,
    @Query('genre') genre?: Genre,
  ): Promise<BookResponseDto[]> {
    return this.booksService.findAll(search, genre);
  }

  @Get(':id')
  async findOne(@Param('id') id: string):Promise<BookResponseDto> {    
    return this.booksService.findOne(id);
  }

  @Post()
  async create(@Body() createBookDto: CreateBookDto): Promise<Book> {
    return this.booksService.create(createBookDto);
  }
}