import { Controller, Get, Post, Body, Query, UseGuards, Request, Sse } from '@nestjs/common';
import { DiscussionsService } from './discussions.service';
import { CreateDiscussionDto } from 'src/dto/createDiscussion.dto';
import { JwtGuard } from 'src/common/guards/jwt.guard';

@Controller('discussions')
@UseGuards(JwtGuard)
export class DiscussionsController {
  constructor(
    private readonly discussionsService: DiscussionsService,
  ) {}

  @Get()
  async findAllByBook(@Query('bookId') bookId: string) {
    return await this.discussionsService.findAllByBook(bookId);
  }

  @Post()
  async create(
    @Request() req: any,
    @Body() createDiscussionDto: CreateDiscussionDto
  ) {
    const discussion = await this.discussionsService.create(createDiscussionDto);
    return { message: "Discussion created successfully" };
  }
}
