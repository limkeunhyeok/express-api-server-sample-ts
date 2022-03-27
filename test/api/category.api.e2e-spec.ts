import request from "supertest";
import { CreateCategoryDto } from "../../src/dtos";
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
  describe("POST /api/categories", () => {
    const apiPath = `${rootApiPath}`;
    it("success - create category (200)", async () => {
      // given
      const headers = await fetchHeaders(req);
      const withHeaders = withHeadersBy(headers);

      const categoryRaw = mockCategoryRaw();
      const params: CreateCategoryDto = {
        title: categoryRaw.title,
      };

      // when
      const res = await withHeaders(req.post(apiPath).send(params).expect(200));

      // then
      expect(isApiResponse(res.body)).toBe(true);
      expectResponseSucceed(res);

      const result = getResponseData(res);
      expect(result).toHaveProperty('_id');
      expect(result).toHaveProperty('title', categoryRaw.title);
      expect(result).toHaveProperty('createdAt');
    });

    it("failed - bad request (400) # requied title", async () => {
      // given
      const headers = await fetchHeaders(req);
      const withHeaders = withHeadersBy(headers);

      const categoryRaw = mockCategoryRaw();
      const params = {};

      // when
      const res = await withHeaders(req.post(apiPath).send(params).expect(400));

      // then
      expect(isApiResponse(res.body)).toBe(true);
      expectResponseFailed(res);
    });
  });

  describe("GET /api/categories", () => {
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
      result.forEach((category) => {
        expect(category).toHaveProperty('_id');
        expect(category).toHaveProperty('title');
        expect(category).toHaveProperty('createdAt');
      });
    });
  });
});