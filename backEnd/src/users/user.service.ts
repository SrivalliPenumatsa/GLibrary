import { Inject, Injectable, Scope } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/schemas/users.schema';
import { CreateUserDto } from 'src/dto/createUser.dto';
import { v4 as uuidv4 } from 'uuid';
import { REQUEST } from '@nestjs/core';

@Injectable({ scope: Scope.REQUEST })
export class UsersService {
  constructor(@InjectModel(User.name) private _userModel: Model<User>,
  @Inject(REQUEST) private readonly request: Request) {}

  async findOrCreate(createUserDto : CreateUserDto): Promise<User> {
    let user = await this._userModel.findOne({ email: createUserDto.email }).exec();
    if (!user) {
      user = new this._userModel({
        // userId: Date.now().toString(),
        userId: uuidv4(),
        email : createUserDto.email,
        name : createUserDto.name,
        lastInteraction: Date.now()
      });
      if(createUserDto.password)
      {
        user.password = createUserDto.password
      }
      await user.save();
    }
  
    return user;
  }

  async getCurrentUser() {
    const user =  await this._userModel.findOne({email: await this.request['user'].sub});
    return user;
  }

  
  async Create(email: string, userName: string, password?: string): Promise<User> {
    console.log("email ",email," userName ",userName, " password ",password);
    
      const user = new this._userModel({
        // userId: Date.now().toString(),
        userId: uuidv4(),
        email : email,
        lastInteraction: Date.now()
      });
      if(userName)
        {
          user.name = userName
        }
        if(password)
          {
            user.password = password
          }
          console.log("user... ",user);
          
      await user.save();   
      return user;
  }

  async getUserByMail(mail:string)
  {
    console.log(mail);
    
    let user = await this._userModel.findOne({email: mail})
    console.log("User with mail.. ",mail, "  :  ", user);
    
    return user;
  }

  async getUserIdByMail(mail:string)
  {
    let user = await this._userModel.findOne({email: mail})
    console.log("User with mail ",mail, "  :  ", user);
    
    return user?.userId;
  }

  async getUserById(id:string)
  {
    let user = await this._userModel.findOne({userId: id})
    console.log("User with mail.......... ",id, "  :  ", user);
    
    return user;
  }

  async geUserByMongoId(id: object)
  {
    return await this._userModel.findById(id);
  }

  async getUsersbyIds(userIds : string[])
  {
    // console.log( await this._userModel.find({ userId: { $in: userIds } }).select('userId name').lean().exec() );
    
    return await this._userModel.find({ userId: { $in: userIds } }).select('userId name').lean().exec();  }



  async updateLastActivity()
  {
    // let user = await this.getCurrentUser();
    // if (user) {
    //   user.lastInteraction = new Date;
    //   await user.save();
    // }
  }
}