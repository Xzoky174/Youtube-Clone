import { useEffect, useState } from "react";

import { fetcher } from "../../utils/fetcher";

export default function useSession() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetcher("/api/cookies/get-user").then((data) => {
      setUser(data.user);
      setLoading(false);
    });
  }, []);

  return { loading, user };
}
