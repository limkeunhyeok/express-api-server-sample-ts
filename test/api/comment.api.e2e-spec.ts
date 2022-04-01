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
  
  describe("POST /api/comment", () => {
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
    });

    it("failed - bad request (400) # requied email", async () => {
      // given
      const headers = await fetchHeaders(req);
      const withHeaders = withHeadersBy(headers);

      const userRaw = mockUserRaw();
      const params = {
        password: userRaw.password,
        nick: userRaw.nick,
      };

      // when
      const res = await withHeaders(req.post(apiPath).send(params).expect(400));

      // then
      expect(isApiResponse(res.body)).toBe(true);
      expectResponseFailed(res);
    });
    
    it("failed - bad request (400) # requied password", async () => {
      // given
      const headers = await fetchHeaders(req);
      const withHeaders = withHeadersBy(headers);

      const userRaw = mockUserRaw();
      const params = {
        email: userRaw.email,
        nick: userRaw.nick,
      };

      // when
      const res = await withHeaders(req.post(apiPath).send(params).expect(400));

      // then
      expect(isApiResponse(res.body)).toBe(true);
      expectResponseFailed(res);
    });
    
    it("failed - bad request (400) # requied nick", async () => {
      // given
      const headers = await fetchHeaders(req);
      const withHeaders = withHeadersBy(headers);

      const userRaw = mockUserRaw();
      const params = {
        email: userRaw.email,
        password: userRaw.password,
      };

      // when
      const res = await withHeaders(req.post(apiPath).send(params).expect(400));

      // then
      expect(isApiResponse(res.body)).toBe(true);
      expectResponseFailed(res);
    });
    
    it("failed - bad request (400) # invalid email", async () => {
      // given
      const headers = await fetchHeaders(req);
      const withHeaders = withHeadersBy(headers);

      const userRaw = mockUserRaw();
      const params = {
        email: "example",
        password: userRaw.password,
        nick: userRaw.nick
      };

      // when
      const res = await withHeaders(req.post(apiPath).send(params).expect(400));

      // then
      expect(isApiResponse(res.body)).toBe(true);
      expectResponseFailed(res);
    });
    
    it("failed - bad request (400) # invalid password - to short", async () => {
      // given
      const headers = await fetchHeaders(req);
      const withHeaders = withHeadersBy(headers);

      const userRaw = mockUserRaw();
      const params = {
        email: userRaw.email,
        password: "1234567",
        nick: userRaw.nick
      };

      // when
      const res = await withHeaders(req.post(apiPath).send(params).expect(400));

      // then
      expect(isApiResponse(res.body)).toBe(true);
      expectResponseFailed(res);
    });
    
    it("failed - bad request (400) # invalid password - to long", async () => {
      // given
      const headers = await fetchHeaders(req);
      const withHeaders = withHeadersBy(headers);

      const userRaw = mockUserRaw();
      const params = {
        email: userRaw.email,
        password: "12345678901234567",
        nick: userRaw.nick
      };

      // when
      const res = await withHeaders(req.post(apiPath).send(params).expect(400));

      // then
      expect(isApiResponse(res.body)).toBe(true);
      expectResponseFailed(res);
    });
  });
});