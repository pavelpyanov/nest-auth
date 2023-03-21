import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class JWTAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();

    try {
      const authorization = req.headers.authorization.split(' ');
      const bearer = authorization[0];
      const token = authorization[1];

      if (bearer !== 'Bearer' || !token) {
        throw new UnauthorizedException();
      }

      const user = this.jwtService.verify(token);
      console.log(user);
      return true;
    } catch (e) {
      throw new UnauthorizedException();
    }
  }
}
