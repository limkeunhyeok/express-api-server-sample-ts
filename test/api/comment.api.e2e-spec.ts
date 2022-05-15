import { ObjectId } from "mongodb";
import request from "supertest";
import { CreateUserDto } from "../../src/dtos/user.dto";
import { verify } from "../../src/lib/jwt";
import {
  createUser,
  createCategory,
  createPost,
  createComment,
  mockCommentRaw,
  mockPostRaw,
} from "../lib/mockup";
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

describe("Comment API (e2e)", () => {
  const app = getServer();
  const req = request(app);

  const rootApiPath = "/api/comments";

  describe("POST /api/comments", () => {
    const apiPath = `${rootApiPath}`;
    it("success - create comment (200)", async () => {
      // given
      const headers = await fetchHeaders(req);
      const withHeaders = withHeadersBy(headers);

      const user = await createUser();
      const category = await createCategory();

      const postRaw = mockPostRaw(user, category);
      const post = await createPost(postRaw);

      const commentRaw = mockCommentRaw(user, post);
      const params = {
        userId: commentRaw.userId,
        content: commentRaw.content,
      };

      // when
      const res = await withHeaders(
        req
          .post(`${apiPath}`)
          .query({ postId: post._id.toString() })
          .send(params)
          .expect(200)
      );

      // then
      expect(isApiResponse(res.body)).toBe(true);
      expectResponseSucceed(res);

      const result = getResponseData(res);
      expect(result).toHaveProperty("_id");
      expect(result).toHaveProperty("userId", user._id.toString());
      expect(result).toHaveProperty("postId", post._id.toString());
      expect(result).toHaveProperty("content", params.content);
    });

    it("failed - bad request (400) # required user id", async () => {
      // given
      const headers = await fetchHeaders(req);
      const withHeaders = withHeadersBy(headers);

      const user = await createUser();
      const category = await createCategory();

      const postRaw = mockPostRaw(user, category);
      const post = await createPost(postRaw);

      const commentRaw = mockCommentRaw(user, post);
      const params = {
        // userId: commentRaw.userId,
        content: commentRaw.content,
      };

      // when
      const res = await withHeaders(
        req
          .post(`${apiPath}`)
          .query({ postId: post._id.toString() })
          .send(params)
          .expect(400)
      );

      // then
      expect(isApiResponse(res.body)).toBe(true);
      expectResponseFailed(res);
    });

    it("failed - bad request (400) # required post id", async () => {
      // given
      const headers = await fetchHeaders(req);
      const withHeaders = withHeadersBy(headers);

      const user = await createUser();
      const category = await createCategory();

      const postRaw = mockPostRaw(user, category);
      const post = await createPost(postRaw);

      const commentRaw = mockCommentRaw(user, post);
      const params = {
        userId: commentRaw.userId,
        content: commentRaw.content,
      };

      // when
      const res = await withHeaders(
        req.post(`${apiPath}`).send(params).expect(400)
      );

      // then
      expect(isApiResponse(res.body)).toBe(true);
      expectResponseFailed(res);
    });

    it("failed - bad request (400) # required cotent", async () => {
      // given
      const headers = await fetchHeaders(req);
      const withHeaders = withHeadersBy(headers);

      const user = await createUser();
      const category = await createCategory();

      const postRaw = mockPostRaw(user, category);
      const post = await createPost(postRaw);

      const commentRaw = mockCommentRaw(user, post);
      const params = {
        userId: commentRaw.userId,
        // content: commentRaw.content,
      };

      // when
      const res = await withHeaders(
        req
          .post(`${apiPath}`)
          .query({ postId: post._id.toString() })
          .send(params)
          .expect(400)
      );

      // then
      expect(isApiResponse(res.body)).toBe(true);
      expectResponseFailed(res);
    });

    it("failed - bad request (400) # non-existent user", async () => {
      // given
      const headers = await fetchHeaders(req);
      const withHeaders = withHeadersBy(headers);

      const user = await createUser();
      const category = await createCategory();

      const postRaw = mockPostRaw(user, category);
      const post = await createPost(postRaw);

      const commentRaw = mockCommentRaw(user, post);
      const params = {
        userId: new ObjectId(),
        content: commentRaw.content,
      };

      // when
      const res = await withHeaders(
        req
          .post(`${apiPath}`)
          .query({ postId: post._id.toString() })
          .send(params)
          .expect(400)
      );

      // then
      expect(isApiResponse(res.body)).toBe(true);
      expectResponseFailed(res);
    });

    it("failed - bad request (400) # non-existent post", async () => {
      // given
      const headers = await fetchHeaders(req);
      const withHeaders = withHeadersBy(headers);

      const user = await createUser();
      const category = await createCategory();

      const postRaw = mockPostRaw(user, category);
      const post = await createPost(postRaw);

      const commentRaw = mockCommentRaw(user, post);
      const params = {
        userId: commentRaw.userId,
        content: commentRaw.content,
      };
      const postId = new ObjectId();

      // when
      const res = await withHeaders(
        req
          .post(`${apiPath}`)
          .query({ postId: postId })
          .send(params)
          .expect(400)
      );

      // then
      expect(isApiResponse(res.body)).toBe(true);
      expectResponseFailed(res);
    });
  });
});
