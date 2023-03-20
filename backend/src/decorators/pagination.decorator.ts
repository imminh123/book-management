import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const Pagination = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    let page = request?.query?.page;
    let perPage = request?.query?.perPage;

    page = +page || 1;
    perPage = +perPage || 20;

    const startIndex = (page - 1) * perPage;
    const endIndex = page * perPage;

    return {
      page,
      perPage,
      startIndex,
      endIndex,
    };
  },
);
