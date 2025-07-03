import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { Request } from 'express';
import { lastValueFrom } from 'rxjs';
// import { JwtService } from '@nestjs/jwt';
import * as jwt from 'jsonwebtoken';


@Injectable()
export class JwtGuard implements CanActivate {
  constructor(private readonly httpService: HttpService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    console.log("AuthorizeGuard start");

    const request: Request = context.switchToHttp().getRequest();
    console.log("request.url.. in auth guard .. ",request.url);

    let jwtToken = request.header('JwtToken')
    console.log("JWT TOKEN ",jwtToken);
    try{
      const secret = process.env.JWT_SECRET;
      if (!secret) {
        throw new Error('JWT_SECRET is not defined');
      }
      
      const payload =  jwt.verify(jwtToken!, secret);
      console.log("User payload fron jwt.. ",payload);
      request['user'] = payload;
      // request.user = payload;

      
    }  catch (error) {
      console.error("JWT verification failed:", error);
      throw new UnauthorizedException('Invalid token');
    }
    return true;
  }
}