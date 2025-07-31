import {Body, Controller, Delete, Get, Param, Patch, Post} from '@nestjs/common';
import {UsersService} from './users.service';
import {CreateUserDto} from './dto/create-user.dto';
import {UpdateUserDto} from './dto/update-user.dto';
import {User} from "./entities/user.entity";
import {plainToInstance} from "class-transformer";
import {CheckUserDto} from "./dto/chack-user.dto";

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {
    }

    @Post()
    async create(@Body() createUserDto: CreateUserDto): Promise<User> {
        const user = await this.usersService.create(createUserDto);
        return plainToInstance(User, user);
    }

    @Get()
    async findAll(): Promise<User[]> {
        const users = await this.usersService.findAll();
        return users.map(user => plainToInstance(User, user));
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<User> {
        const user = await this.usersService.findOne(+id);
        return plainToInstance(User, user);
    }

    @Patch(':id')
    async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto): Promise<User> {
        const user = await this.usersService.update(+id, updateUserDto);
        return plainToInstance(User, user);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.usersService.remove(+id);
    }

    @Post('/check')
    async checkPassword(@Body() checkUserDto: CheckUserDto): Promise<User> {
        const user = await this.usersService.checkUser(checkUserDto.email, checkUserDto.password);
        return plainToInstance(User, user);
    }
}
