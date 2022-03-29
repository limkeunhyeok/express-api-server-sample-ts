import { ObjectID } from "bson";
import request from "supertest";
import { CreateCategoryDto, UpdateCategoryDto } from "../../src/dtos";
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
  
  describe("GET /api/categories/{id}", () => {
    const apiPath = `${rootApiPath}`;
    it("success - find one by id (200)", async () => {
      // given
      const headers = await fetchHeaders(req);
      const withHeaders = withHeadersBy(headers);

      const categoryRaw = mockCategoryRaw();
      await createCategory(categoryRaw);

      const categoryId = categoryRaw._id;

      // when
      const res = await withHeaders(req.get(`${apiPath}/${categoryId}`).expect(200));

      // then
      expect(isApiResponse(res.body)).toBe(true);
      expectResponseSucceed(res);

      const result = getResponseData(res);
      expect(result).toHaveProperty('_id');
      expect(result).toHaveProperty('title');
      expect(result).toHaveProperty('createdAt');
    });
    
    it("failed - bad request (400) # non-existent category", async () => {
      // given
      const headers = await fetchHeaders(req);
      const withHeaders = withHeadersBy(headers);
      
      const categoryId = new ObjectID();

      // when
      const res = await withHeaders(req.get(`${apiPath}/${categoryId}`).expect(400));

      // then
      expect(isApiResponse(res.body)).toBe(true);
      expectResponseFailed(res);
    });
  });

  describe("PUT /api/categories/{id}", () => {
    const apiPath = `${rootApiPath}`
    it("success - update category (200)", async() => {
      // given
      const headers = await fetchHeaders(req);
      const withHeaders = withHeadersBy(headers);

      const category = await createCategory();
      const categoryId = category._id.toString();

      const categoryRaw = mockCategoryRaw();
      const params: UpdateCategoryDto = {
        title: categoryRaw.title,
      };

      // when
      const res = await withHeaders(req.put(`${apiPath}/${categoryId}`).send(params).expect(200));

      // then
      expect(isApiResponse(res.body)).toBe(true);
      expectResponseSucceed(res);

      const result = getResponseData(res);
      expect(result).toHaveProperty('_id', categoryId);
      expect(result).toHaveProperty('title', params.title);
      expect(result).toHaveProperty('createdAt');
    });

    it("failed - bad request (400) # non-existent category", async() => {
      // given
      const headers = await fetchHeaders(req);
      const withHeaders = withHeadersBy(headers);
      
      await createCategory();
      const categoryId = new ObjectID();
      
      const categoryRaw = mockCategoryRaw();
      const params: UpdateCategoryDto = {
        title: categoryRaw.title,
      };

      // when
      const res = await withHeaders(req.put(`${apiPath}/${categoryId}`).send(params).expect(400));

      // then
      expect(isApiResponse(res.body)).toBe(true);
      expectResponseFailed(res);
    });

    it("failed - bad request (400) # requied title", async() => {
      // given
      const headers = await fetchHeaders(req);
      const withHeaders = withHeadersBy(headers);
      
      const category = await createCategory();
      const categoryId = category._id.toString();
      
      const categoryRaw = mockCategoryRaw();
      const params = {};

      // when
      const res = await withHeaders(req.put(`${apiPath}/${categoryId}`).send(params).expect(400));

      // then
      expect(isApiResponse(res.body)).toBe(true);
      expectResponseFailed(res);
    })
  });

  describe("DELETE /api/categories/{id}", () => {
    const apiPath = `${rootApiPath}`;
    it("success - delete category (200)", async () => {
      // given
      const headers = await fetchHeaders(req);
      const withHeaders = withHeadersBy(headers);

      const category = await createCategory();
      const categoryId = category._id.toString();

      // when
      const res = await withHeaders(req.delete(`${apiPath}/${categoryId}`).expect(200));

      // then
      expect(isApiResponse(res.body)).toBe(true);
      expectResponseSucceed(res);

      const result = getResponseData(res);
      expect(result).toHaveProperty('_id', categoryId);
      expect(result).toHaveProperty('title');
      expect(result).toHaveProperty('createdAt');
    });

    it("failed - bad request (400) # non-existent category", async () => {
      // given
      const headers = await fetchHeaders(req);
      const withHeaders = withHeadersBy(headers);

      const categoryId = new ObjectID();

      // when
      const res = await withHeaders(req.delete(`${apiPath}/${categoryId}`).expect(400));

      // then
      expect(isApiResponse(res.body)).toBe(true);
      expectResponseFailed(res);
    });
  });
});