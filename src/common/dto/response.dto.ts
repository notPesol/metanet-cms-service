export class ResponseDTO<T> {
  data: T;
  message: string = 'success';
  totalItem: number = 0;
}
