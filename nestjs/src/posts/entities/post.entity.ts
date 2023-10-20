import { Post } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { UserEntity } from 'src/user/entities/user.entity';
export class PostEntity implements Post {
    @ApiProperty()
    id: number;

    @ApiProperty()
    title: string;

    @ApiProperty({ required: false, nullable: true })
    description: string | null;

    @ApiProperty()
    body: string;

    @ApiProperty()
    published: boolean;

    @ApiProperty()
    createdAt: Date;

    @ApiProperty()
    updatedAt: Date;

    @ApiProperty({ required: false, type: UserEntity })
    authorId: number | null;

    @ApiProperty({ required: false, type: UserEntity })
    author?: UserEntity;

    constructor({ author, ...data }: Partial<PostEntity>) {
        Object.assign(this, data);

        if (author) {
            this.author = new UserEntity(author);
        }
    }
}