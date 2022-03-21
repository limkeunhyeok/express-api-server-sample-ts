import request from "supertest";
import { CreateUserDto } from "../../src/dtos/user.dto";
import { verify } from "../../src/lib/jwt";
import { createUser, mockUserRaw } from "../lib/mockup";
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

describe("Auth API (e2e)", () => {
  const app = getServer();
  const req = request(app);
  
  const rootApiPath = "/api/auth";
  
  describe("POST /api/auth/signUp", () => {
    const apiPath = `${rootApiPath}/signUp`;
    it("success - signup (200)", async () => {
      // given
      const headers = await fetchHeaders(req);
      const withHeaders = withHeadersBy(headers);

      const userRaw = mockUserRaw();
      const params: CreateUserDto = {
        email: userRaw.email,
        password: userRaw.password,
        nick: userRaw.nick,
      };

      // when
      const res = await withHeaders(req.post(apiPath).send(params).expect(200));

      // then
      expect(isApiResponse(res.body)).toBe(true);
      expectResponseSucceed(res);

      const result = getResponseData(res);
      expect(result).toHaveProperty('_id');
      expect(result).toHaveProperty('email', userRaw.email);
      expect(result).toHaveProperty('password');
      expect(result).toHaveProperty('nick', userRaw.nick);
      expect(result).toHaveProperty('createdAt');
      expect(result).toHaveProperty('updatedAt');
    })
  })

  describe("POST /api/auth/signIn", () => {
    const apiPath = `${rootApiPath}/signIn`;
    it("success - signin (200)", async () => {
      // given
      const headers = await fetchHeaders(req);
      const withHeaders = withHeadersBy(headers);

      const userRaw = mockUserRaw();
      await createUser(userRaw);
      const params = {
        email: userRaw.email,
        password: userRaw.password,
      };

      // when
      const res = await withHeaders(req.post(apiPath).send(params).expect(200));

      // then
      expect(isApiResponse(res.body)).toBe(true);
      expectResponseSucceed(res);

      const result = getResponseData(res);
      expect(result.token).toBeTruthy();

      const decoded = verify(result.token);
      expect(decoded).toHaveProperty('id', userRaw._id);
      expect(decoded).toHaveProperty('nick', userRaw.nick);
    })
  })
})