import { Controller, Post, Body, Get, Param, Put, Delete, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';

@Controller({ path: "users", version: '1' })
@UseGuards(AuthGuard('jwt'))
export class UserController {
  constructor(private userService: UserService) { }

  @Post()
  async createUser(@Body() body: { nome: string; email: string; password: string; imageUrl: string }) {
    return this.userService.createUser(body);
  }

  @Get()
  async getAllUsers() {
    return this.userService.getAllUsers();
  }

  @Get(':id')
  async getUserById(@Param('id') id: number) {
    return this.userService.getUserById(Number(id));
  }

  @Put(':id')
  async updateUser(
    @Param('id') id: number,
    @Body() body: Partial<{ nome: string; email: string; imageUrl: string }>,
  ) {
    return this.userService.updateUser(Number(id), body);
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: number) {
    return this.userService.deleteUser(Number(id));
  }
}
