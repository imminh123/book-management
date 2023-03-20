import { Response } from 'express';

export interface IPaginationHeader {
  'x-page': number;
  'x-total-count'?: number;
  'x-pages-count'?: number;
  'x-per-page': number;
  'x-next-page': number;
}

export interface IPagination {
  page: number;
  perPage: number;
  startIndex?: number;
  endIndex?: number;
}

export interface IPaginationResponse<T> {
  items: T[];
  headers: IPaginationHeader;
}

export function getPaginateHeaders(
  pagination: IPagination,
  totalCount: number,
): IPaginationHeader {
  const page = Number(pagination.page);
  const perPage = Number(pagination.perPage);
  const pagesCount = Math.ceil(totalCount / perPage);

  return {
    'x-page': page,
    'x-total-count': totalCount,
    'x-pages-count': pagesCount,
    'x-per-page': perPage,
    'x-next-page': page === pagesCount ? page : page + 1,
  };
}

export function setPaginationResponseHeader(
  res: Response,
  pagedObjects: any,
): any {
  for (const key in pagedObjects.headers) {
    if (pagedObjects.headers.hasOwnProperty(key)) {
      res.append(key, pagedObjects.headers[key]);
    }
  }
  const { headers, ...body } = pagedObjects;
  return res.json(body);
}
