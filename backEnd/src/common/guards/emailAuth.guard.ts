import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { Request } from 'express';
import { lastValueFrom } from 'rxjs';
// import { JwtService } from '@nestjs/jwt';
import * as jwt from 'jsonwebtoken';


@Injectable()
export class EmailAuthGuard implements CanActivate {
  constructor(private readonly httpService: HttpService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    console.log("AuthorizeGuard start");

    const request: Request = context.switchToHttp().getRequest();
    console.log("request.url.. in auth guard .. ",request.url); 
    console.log("request.body.. in auth guard .. ",request.body); 

      return true;
    } catch (error) {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }