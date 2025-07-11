import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';


@Injectable()
export class EmailAuthGuard implements CanActivate {
  constructor() {}

  async canActivate(context: ExecutionContext): Promise<boolean> {

    const request: Request = context.switchToHttp().getRequest();
 
      return true;
    }
  }