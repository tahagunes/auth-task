import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    create(createUserDto: CreateUserDto): Promise<{
        id: number;
        email: string;
        password: string;
    }>;
    findAll(): import(".prisma/client").Prisma.PrismaPromise<{
        id: number;
        email: string;
        password: string;
    }[]>;
    findOne(id: number): Promise<{
        id: number;
        email: string;
        password: string;
    }>;
    update(id: number, updateUserDto: UpdateUserDto): Promise<{
        id: number;
        email: string;
        password: string;
    }>;
    remove(id: number): string;
}
