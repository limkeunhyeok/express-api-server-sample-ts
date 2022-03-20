import * as faker from "faker";
import UserModel from "../../src/models/user.model";
import { User } from "../../src/interfaces/user.interface";
import { ObjectID } from "bson";
import { hashSync } from "bcrypt";

const userModel = UserModel;

export function mockUserRaw(): User {
  const now = new Date().toISOString();
  return {
    _id: new ObjectID().toString(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    nick: faker.lorem.word(),
    createdAt: now,
    updatedAt: now,
  }
}

export async function createUser(userRaw: User = mockUserRaw()) {
  const data = JSON.parse(JSON.stringify(userRaw));
  data.password = hashSync(data.password, 10);
  const user = await userModel.create(data);
  return user;
}