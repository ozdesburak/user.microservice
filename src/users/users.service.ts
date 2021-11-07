import { HttpStatus } from "@nestjs/common";
import { HttpException, Injectable } from "@nestjs/common";
import { exception } from "console";
import { AppGateway } from "src/app.gateway";
import { v4 as uuidv4 } from 'uuid';
import { UpdateUserDto } from "./dto/update-user.dto";

import { User } from "./schemas/user.schema";
import { UsersRepository } from "./users.repository";

@Injectable()
export class UsersService {
    constructor(
        private readonly usersRepository: UsersRepository,
        private gateway:AppGateway
        
        ) {}

    async getUserById(userId: string): Promise<User> {
        const user = await this.usersRepository.findOne({ userId });        
        if(!user) throw new HttpException('Not found user',HttpStatus.NOT_FOUND);
        return user
    }

    async getUsers(): Promise<User[]> {
        const users = await this.usersRepository.find({});
        if(!users) throw new HttpException('Not found user',HttpStatus.NOT_FOUND);
        return users;
    }

    async createUser(email: string, age: number): Promise<User> {
        const user = await this.usersRepository.create({
            userId: uuidv4(),
            email,
            age,
            favoriteFoods: []
        })

        //socket
        this.gateway.wss.emit('NewUser', user)

        return user
    }

    async updateUser(userId: string, userUpdates: UpdateUserDto): Promise<User> {
        return this.usersRepository.findOneAndUpdate({ userId }, userUpdates);
    }
}