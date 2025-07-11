import { Expose, Transform } from 'class-transformer';
export class AnnouncementsResponseDto{
@Expose()
announcementId?: string
  @Expose()
  title: string;

  @Expose()
  description: string;

  @Expose()
  @Transform(({ value }) => value.toISOString(), { toPlainOnly: true })
  createdAt: string;

  @Expose()
  userName?: string;
}