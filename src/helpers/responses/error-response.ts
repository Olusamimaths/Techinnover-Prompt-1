export class ErrorResponse {
  constructor(
    private status: number,
    private message: string,
    private path?: string
  ) {}
}
