import useSWR from "swr";
import { useEffect, useState } from "react";

import { fetcher } from "../../utils/fetcher";

export default function useSession() {
  const { data, error } = useSWR("/api/cookies/get-user", fetcher);
  const [user, setUser] = useState(null);

  useEffect(() => {
    data && setUser(data.user);
  }, [data, error]);

  return { user };
}
