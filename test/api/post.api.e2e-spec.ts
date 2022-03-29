import { ObjectId } from "mongodb";
import request from "supertest";
import { CreatePostDto } from "../../src/dtos";
import { CreateUserDto } from "../../src/dtos/user.dto";
import { verify } from "../../src/lib/jwt";
import { createCategory, createPost, createUser, mockPostRaw, mockUserRaw } from "../lib/mockup";
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

describe("POST API (e2e)", () => {
  const app = getServer();
  const req = request(app);
  
  const rootApiPath = "/api/posts";
  
  describe("POST /api/posts", () => {
    const apiPath = `${rootApiPath}`;
    it("success - create post (200)", async () => {
      // given
      const headers = await fetchHeaders(req);
      const withHeaders = withHeadersBy(headers);

      const user = await createUser();
      const category = await createCategory();
      const postRaw = mockPostRaw(user, category);
      const params = {
        userId: postRaw.userId,
        categoryId: postRaw.categoryId,
        title: postRaw.title,
        content: postRaw.content
      }

      // when
      const res = await withHeaders(req.post(apiPath).send(params).expect(200));

      // then
      expect(isApiResponse(res.body)).toBe(true);
      expectResponseSucceed(res);

      const result = getResponseData(res);
      expect(result).toHaveProperty('_id');
      expect(result).toHaveProperty('userId', postRaw.userId.toString());
      expect(result).toHaveProperty('categoryId', postRaw.categoryId.toString());
      expect(result).toHaveProperty('title', postRaw.title);
      expect(result).toHaveProperty('content', postRaw.content);
      expect(result).toHaveProperty('createdAt');
      expect(result).toHaveProperty('updatedAt');
    });

    it("failed - bad request (400) # requied title", async () => {
      // given
      const headers = await fetchHeaders(req);
      const withHeaders = withHeadersBy(headers);
      
      const user = await createUser();
      const category = await createCategory();
      const postRaw = mockPostRaw(user, category);
      const params = {
        userId: postRaw.userId,
        categoryId: postRaw.categoryId,
        content: postRaw.content,
      }

      // when
      const res = await withHeaders(req.post(apiPath).send(params).expect(400));

      // then
      expect(isApiResponse(res.body)).toBe(true);
      expectResponseFailed(res);
    });
    
    it("failed - bad request (400) # requied content", async () => {
      // given
      const headers = await fetchHeaders(req);
      const withHeaders = withHeadersBy(headers);
      
      const user = await createUser();
      const category = await createCategory();
      const postRaw = mockPostRaw(user, category);
      const params = {
        userId: postRaw.userId,
        categoryId: postRaw.categoryId,
        title: postRaw.title,
      }

      // when
      const res = await withHeaders(req.post(apiPath).send(params).expect(400));

      // then
      expect(isApiResponse(res.body)).toBe(true);
      expectResponseFailed(res);
    });
    
    it("failed - bad request (400) # requied userId", async () => {
      // given
      const headers = await fetchHeaders(req);
      const withHeaders = withHeadersBy(headers);
      
      const user = await createUser();
      const category = await createCategory();
      const postRaw = mockPostRaw(user, category);
      const params = {
        categoryId: postRaw.categoryId,
        title: postRaw.title,
        content: postRaw.content,
      }

      // when
      const res = await withHeaders(req.post(apiPath).send(params).expect(400));

      // then
      expect(isApiResponse(res.body)).toBe(true);
      expectResponseFailed(res);
    });
    
    it("failed - bad request (400) # requied categoryId", async () => {
      // given
      const headers = await fetchHeaders(req);
      const withHeaders = withHeadersBy(headers);
      
      const user = await createUser();
      const category = await createCategory();
      const postRaw = mockPostRaw(user, category);
      const params = {
        userId: postRaw.userId,
        title: postRaw.title,
        content: postRaw.content,
      }

      // when
      const res = await withHeaders(req.post(apiPath).send(params).expect(400));

      // then
      expect(isApiResponse(res.body)).toBe(true);
      expectResponseFailed(res);
    });
  });

  describe("GET /api/posts", () => {
    const apiPath = `${rootApiPath}`;
    it("success - find all posts (200)", async () => {
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
      result.forEach((post) => {
        expect(post).toHaveProperty('_id');
        expect(post).toHaveProperty('userId');
        expect(post).toHaveProperty('categoryId');
        expect(post).toHaveProperty('title');
        expect(post).toHaveProperty('content');
        expect(post).toHaveProperty('createdAt');
        expect(post).toHaveProperty('updatedAt');
      });
    });
  });

  describe("GET /api/posts/{id}", () => {
    const apiPath = `${rootApiPath}`;
    it("success - find one by id (200)", async () => {
      // given
      const headers = await fetchHeaders(req);
      const withHeaders = withHeadersBy(headers);

      const user = await createUser();
      const category = await createCategory();
      const postRaw = mockPostRaw(user, category);
      const post = await createPost(postRaw);
      const postId = post._id;

      // when
      const res = await withHeaders(req.get(`${apiPath}/${postId}`).expect(200));

      // then
      expect(isApiResponse(res.body)).toBe(true);
      expectResponseSucceed(res);

      const result = getResponseData(res);
      expect(result).toHaveProperty('_id');
      expect(result).toHaveProperty('userId');
      expect(result).toHaveProperty('categoryId');
      expect(result).toHaveProperty('title');
      expect(result).toHaveProperty('content');
      expect(result).toHaveProperty('createdAt');
      expect(result).toHaveProperty('updatedAt');
    });
    
    it("failed - bad request (200) # non-existent post", async () => {
      // given
      const headers = await fetchHeaders(req);
      const withHeaders = withHeadersBy(headers);

      const user = await createUser();
      const category = await createCategory();
      const postRaw = mockPostRaw(user, category);
      await createPost(postRaw);
      const postId = new ObjectId()

      // when
      const res = await withHeaders(req.get(`${apiPath}/${postId}`).expect(400));

      // then
      expect(isApiResponse(res.body)).toBe(true);
      expectResponseFailed(res);
    });
  });

  describe("PUT /api/posts/{id}", () => {
    const apiPath = `${rootApiPath}`;
    it("success - update post (200)", async () => {
      // given
      const headers = await fetchHeaders(req);
      const withHeaders = withHeadersBy(headers);

      const user = await createUser();
      const category = await createCategory();
      const postRaw = mockPostRaw(user, category);
      const post = await createPost(postRaw);
      const postId = post._id;

      const newPostRaw = mockPostRaw(user, category);
      const params = {
        title: newPostRaw.title,
        content: newPostRaw.content,
      }

       // when
       const res = await withHeaders(req.put(`${apiPath}/${postId}`).send(params).expect(200));

       // then
       expect(isApiResponse(res.body)).toBe(true);
       expectResponseSucceed(res);
 
       const result = getResponseData(res);
       expect(result).toHaveProperty('_id');
       expect(result).toHaveProperty('userId');
       expect(result).toHaveProperty('categoryId');
       expect(result).toHaveProperty('title', newPostRaw.title);
       expect(result).toHaveProperty('content', newPostRaw.content);
       expect(result).toHaveProperty('createdAt');
       expect(result).toHaveProperty('updatedAt');
    });

    it("failed - bad request (400) # non-existent post", async () => {
      // given
      const headers = await fetchHeaders(req);
      const withHeaders = withHeadersBy(headers);

      const user = await createUser();
      const category = await createCategory();
      const postRaw = mockPostRaw(user, category);
      await createPost(postRaw);

      const postId = new ObjectId();

      const newPostRaw = mockPostRaw(user, category);
      const params = {
        title: newPostRaw.title,
        content: newPostRaw.content,
      }

       // when
       const res = await withHeaders(req.put(`${apiPath}/${postId}`).send(params).expect(400));

       // then
       expect(isApiResponse(res.body)).toBe(true);
       expectResponseFailed(res);
    });
    
    it("failed - bad request (400) # required title", async () => {
      // given
      const headers = await fetchHeaders(req);
      const withHeaders = withHeadersBy(headers);

      const user = await createUser();
      const category = await createCategory();
      const postRaw = mockPostRaw(user, category);
      const post = await createPost(postRaw);
      const postId = post._id;

      const newPostRaw = mockPostRaw(user, category);
      const params = {
        content: newPostRaw.content,
      }

       // when
       const res = await withHeaders(req.put(`${apiPath}/${postId}`).send(params).expect(400));

       // then
       expect(isApiResponse(res.body)).toBe(true);
       expectResponseFailed(res);
    });
    
    it("failed - bad request (400) # required content", async () => {
      // given
      const headers = await fetchHeaders(req);
      const withHeaders = withHeadersBy(headers);

      const user = await createUser();
      const category = await createCategory();
      const postRaw = mockPostRaw(user, category);
      const post = await createPost(postRaw);
      const postId = post._id;

      const newPostRaw = mockPostRaw(user, category);
      const params = {
        title: newPostRaw.title,
      }

       // when
       const res = await withHeaders(req.put(`${apiPath}/${postId}`).send(params).expect(400));

       // then
       expect(isApiResponse(res.body)).toBe(true);
       expectResponseFailed(res);
    });
  });

  describe("DELETE /api/posts/{id}", () => {
    const apiPath = `${rootApiPath}`;
    it("success - delete post (200)", async () => {
      // given
      const headers = await fetchHeaders(req);
      const withHeaders = withHeadersBy(headers);

      const user = await createUser();
      const category = await createCategory();
      const postRaw = mockPostRaw(user, category);
      const post = await createPost(postRaw);
      const postId = post._id;

       // when
       const res = await withHeaders(req.delete(`${apiPath}/${postId}`).expect(200));

       // then
       expect(isApiResponse(res.body)).toBe(true);
       expectResponseSucceed(res);
 
       const result = getResponseData(res);
       expect(result).toHaveProperty('_id');
       expect(result).toHaveProperty('userId');
       expect(result).toHaveProperty('categoryId');
       expect(result).toHaveProperty('title');
       expect(result).toHaveProperty('content');
       expect(result).toHaveProperty('createdAt');
       expect(result).toHaveProperty('updatedAt');
    });
    
    it("failed - bad request (400) # non-existent post", async () => {
      // given
      const headers = await fetchHeaders(req);
      const withHeaders = withHeadersBy(headers);

      const user = await createUser();
      const category = await createCategory();
      const postRaw = mockPostRaw(user, category);
      await createPost(postRaw);

      const postId = new ObjectId();

       // when
       const res = await withHeaders(req.delete(`${apiPath}/${postId}`).expect(400));

       // then
       expect(isApiResponse(res.body)).toBe(true);
       expectResponseFailed(res);
    });
  })
});