import { useRouter } from "next/router";
import useSWR from "swr";
import { fetcher } from "../../utils/fetcher";

import styles from "../../styles/modules/VideoSearch.module.css";
import Loader from "../components/Loader";
import { VideoDocument } from "../../types/VideoDocument";
import Link from "next/link";
import getVideoLink from "../../utils/getVideoLink";

export default function Index() {
  const router = useRouter();
  const { search_query } = router.query as { search_query: string };

  const { data } = useSWR(
    `/api/search?search_query=${encodeURIComponent(search_query)}`,
    fetcher
  );

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

  return data ? (
    data.results.length > 0 ? (
      <div className={styles.resultsContainer}>
        <h1 className={styles.videoHeader}>Videos:</h1>
        <ul className={styles.results}>
          {data.results.map((video: VideoDocument) => {
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
