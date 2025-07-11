import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { Request } from 'express';
import * as jwt from 'jsonwebtoken';


@Injectable()
export class JwtGuard implements CanActivate {
  constructor() {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    console.log("AuthorizeGuard start");

    const request: Request = context.switchToHttp().getRequest();
    console.log("request.url.. in auth guard .. ",request.url);
    console.log("Headers in be ",request.headers);
    

    const token = request.header('Authorization')!.split(' ')[1];
    console.log("Authorization Token in be ...  ", token);
    

    try{
      const secret = process.env.JWT_SECRET;
      if (!secret) {
        throw new Error('JWT_SECRET is not defined');
      }
      const payload =  jwt.verify(token, secret);
      request['user'] = payload;

      
    }  catch (error) {
      console.error("JWT verification failed:", error);
      throw new UnauthorizedException('Invalid token');
    }
    return true;
  }
}