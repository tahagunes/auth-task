import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseGuards } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { PostEntity } from './entities/post.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { AuthService } from './../auth/auth.service';
import { JwtService } from '@nestjs/jwt';

@Controller('posts')
@ApiTags('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) { }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: PostEntity })
  async create(@Body() createPostDto: CreatePostDto) {

    return new PostEntity(
      await this.postsService.create(createPostDto),
    );
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: PostEntity, isArray: true })
  async findAll() {

    const posts = await this.postsService.findAll();
    return posts.map((post) => new PostEntity(post));
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: PostEntity })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return new PostEntity(await this.postsService.findOne(id));
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: PostEntity })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePostDto: UpdatePostDto) {
    return new PostEntity(
      await this.postsService.update(id, updatePostDto),
    );
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: PostEntity })
  async remove(@Param('id', ParseIntPipe) id: number) {
    return new PostEntity(await this.postsService.remove(id));
  }
}
