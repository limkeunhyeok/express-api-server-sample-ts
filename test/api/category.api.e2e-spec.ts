import request from "supertest";
import { CreateUserDto } from "../../src/dtos/user.dto";
import { verify } from "../../src/lib/jwt";
import { createCategory, mockCategoryRaw } from "../lib/mockup";
import {
  expectResponseFailed,
  expectResponseSucceed,
  fetchHeaders,
  fetchUserTokenAndHeaders,
  getResponseData,
  getServer,
  isApiResponse,
  withHeadersBy,
} from "../lib/utils";

describe("Category API (e2e)", () => {
  const app = getServer();
  const req = request(app);
  
  const rootApiPath = "/api/categories";
});