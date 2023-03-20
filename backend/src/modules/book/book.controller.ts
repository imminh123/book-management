import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  HttpStatus,
  Query,
  HttpCode,
  Res,
  UseGuards,
} from '@nestjs/common';
import { UpdateBookDto } from './dto/update-book.dto';
import {
  ApiOperation,
  ApiTags,
  ApiBearerAuth,
  ApiResponse,
  ApiQuery,
} from '@nestjs/swagger';
import { Pagination } from '../../decorators/pagination.decorator';
import {
  IPagination,
  setPaginationResponseHeader,
} from '../../utils/pagination';
import { IndexBookFilter } from './dto/get-book.dto';
import { BookService } from './book.service';
import { BookDto } from './dto/book.dto';
import { AuthenticatedGuard } from '../auth/auth.guard';

@ApiTags('book')
@ApiBearerAuth('access-token')
@Controller('books')
@UseGuards(AuthenticatedGuard)
export class BookController {
  constructor(private readonly booksService: BookService) {}

  @Post()
  @ApiResponse({
    status: HttpStatus.OK,
    type: BookDto,
    description: 'Book created successfully',
  })
  @ApiOperation({
    operationId: 'createBook',
    summary: 'Create book',
    description: 'Create book',
  })
  create(@Body() createBookDto: BookDto) {
    return this.booksService.createBook(createBookDto);
  }

  @Get('')
  @ApiQuery({
    name: 'page',
    required: false,
    description: 'Page number',
    type: 'Number',
  })
  @ApiQuery({
    name: 'perPage',
    required: false,
    description: 'Items per page',
    type: 'Number',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: [BookDto],
  })
  @ApiOperation({
    operationId: 'indexBooks',
    summary: 'Get all books',
    description: 'Get all books',
  })
  async indexBooks(
    @Pagination() pagination: IPagination,
    @Res() res,
    @Query() filters: IndexBookFilter,
  ) {
    const pagedBooks = await this.booksService.indexBook(filters, pagination);
    return setPaginationResponseHeader(res, pagedBooks);
  }

  @Get(':id')
  @ApiResponse({
    status: HttpStatus.OK,
    type: BookDto,
    description: 'Get book detail',
  })
  @ApiOperation({
    operationId: 'getBookDetail',
    summary: 'View book records detail',
    description: 'View book records detail',
  })
  getBook(@Param('id') id: string) {
    return this.booksService.getBook(id);
  }

  @Put(':isbn')
  @ApiResponse({
    status: HttpStatus.OK,
    type: BookDto,
    description: 'Get book detail',
  })
  @ApiOperation({
    operationId: 'updateBook',
    summary: 'Update book records',
    description: 'Update book records',
  })
  update(@Param('isbn') isbn: string, @Body() updateBookDto: UpdateBookDto) {
    return this.booksService.updateByIsbn(isbn, updateBookDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiResponse({ status: HttpStatus.NO_CONTENT, description: 'No Content' })
  @ApiOperation({
    operationId: 'deleteBook',
    summary: 'Delete book records',
    description: 'Delete book records',
  })
  remove(@Param('id') id: string) {
    return this.booksService.removeBook(id);
  }
}
