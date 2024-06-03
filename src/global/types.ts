import { Schema } from 'mongoose';

//User Request
interface User {
  _id: Schema.Types.ObjectId;
  dateOfBirth: Date;
  firstName: string;
  lastName: string;
}

export class UserRequest extends Request {
  user: User;
}
