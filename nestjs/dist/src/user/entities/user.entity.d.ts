import { User } from '@prisma/client';
export declare class UserEntity implements User {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    email: string;
    password: string | null;
}
