import { Controller, Post, Body, Get, Put, Param, Delete } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { User } from '../schemas/user.schema';
import { objectResponse } from '../utils/util';

@Controller('user')
export class UserController {

    constructor(private readonly _userS: UserService) {}

    @Get()
    async get(): Promise<User[]> {
        return await this._userS.get().then(resp => objectResponse(resp))
    }
    
    @Post()
    async add(@Body() user: User) {
        return await this._userS.add(user).then(resp => objectResponse(resp))
    }

    @Put('/:id')
    async edit(@Param('id') id: string, @Body() user: User) {
        user._id = id
        return await this._userS.edit(user).then(resp => objectResponse(resp))
    }

    @Get(':id')
    async getById(@Param('id') id:string) {
        const res = await this._userS.getById(id)
        return objectResponse(res)
    }

    @Delete(':id')
    async remove(@Param('id') id:string) {
        const res = await this._userS.remove(id)
        return objectResponse(res)
    }
}
