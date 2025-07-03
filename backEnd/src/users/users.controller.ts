import { Controller, Post, Body, Patch, Query, Get, Request, UseGuards, Param } from '@nestjs/common';
import { UsersService } from './user.service';
import { CreateUserDto } from 'src/dto/createUser.dto';
import { User } from 'src/schemas/users.schema';
import { GoogleAuthGuard } from 'src/common/guards/googleAuth.guard';
import { JwtGuard } from 'src/common/guards/jwt.guard';

@Controller('users')
@UseGuards(JwtGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // @Post()
  // async findOrCreate(@Body() createUserDto: CreateUserDto): Promise<User> {
  //   console.log("UsersController post");
    
  //   console.log(createUserDto);
    
  //   return this.usersService.findOrCreate(createUserDto);
  // }

  @Patch()
  async updateLastActivity(){
    console.log("updateLastActivity patch");
    await this.usersService.updateLastActivity();
  }

  @Get()
  async getCurrentUser(){
    const user = await this.usersService.getCurrentUser();
    return {name : user?.name};
  }
}