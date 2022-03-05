import { LoaderFunction, useLoaderData } from "remix";
import { requireUserId } from "~/utils/session.server";

export const loader: LoaderFunction = async ({ request }) => {
  return requireUserId(request, '/layout/login');
};

export default function ProtectedRoute() {
  let userId = useLoaderData();
  return (
    <div>
      <p>layout/protected-route.tsx</p>
      <pre>{userId}</pre>
    </div>
  );
}
