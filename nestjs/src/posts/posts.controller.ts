import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseGuards } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { PostEntity } from './entities/post.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { AuthService } from 'src/auth/auth.service';
@Controller('posts')
@ApiTags('posts')
export class PostsController {
  constructor(private postsService: PostsService,private readonly authService: AuthService) { }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: PostEntity })
  async create(@Body() createPostDto: CreatePostDto) {
    const checkPostOwnerId = await this.authService.findAuthUserId();
    if(checkPostOwnerId===-1){

    }
    else{
      createPostDto.authorId=checkPostOwnerId;
      console.log(createPostDto)
      return new PostEntity(
        await this.postsService.create(createPostDto),
      );
    }
    
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
    //console.log((await this.authService.findAuthUserId()));
      const postOwnerId = (await this.postsService.findOne(id)).authorId;
      const checkPostOwnerId = await this.authService.findAuthUserId();
      if(postOwnerId===checkPostOwnerId){
        return new PostEntity(
          await this.postsService.update(id, updatePostDto),
        );
      }
      else{
        //console.log(postOwnerId," - ",this.authService.findAuthUserId());
        return "The user has no access for post";
      }
    
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: PostEntity })
  async remove(@Param('id', ParseIntPipe) id: number) {
    return new PostEntity(await this.postsService.remove(id));
  }
}
