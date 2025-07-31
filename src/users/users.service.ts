import {Injectable, NotFoundException, UnauthorizedException} from '@nestjs/common';
import {CreateUserDto} from './dto/create-user.dto';
import {UpdateUserDto} from './dto/update-user.dto';
import {EntityNotFoundError, Repository} from "typeorm";
import {User} from "./entities/user.entity";
import {InjectRepository} from "@nestjs/typeorm";
import * as bcrypt from "bcrypt";

const saltRounds = 10;

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {
    }

    async create(createUserDto: CreateUserDto) {
        createUserDto.password = await bcrypt.hash(createUserDto.password, saltRounds);
        const user = this.userRepository.create(createUserDto);
        return await this.userRepository.save(user);
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
            if (updateUserDto.name) {
                user.name = updateUserDto.name;
            }
            if (updateUserDto.password) {
                user.password = await bcrypt.hash(updateUserDto.password, saltRounds);
            }
            if (updateUserDto.email) {
                user.email = updateUserDto.email;
            }
            return this.userRepository.save(user);
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

    async checkUser(email: string, password: string): Promise<User> {
        try {
            const user = await this.userRepository.findOneByOrFail({email});
            if (await bcrypt.compare(password, user.password)) {
                return user;
            }
        } catch (error) {
            throw new UnauthorizedException('Wrong credentials');
        }

        throw new UnauthorizedException('Wrong credentials');
    }
}
