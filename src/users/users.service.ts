import {Injectable, NotFoundException} from '@nestjs/common';
import {CreateUserDto} from './dto/create-user.dto';
import {UpdateUserDto} from './dto/update-user.dto';
import {EntityNotFoundError, Repository} from "typeorm";
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
        try {
            return await this.userRepository.findOneByOrFail({id});
        } catch (error) {
            if (error instanceof EntityNotFoundError) {
                throw new NotFoundException(`User with ID ${id} not found.`);
            }
            throw error;
        }
    }

    async update(id: number, updateUserDto: UpdateUserDto) {
        try {
            const user = await this.userRepository.findOneByOrFail({id});
            return this.userRepository.save({...user, ...updateUserDto});
        } catch (error) {
            if (error instanceof EntityNotFoundError) {
                throw new NotFoundException(`User with ID ${id} not found.`);
            }
            throw error;
        }
    }

    async remove(id: number) {
        try {
            const user = await this.userRepository.findOneByOrFail({id});
        } catch (error) {
            if (error instanceof EntityNotFoundError) {
                throw new NotFoundException(`User with ID ${id} not found.`);
            }
            throw error;
        }

        await this.userRepository.softDelete(id);
        return `User #${id} was deleted`;
    }
}
