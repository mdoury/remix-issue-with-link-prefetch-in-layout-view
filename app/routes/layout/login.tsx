import { ActionFunction, Form } from "remix";
import { login } from "~/utils/session.server";

export const action: ActionFunction = async ({ request }) => {
  const userId = await login(request, "current-user-id", '/layout');
  return userId;
};

export default function Login() {
  return (
    <div>
      <p>layout/login.tsx</p>
      <Form method="post">
        <p>login form</p>
        <button type="submit" className="login">
          Login
        </button>
      </Form>
    </div>
  );
}
