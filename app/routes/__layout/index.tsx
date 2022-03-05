import { Link } from "remix";

export default function Index() {
  return (
    <div>
      <p>__layout/index.tsx</p>
      <Link className="index-link" to="./protected-route" prefetch="intent">
        🔗 Protected route
      </Link>
    </div>
  );
}
