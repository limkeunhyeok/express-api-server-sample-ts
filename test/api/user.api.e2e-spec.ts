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

describe("User API (e2e)", () => {
  const app = getServer();
  const req = request(app);
  
  const rootApiPath = "/api/users";
  
  describe("GET /api/users", () => {
    const apiPath = `${rootApiPath}`;
    it("success - find all (200)", async () => {
      // given
      const headers = await fetchHeaders(req);
      const withHeaders = withHeadersBy(headers);

      // when
      const res = await withHeaders(req.get(apiPath).expect(200));

      // then
      expect(isApiResponse(res.body)).toBe(true);
      expectResponseSucceed(res);

      const result = getResponseData(res);
      expect(Array.isArray(result)).toBe(true)
      result.forEach((user) => {
        expect(user).toHaveProperty('_id');
        expect(user).toHaveProperty('email');
        expect(user).toHaveProperty('password');
        expect(user).toHaveProperty('nick');
        expect(user).toHaveProperty('createdAt');
        expect(user).toHaveProperty('updatedAt');
      })
    });
  });
  
  describe("POST /api/users", () => {
    const apiPath = `${rootApiPath}`;
    it("success - create user (200)", async () => {
      // given
      const headers = await fetchHeaders(req);
      const withHeaders = withHeadersBy(headers);

      const userRaw = mockUserRaw()
      const params = {
        email: userRaw.email,
        password: userRaw.password,
        nick: userRaw.nick
      };

      // when
      const res = await withHeaders(req.post(apiPath).send(params).expect(200));

      // then
      expect(isApiResponse(res.body)).toBe(true);
      expectResponseSucceed(res);

      const result = getResponseData(res);
      expect(result).toHaveProperty('_id');
      expect(result).toHaveProperty('email');
      expect(result).toHaveProperty('password');
      expect(result).toHaveProperty('nick');
      expect(result).toHaveProperty('createdAt');
      expect(result).toHaveProperty('updatedAt');
    });
    
    it("failed - bad request (400) # requied email", async () => {
      // given
      const headers = await fetchHeaders(req);
      const withHeaders = withHeadersBy(headers);

      const userRaw = mockUserRaw()
      const params = {
        password: userRaw.password,
        nick: userRaw.nick
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

      const userRaw = mockUserRaw()
      const params = {
        email: userRaw.email,
        nick: userRaw.nick
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

      const userRaw = mockUserRaw()
      const params = {
        email: userRaw.email,
        password: userRaw.password,
        // nick: userRaw.nick
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

  describe("GET /api/users/{id}", () => {
    const apiPath = `${rootApiPath}`;
    it("success - find one by id (200)", async () => {
      // given
      const headers = await fetchHeaders(req);
      const withHeaders = withHeadersBy(headers);
      
      const userRaw = mockUserRaw();
      await createUser(userRaw);

      const userId = userRaw._id;

      // when
      const res = await withHeaders(req.get(`${apiPath}/${userId}`).expect(200));

      // then
      expect(isApiResponse(res.body)).toBe(true);
      expectResponseSucceed(res);

      const result = getResponseData(res);
      expect(result).toHaveProperty('_id');
      expect(result).toHaveProperty('email');
      expect(result).toHaveProperty('password');
      expect(result).toHaveProperty('nick');
      expect(result).toHaveProperty('createdAt');
      expect(result).toHaveProperty('updatedAt');
    });
  });
});