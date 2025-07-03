import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Discussion } from 'src/schemas/discussion.schema';
import { CreateDiscussionDto } from 'src/dto/createDiscussion.dto';
import { UsersService } from 'src/users/user.service';
import { BookDiscussionResponseDto } from 'src/dto/bookDiscussionResponse.dto';
import { v4 as uuidv4 } from 'uuid';


@Injectable()
export class DiscussionsService {
  constructor(
    @InjectModel(Discussion.name) private discussionModel: Model<Discussion>,
    private readonly _usersService : UsersService
 ) {}

  async findAllByBook(bookId: string) : Promise<BookDiscussionResponseDto[]> {

    const discussions = await this.discussionModel
    .find({ bookId })
    .select('userId content createdAt discussionId')
    .sort({ createdAt: -1 })
    .lean()
    .exec();
    let userMap: Map<string, string> = new Map();
    const userIds = [...new Set(discussions.map(d => d.userId))];
      const users = await this._usersService.getUsersbyIds(userIds); 
      userMap = new Map(users.map(u => [u.userId, u.name]));
    const discussionDtos : BookDiscussionResponseDto[] = discussions.map(d => ({
      discussionId : d.discussionId,
      userName: userMap.get(d.userId) || "Unknown",
      content: d.content,
      createdAt: d.createdAt,
    }));
    if(!discussions){
      console.log("No discussions");
      
    }
    await new Promise(resolve => setTimeout(resolve, 5000));
    return discussionDtos;

  }

  async create(createDiscussionDto: CreateDiscussionDto) {
    const user = await this._usersService.getCurrentUser()
    
    const createdDiscussion = new this.discussionModel({
      ...createDiscussionDto,
      discussionId: uuidv4(),
      userId: user?.userId,
      createdAt: Date.now()
    });
    createdDiscussion.save();
    return true;
  }
}