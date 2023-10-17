import { UserService } from './user/user.service';
export declare class AppController {
    private readonly userService;
    constructor(userService: UserService);
    getHello(): string;
}
