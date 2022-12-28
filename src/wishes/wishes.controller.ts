import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
} from '@nestjs/common';

import { WishesService } from './wishes.service';

import { JwtGuard } from 'src/auth/jwt.guard';

import { CreateWishDto } from './dto/create-wish.dto';
import { UpdateWishDto } from './dto/update-wish.dto';
import { RequestWithUser } from 'src/utils/request-with-user';

@Controller('wishes')
export class WishesController {
  constructor(private readonly wishesService: WishesService) {}

  @UseGuards(JwtGuard)
  @Post()
  create(@Body() createWishDto: CreateWishDto, @Req() req: RequestWithUser) {
    return this.wishesService.create(createWishDto, req.user.id);
  }

  @Get('last')
  findLast() {
    return this.wishesService.findMany({
      order: { createdAt: 'DESC' },
      take: 40,
    });
  }

  @Get('top')
  findTop() {
    return this.wishesService.findMany({ order: { copied: 'DESC' }, take: 10 });
  }

  @UseGuards(JwtGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.wishesService.findOne({
      where: { id: +id },
      relations: { owner: true },
    });
  }

  @UseGuards(JwtGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Req() req: RequestWithUser,
    @Body() updateWishDto: UpdateWishDto,
  ) {
    return this.wishesService.update(+id, req.user.id, updateWishDto);
  }

  @UseGuards(JwtGuard)
  @Delete(':id')
  remove(@Param('id') id: string, @Req() req: RequestWithUser) {
    return this.wishesService.remove(+id, req.user.id);
  }

  @UseGuards(JwtGuard)
  @Post(':id/copy')
  copy(@Param('id') wishId: string, @Req() req: RequestWithUser) {
    return this.wishesService.copy(+wishId, req.user.id);
  }
}
