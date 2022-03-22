import request, { Response } from "supertest";
import App from "../../src/app";
import AuthRoute from "../../src/routes/auth.route";
import UserRoute from "../../src/routes/user.route";
import CategoryRoute from "../../src/routes/category.route";
import PostRoute from "../../src/routes/post.route";
import CommentRoute from "../../src/routes/comment.route";
import { User } from "../../src/interfaces/user.interface";
import { createUser, mockUserRaw } from "./mockup";

export interface Headers {
  token?: string;
}

export function getServer() {
  const app = new App([
    new AuthRoute(),
    new UserRoute(),
    new CategoryRoute(),
    new PostRoute(),
    new CommentRoute()
  ]);
  return app.getServer();
}

export function isApiResponse(body: Record<string, any>) {
  return typeof body.success === "boolean";
}

export function expectResponseSucceed(res: Response) {
  const data = res.body;
  if (isApiResponse(data)) {
    expect(data.success).toBe(true);
    expect(data.response).not.toBeNull();
    expect(data.error).toBeUndefined();
  } else {
    expect(data).not.toBeNull();
  }
}

export function expectResponseFailed(res: Response) {
  const data = res.body;
  if (isApiResponse(data)) {
    expect(data.success).toBe(false);
    expect(data.response).toBeUndefined();
    expect(data.error).not.toBeNull();
  } else {
    expect(typeof data.status).toBe("number");
    expect(data.message).not.toBeNull();
  }
}

export function withHeadersBy(
  headers: Headers,
  options?: Partial<Record<keyof Headers, boolean>>,
) {
  return function withHeaders(req: request.Test) {
    return setHeaders(req, headers, options)
  }
}

export function getHeadersFrom(res: Response, headers: Headers = {}): Headers {
  const token = headers.token;
  return {
    token,
  }
}

export async function fetchHeaders(req: request.SuperTest<request.Test>) {
  const res = await req.get("/").expect(200);
  return getHeadersFrom(res);
}

export function setHeaders(
  req: request.Test,
  headers: Headers,
  options: Partial<Record<keyof Headers, boolean>> = {},
) {
  if (
    headers.token &&
    !(typeof options.token !== "undefined" && !options.token)
  ) {
    req.auth(headers.token, { type: "bearer" });
  }
  return req;
}

export function getResponseData(res: Response) {
  const body = res.body;

  if (isApiResponse(body)) {
    return body.response;
  } else {
    return body;
  }
}

export async function fetchUserTokenAndHeaders(
  req: request.SuperTest<request.Test>,
  userRaw: User = mockUserRaw(),
) {
  await createUser(userRaw);

  const headers = await fetchHeaders(req);
  const withHeaders = withHeadersBy(headers);

  const params = {
    email: userRaw.email,
    password: userRaw.password
  };

  const res = await withHeaders(req.post("/api/auth/signIn"))
    .send(params)
    .expect(200);

  const resData = getResponseData(res);
  const token = resData.token;
  const headersWithToken = getHeadersFrom(res, {
    ...headers,
    token,
  });
  return headersWithToken;
}

