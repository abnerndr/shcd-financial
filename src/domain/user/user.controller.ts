import { Body, Controller, Get, Param, Put } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { UserUpdateDto } from 'src/dto/user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: 'Get all users' })
  @Get('all')
  async findAll() {
    return await this.userService.findAll();
  }

  @ApiOperation({ summary: 'Get user by id' })
  @Get(':id')
  async findById(@Param('id') id: string) {
    return await this.userService.findById(id);
  }

  @ApiOperation({ summary: 'Delete user by id' })
  @Get('delete/:id')
  async delete(@Param('id') id: string) {
    return await this.userService.delete(id);
  }

  @ApiOperation({ summary: 'Update user by id' })
  @Put('update/:id')
  async update(@Param('id') id: string, @Body() payload: UserUpdateDto) {
    return await this.userService.update(id, payload);
  }
}
