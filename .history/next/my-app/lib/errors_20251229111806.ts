class HttpError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

type WithMessage = {
  message: string;
};

export const isErrorWithMessage = (err: unknown): err is WithMessage =>
  typeof err === "object" && err !== null && "message" in err;
