import client from "../client";
import { useQuery, useMutation } from "react-query";
import { IBook } from "../../interface/book.interface";

export const BookApiService = {
  useList: () =>
    useQuery("bookList", async (): Promise<{ items: IBook[] }> => {
      try {
        return await client.get("books").json();
      } catch (error) {
        throw error;
      }
    }),

  useDetail: (id: string) =>
    useQuery(["bookDetail", id], async () => {
      try {
        return await client.get(`books/${id}`).json();
      } catch (error) {
        throw error;
      }
    }),

  createBook: ({
    onSuccessCb,
    onErrorCb,
    onSettled,
  }: {
    onSuccessCb: () => void;
    onErrorCb: (err: any) => void;
    onSettled: () => void;
  }) =>
    useMutation({
      mutationFn: async (payload: IBook) => {
        try {
          return await client.post("books", { json: payload });
        } catch (error) {
          throw error;
        }
      },
      onSuccess: onSuccessCb,
      onError: onErrorCb,
      onSettled: onSettled,
    }),

  deleteBook: ({
    onSuccessCb,
    onErrorCb,
    onSettled,
  }: {
    onSuccessCb?: () => void;
    onErrorCb?: (err: any) => void;
    onSettled?: () => void;
  }) =>
    useMutation({
      mutationFn: async (id: string) => {
        try {
          return await client.delete(`books/${id}`);
        } catch (error) {
          throw error;
        }
      },
      onSuccess: onSuccessCb,
      onError: onErrorCb,
      onSettled: onSettled,
    }),

  updateBook: ({
    onSuccessCb,
    onErrorCb,
    onSettled,
  }: {
    onSuccessCb?: () => void;
    onErrorCb?: (err: any) => void;
    onSettled?: () => void;
  }) =>
    useMutation({
      mutationFn: async (payload: IBook) => {
        try {
          return await client.put(`books/${payload.isbn}`, { json: payload });
        } catch (error) {
          throw error;
        }
      },
      onSuccess: onSuccessCb,
      onError: onErrorCb,
      onSettled: onSettled,
    }),
};
