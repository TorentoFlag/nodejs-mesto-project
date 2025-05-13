export interface IUser {
  name?: string;
  about?: string;
  avatar?: string;
  email: string;
  password: string;
  comparePassword(incomingPass: string): Promise<boolean>;
}
