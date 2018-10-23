import { SessionGuard } from './../../common/guards/session.guard';
import { AppAuthGuard } from './../../common/guards/app-auth.guard';
import {
  Controller,
  Res,
  Post,
  UseGuards,
  Req,
  Render,
  Get,
} from '@nestjs/common';

@Controller('auth')
export class AuthController {

  @Get('login')
  @Render('auth/login')
  public async getlogin(@Res() response, @Req() request) {
    return;
  }

  @Post('login')
  @UseGuards(AppAuthGuard)
  public async login(@Res() response, @Req() request) {
    return response.json({ user: request.session.passport.user });
  }

  @Get('logout')
  @UseGuards(SessionGuard)
  public logout(@Res() response, @Req() request) {
    request.logout();
    return response.redirect('/auth/logout');
  }
}
