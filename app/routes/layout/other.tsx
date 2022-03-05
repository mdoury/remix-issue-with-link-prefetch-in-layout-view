import { Link } from "remix";

export default function Index() {
  return (
    <div>
      <p>layout/other.tsx</p>
      <Link className="other-link" to="../protected-route" prefetch="intent">
        🔗 Protected route
      </Link>
    </div>
  );
}
