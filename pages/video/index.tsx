import { useRouter } from "next/router";

// TODO: Implement
export default function Index() {
  const router = useRouter();

  return <div>{router.query.search_query}</div>;
}
