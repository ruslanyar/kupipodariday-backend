import { IsDateString, IsInt, IsUrl, Length } from 'class-validator';

export class UserPublicProfileResponseDto {
  @IsInt()
  id: number;

  @Length(2, 30)
  username: string;

  @Length(2, 200)
  about: string;

  @IsUrl()
  avatar: string;

  @IsDateString()
  createdAt: string;

  @IsDateString()
  updatedAt: string;
}
