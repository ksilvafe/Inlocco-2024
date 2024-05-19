declare namespace Express {
  export interface Request {
    user: {
      cuid: string;
    };
    files: Express.MulterS3.File[];
    file?: Express.MulterS3.File;
  }
}
