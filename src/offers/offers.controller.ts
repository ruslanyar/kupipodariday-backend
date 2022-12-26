import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Req,
  UseGuards,
} from '@nestjs/common';

import { JwtGuard } from 'src/auth/jwt.guard';

import { OffersService } from './offers.service';
import { CreateOfferDto } from './dto/create-offer.dto';

import { RequestWithUser } from 'src/utils/request-with-user';

@UseGuards(JwtGuard)
@Controller('offers')
export class OffersController {
  constructor(private readonly offersService: OffersService) {}

  @Post()
  create(@Body() createOfferDto: CreateOfferDto, @Req() req: RequestWithUser) {
    return this.offersService.create(createOfferDto, req.user.id);
  }

  @Get()
  getOffers() {
    return this.offersService.findMany({
      relations: {
        item: { owner: true },
        user: { wishes: true, offers: true },
      },
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.offersService.findOne({
      where: { id: +id },
      relations: {
        item: { owner: true },
        user: { wishes: true, offers: true },
      },
    });
  }
}
