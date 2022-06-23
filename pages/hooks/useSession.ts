import useSWR from "swr";
import { useEffect, useState } from "react";

import { fetcher } from "../../utils/fetcher";

export default function useSession() {
  const { data, error } = useSWR("/api/cookies/get-user", fetcher);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (data !== undefined) {
      setUser(data.user);
      setLoading(false);
    }
  }, [data, error]);

  return { loading, user };
}
