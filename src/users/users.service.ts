import {Injectable, NotFoundException} from '@nestjs/common';
import {CreateUserDto} from './dto/create-user.dto';
import {UpdateUserDto} from './dto/update-user.dto';
import {Repository} from "typeorm";
import {User} from "./entities/user.entity";
import {InjectRepository} from "@nestjs/typeorm";

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) {}

    async create(createUserDto: CreateUserDto) {
        return await this.userRepository.save(createUserDto);
    }

    async findAll(): Promise<User[]> {
        return this.userRepository.find();
    }

    async findOne(id: number) {
        const user = await this.userRepository.findOneBy({id});
        if (!user) {
            throw new NotFoundException(`User with id ${id} not found`);
        }
        return user;
    }

    async update(id: number, updateUserDto: UpdateUserDto) {
        const user = await this.userRepository.findOneBy({id});
        if (!user) {
            throw new NotFoundException(`User with id ${id} not found`);
        }
        return this.userRepository.save({...user, ...updateUserDto});
    }

    async remove(id: number) {
        const user = await this.userRepository.findOneBy({id});
        if (!user) {
            throw new NotFoundException(`User with id ${id} not found`);
        }
        await this.userRepository.delete(id);
        return `User #${id} was deleted`;
    }
}
