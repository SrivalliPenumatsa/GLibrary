import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { Request } from 'express';
import { lastValueFrom } from 'rxjs';
// import { JwtService } from '@nestjs/jwt';
import * as jwt from 'jsonwebtoken';


@Injectable()
export class GoogleAuthGuard implements CanActivate {
  constructor(private readonly httpService: HttpService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    console.log("AuthorizeGuard start");

    const request: Request = context.switchToHttp().getRequest();
    console.log("request.url.. in auth guard .. ",request.url);

    let token = request.headers.authorization?.split(' ')[1] || request.header('authorize');
    if (!token) {
      console.log("No token");
      throw new UnauthorizedException('No OAuth token provided');
    }

    try {
      const response = await lastValueFrom(
        this.httpService.get('https://www.googleapis.com/oauth2/v3/userinfo', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }),
      );      

      request['user'] = response.data;
      console.log("request['user']"); 
      console.log(request['user']);


    //   {
    //     sub: '115071614193818195451',
    //     name: 'Srivalli Penumatsa',
    //     given_name: 'Srivalli',
    //     family_name: 'Penumatsa',
    //     picture: 'https://lh3.googleusercontent.com/a/ACg8ocKrO4Q6qPLFMgjPMmOO24B4QOQEtpfjjDc9WhX4lEImtQ27mA=s96-c',
    //     email: 'vallipenumatsa1234@gmail.com',
    //     email_verified: true
    //   }
      console.log(request.path);
      console.log("request.url.. in auth guard .. ",request.url);
      console.log(request.method);
      console.log("AuthorizeGuard end");
      return true;
    } catch (error) {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}