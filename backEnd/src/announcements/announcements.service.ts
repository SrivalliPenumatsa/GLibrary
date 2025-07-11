import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Announcement } from 'src/schemas/announcement.schema';
import { CreateAnnouncementDto } from 'src/dto/createAnnouncement.dto';
import { UsersService } from 'src/users/user.service';
import { AnnouncementsResponseDto } from 'src/dto/announcementsResponse.dto';
import { v4 as uuidv4 } from 'uuid';
import { Observable } from 'rxjs';
import { UpdateAnnouncementDto } from 'src/dto/updateAnnouncement.dto';
import { SseService } from 'src/shared/sse.service';

@Injectable()
export class AnnouncementsService {
  constructor(
    @InjectModel(Announcement.name)
    private announcementModel: Model<Announcement>,
    private readonly sseService: SseService,
    private readonly _usersService: UsersService,
  ) {}

  async GetUserAnnouncements(
    page: number,
  ): Promise<{ announcementDtos: AnnouncementsResponseDto[]; total: number }> {
    const limit = 9;
    const skip = (page - 1) * limit;
    const currentUser = await this._usersService.getCurrentUser();

    const announcements = await this.announcementModel
      .find({ userId: currentUser?.userId })
      .select('userId title description createdAt announcementId')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .exec();

    const announcementDtos : AnnouncementsResponseDto[] = announcements.map((a) => ({
      announcementId: a.announcementId,
      title: a.title,
      description: a.description,
      createdAt: a.createdAt.toLocaleString(),
      userName: currentUser?.name,
    }));
    const total = await this.announcementModel
      .countDocuments({ userId: currentUser?.userId })
      .exec();
    await new Promise((resolve) => setTimeout(resolve, 5000));

    return {announcementDtos, total}
  }

  async findAll(
    page: number,
  ): Promise<{
    announcementDtos: AnnouncementsResponseDto[];
    total: number;
  }> {
    const limit = 9;
    const skip = (page - 1) * limit;
    const announcements = await this.announcementModel
      .find()
      .select('announcementId userId title description createdAt')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .exec();
    const userIds = [...new Set(announcements.map((a) => a.userId))];
    const users = await this._usersService.getUsersbyIds(userIds);
    const userMap: Map<string, string> = new Map(
      users.map((u) => [u.userId, u.name]),
    );
    const total = await this.announcementModel.countDocuments().exec();
    const announcementDtos: AnnouncementsResponseDto[] = announcements.map(
      (a) => ({
        announcementId : a.announcementId,
        title: a.title,
        description: a.description,
        createdAt: a.createdAt.toLocaleString(),
        userName: userMap.get(a.userId),
      }),
    );
    // await new Promise((resolve) => setTimeout(resolve, 5000));
    
    return {
      announcementDtos,
      total,
    };
  }

  async create(
    createAnnouncementDto: CreateAnnouncementDto,
  ){
    const currentUser = await this._usersService.getCurrentUser();
    const createdAnnouncement = new this.announcementModel({
      ...createAnnouncementDto,
      announcementId: uuidv4(),
      createdAt: Date.now(),
      userId: currentUser?.userId,
    });
    const savedAnnouncement = await createdAnnouncement.save();

    const newAnnouncement: AnnouncementsResponseDto = {
      ...createAnnouncementDto,
      announcementId: savedAnnouncement.announcementId,
      createdAt: savedAnnouncement.createdAt.toLocaleString(),
      userName: currentUser?.name,
    };

    console.log(" created announcement ", newAnnouncement);
    this.sseService.pushEvent({
      type: 'CREATE',
      data: newAnnouncement,
    });
    return newAnnouncement;

  }

  async delete(announcementId: string): Promise<boolean> {
    const result = await this.announcementModel.deleteOne({ announcementId });
    if (result.deletedCount === 0) {
      throw new NotFoundException(
        `Announcement with ID ${announcementId} not found`,
      );
    }
    this.sseService.pushEvent({
      type: 'DELETE',
      data: { _id: announcementId },
    });
    return true;
  }

  async updateAnnouncement(updateAnnouncementDto: UpdateAnnouncementDto) {
    const { announcementId, ...updateData } = updateAnnouncementDto;
    const existing = await this.announcementModel.findOne({ announcementId });
    if (!existing) {
      throw new NotFoundException(
        `Announcement with ID ${announcementId} not found`,
      );
    }
    Object.assign(existing, updateData);
    const result = await existing.save();
    const currentUser = await this._usersService.getCurrentUser();
    const updatedAnnouncement: AnnouncementsResponseDto = {
      announcementId: result.announcementId,
      title: result.title,
      description: result.description,
      createdAt: result.createdAt.toLocaleString(),
      userName: currentUser?.name,
    };
    this.sseService.pushEvent({
      type: 'UPDATE',
      data: updatedAnnouncement,
    });
  }

  getAnnouncementStream(): Observable<AnnouncementsResponseDto> {
    const changeStream = this.announcementModel.watch();
    return new Observable((observer) => {
      changeStream.on('change', async (change) => {
        if (change.operationType === 'insert') {
          const announcement = change.fullDocument;
          observer.next({
            announcementId: announcement.announcementId,
            title: announcement.title,
            description: announcement.description,
            createdAt: announcement.createdAt,
            userName: announcement.userName,
          });
        }
      });

      return () => changeStream.close();
    });
  }
}
