import { createCookieSessionStorage, redirect, Session } from "remix";

let { getSession, commitSession, destroySession } = createCookieSessionStorage({
  cookie: {
    name: "session",
    secure: true,
    secrets: ["1234"],
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
    httpOnly: true,
  },
})

export async function getCurrentSession(request: Request): Promise<Session> {
  return getSession(request.headers.get("Cookie"))
}

export async function getSessionUserId(request: Request): Promise<string | null> {
  const session = await getCurrentSession(request)
  return session.get('userId')
}

export async function requireUserId(request: Request, redirectTo: string): Promise<string> {
  let session = await getSession(request.headers.get("Cookie"))
  let userId = session.get("userId")
  if (!userId || typeof userId !== "string") {
    throw redirect(redirectTo)
  }
  return userId
}

export async function login(request: Request, userId: string, redirectTo: string): Promise<Response> {
  const session = await getCurrentSession(request)
  session.set('userId', userId)
  return redirect(redirectTo, {
    headers: { "Set-Cookie": await commitSession(session) },
  })
}

export async function logout(request: Request, redirectTo: string): Promise<Response> {
  let session = await getCurrentSession(request)
  return redirect(redirectTo, {
    headers: { "Set-Cookie": await destroySession(session) },
  })
}