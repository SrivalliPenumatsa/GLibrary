import { Expose, Transform } from 'class-transformer';
export class BookDiscussionResponseDto {
    @Expose()
    discussionId: string;
    @Expose()
    userName: string;
    @Expose()
    content: string;
    @Expose()
    @Transform(({ value }) => value.toISOString(), { toPlainOnly: true })
    createdAt: Date;
    
}