import { useRouter } from "next/router";
import { fetcher } from "../../utils/fetcher";

import styles from "../../styles/modules/VideoSearch.module.css";
import Loader from "../components/Loader";
import Link from "next/link";
import getVideoLink from "../../utils/getVideoLink";
import { useEffect, useState } from "react";

export default function Index() {
  const router = useRouter();
  const { search_query } = router.query as { search_query: string };

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    search_query !== "" &&
      search_query !== undefined &&
      fetcher(
        `/api/search?search_query=${encodeURIComponent(search_query)}`
      ).then((data) => {
        setData(data);
        setLoading(false);
      });
  }, [search_query]);

  if (search_query === "") {
    return (
      <div className={styles.invalidContainer}>
        <h1>Uh oh. That seems like an invalid search query.</h1>
        <p onClick={() => router.replace("/")} className={styles.goBack}>
          Take Me Back!
        </p>
      </div>
    );
  }

  return !loading ? (
    data.results.length > 0 ? (
      <div className={styles.resultsContainer}>
        <h1 className={styles.videoHeader}>Videos:</h1>
        <ul className={styles.results}>
          {data.results.map((video: { _id: string; title: string }) => {
            return (
              <li key={video._id} className={`${styles.video}`}>
                <Link href={getVideoLink(video._id)} passHref>
                  <a className={`${styles.videoLink}`}>{video.title}</a>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    ) : (
      <h1 className={styles.notFound}>No Results Found :(</h1>
    )
  ) : (
    <div className="loader">
      <Loader />
    </div>
  );
}
