import { Controller, Get, Post, Body, Query, UseGuards, Request, Sse, Patch, Delete, Param } from '@nestjs/common';
import { AnnouncementsService } from './announcements.service';
import { CreateAnnouncementDto } from 'src/dto/createAnnouncement.dto';
import { AnnouncementsResponseDto } from 'src/dto/announcementsResponse.dto';
import { ApiHeader } from '@nestjs/swagger';
import { map, Observable, interval, merge } from 'rxjs';
import { UpdateAnnouncementDto } from 'src/dto/updateAnnouncement.dto';
import { SseService } from 'src/shared/sse.service';
import { JwtGuard } from 'src/common/guards/jwt.guard';

interface MessageEvent{
  data: string|object
}

@ApiHeader({
  name: 'authorize',
  description: 'Custom header example',
  required: true,
})
@Controller('announcements')
@UseGuards(JwtGuard)
export class AnnouncementsController {
  constructor(private readonly announcementsService: AnnouncementsService,
    private readonly sseService: SseService,
  ) {}

  @Get()
  async findAllPerPage (
    @Query('page') page: number = 1,
  ):Promise<{ announcementDtos: AnnouncementsResponseDto[], total: number }>  {
    return await this.announcementsService.findAllPerPage(page);
  }

  @Post()
  async create(@Body() createAnnouncementDto: CreateAnnouncementDto) {
 await this.announcementsService.create(createAnnouncementDto);
  }

  @Get('all')
  async findAll(): Promise<{ announcementDtos: AnnouncementsResponseDto[], total: number }>
  {
    return this.announcementsService.findAll();
  }

  @Get('user')
  async GetUserAnnouncements( @Query('page') page: number = 1,): Promise<{ announcementDtos: AnnouncementsResponseDto[], total: number }> {
    return await this.announcementsService.GetUserAnnouncements( page);
  }

  @Patch('update')
  async updateAnnouncement(@Body() announcementDto: UpdateAnnouncementDto,){
    return await this.announcementsService.updateAnnouncement(announcementDto);
  }

  @Delete(':id')
  async deleteAnnouncement(@Param('id') announcementId : string): Promise<boolean>{
    return await this.announcementsService.delete(announcementId);
  }

  @Sse('stream')
stream(): Observable<MessageEvent> {
  const heartbeat$ = interval(90000).pipe(
    map(() => ({
      type: 'HEARTBEAT',
      data: new Date().toISOString(),
    }))
  );

  const announcements$ = this.sseService.getAnnouncementStream();
  return merge(heartbeat$, announcements$).pipe(
    map(event => ({
      data: JSON.stringify(event),
    }))
  );}
};