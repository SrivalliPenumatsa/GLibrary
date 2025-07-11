
// import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
// import { JwtService } from '@nestjs/jwt';
// import { GoogleLoginDto } from 'src/dto/googleLogin.dto';
// import { LoginDto } from 'src/dto/login.dto';
// import { RegisterDto } from 'src/dto/register.dto';
// import { User } from 'src/schemas/users.schema';
// import { UsersService } from 'src/users/user.service';

// @Injectable()
// export class AuthService {
//   constructor(private usersService: UsersService,
//     private jwtService: JwtService
//   ) {}

//   async LogIn( loginDto : LoginDto): Promise<any> {
//     console.log("Login registerDto", loginDto);
//     const user = await this.usersService.getUserByMail(loginDto.email);
//     if(!user || !user.password)
//     {
//       throw new UnauthorizedException("Not a resistered mail address");
//     }
//     if(user?.password && user?.password !== loginDto.password)
//     {
//       throw new UnauthorizedException("Incorrect password");
//     }
//     const payload = { sub: user?.email, userId:  user?.userId, userName:user.name };
//     return {
//       jwtToken: await this.jwtService.signAsync(payload),
//     };
//   }

//   async Register(registerDto : RegisterDto): Promise<User> {
//     const existingUser = await this.usersService.getUserByMail(registerDto.email);
//     if (existingUser && existingUser.password) {
//         throw new BadRequestException("Already have a user with this mail id");
//     }
//     const user = await this.usersService.Create(registerDto.email, registerDto.username, registerDto.password);
//     return user;
//   }

//   async GoogleLogin (loginDto : GoogleLoginDto): Promise<any> {
//     const user = await this.usersService.getUserByMail(loginDto.email) || await this.usersService.Create(loginDto.email, loginDto.name)
//     const payload = { sub: user?.email, userId:user?.userId, userName:user.name };
//     return {
//       jwtToken : await this.jwtService.signAsync(payload),
//     };
//   } 
// }
import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { GoogleLoginDto } from 'src/dto/googleLogin.dto';
import { LoginDto } from 'src/dto/login.dto';
import { LoginResponseDto } from 'src/dto/loginResponse.dto';
import { RegisterDto } from 'src/dto/register.dto';
import { User } from 'src/schemas/users.schema';
import { UsersService } from 'src/users/user.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  private async generateToken(user: User, provider: 'local' | 'google') {
    const payload = { 
      sub: user.email, 
      userId: user.userId, 
      userName: user.name,
      provider, 
      iat: Math.floor(Date.now() / 1000),
    };

    return {
      jwtToken: await this.jwtService.signAsync(payload, {
        expiresIn: '1h',
        issuer: 'GLibrary',
        audience: 'readers', 
      }),
      expiresIn: 3600,
    };
  }

  async LogIn(loginDto: LoginDto): Promise<LoginResponseDto> {
    const user = await this.usersService.getUserByMail(loginDto.email);
    
    if (!user || !user.password) {
      throw new UnauthorizedException("Not a registered mail address");
    }
    
    if (user.password !== loginDto.password) {
      throw new UnauthorizedException("Incorrect password");
    }

    return {
      name: user.name,
      email: user.email,
      token: (await this.generateToken(user, 'local')).jwtToken
    };
  }

  async Register(registerDto: RegisterDto): Promise<User> {
    const existingUser = await this.usersService.getUserByMail(registerDto.email);
    
    if (existingUser && existingUser.password) {
      throw new BadRequestException("Already have a user with this mail id");
    }
    
    const user = await this.usersService.Create(
      registerDto.email, 
      registerDto.username, 
      registerDto.password
    );
    
    return user;
  }

  async GoogleLogin(loginDto: GoogleLoginDto): Promise<LoginResponseDto> {

    const user = await this.usersService.getUserByMail(loginDto.email) || await this.usersService.Create(loginDto.email, loginDto.name)
    return {
      name: user.name,
      email: user.email,
      token: (await this.generateToken(user, 'local')).jwtToken
    };  }
}