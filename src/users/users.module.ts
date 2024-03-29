import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { AppGateway } from "src/app.gateway";
import { User, UserSchema } from "./schemas/user.schema";
import { UsersController } from "./users.controller";
import { UsersRepository } from "./users.repository";
import { UsersService } from "./users.service";

@Module({
    imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
    controllers: [UsersController],
    providers: [UsersService, UsersRepository, AppGateway]
})
export class UsersModule {}