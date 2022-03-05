import {
  Form,
  Link,
  LinksFunction,
  LoaderFunction,
  Outlet,
  useLoaderData,
} from "remix";
import { getSessionUserId } from "~/utils/session.server";
import layoutStyles from "~/styles/layout.css";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: layoutStyles },
];

export const loader: LoaderFunction = async ({
  request,
}): Promise<string | null> => {
  const userId = await getSessionUserId(request);
  return userId ?? null;
};

export default function Layout() {
  const userId = useLoaderData();
  return (
    <div>
      <p>__layout.tsx</p>
      <Form action="./logout" method="post">
        <p>logout form</p>
        <button type="submit" className="logout" disabled={!userId}>
          Logout
        </button>
      </Form>
      <Link to="./protected-route" className="layout-link" prefetch="intent">
        🔗 Protected route
      </Link>
      <Outlet />
    </div>
  );
}
