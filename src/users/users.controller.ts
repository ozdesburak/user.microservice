import { Body, Controller, Get, Logger, Param, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiBody, ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import { User } from './schemas/user.schema';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  private logger = new Logger('UserController')
  constructor(private readonly usersService: UsersService) {}

  
  @Get(':userId')
  async getUser(@Param('userId') userId: string): Promise<User> {
    return this.usersService.getUserById(userId);
  }

  @Get()
  async getUsers(): Promise<User[]> {
      return this.usersService.getUsers();
  }

  @UsePipes(new ValidationPipe())
  @Post()
  @ApiCreatedResponse({description:'User Create'})
  @ApiTags('UserAdd')
  @ApiBody({type:CreateUserDto})
  // @ApiOkResponse({description:'User Add'})
  async createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
      this.logger.log(JSON.stringify(createUserDto))
      return this.usersService.createUser(createUserDto.email, createUserDto.age)
  }

  @UsePipes(new ValidationPipe())
  @Patch(':userId')
  async updateUser(@Param('userId') userId: string, @Body() updateUserDto: UpdateUserDto): Promise<User> {
      return this.usersService.updateUser(userId, updateUserDto);
  }
}
