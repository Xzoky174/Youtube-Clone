import { useRouter } from "next/router";
import { fetcher } from "../../utils/fetcher";
import Image from "next/image";

import styles from "../../styles/modules/User.module.css";

import Loader from "../components/Loader";
import { VideoDocument } from "../../types/VideoDocument";
import Link from "next/link";
import getVideoLink from "../../utils/getVideoLink";
import { useEffect, useState } from "react";

function User() {
  const router = useRouter();
  const { id } = router.query;

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    id &&
      fetcher(`/api/user/with-videos/${id}`).then((data) => {
        setData(data);
        setLoading(false);
      });
  }, [id]);

  return (
    <div>
      {!loading ? (
        data.success ? (
          <div className={`${styles.main}`}>
            <div className={`${styles.userInfoContainer}`}>
              <Image
                className={`avatar`}
                src={data.data.user.picture}
                width={50}
                height={50}
                alt="Profile"
              />
              <p className={`${styles.userName}`}>{data.data.user.name}</p>
            </div>

            {data.data.videos.length > 0 && (
              <>
                <h1 className={styles.videoHeader}>Videos:</h1>
                <ul className={styles.videoList}>
                  {data.data.videos.map((video: VideoDocument) => {
                    return (
                      <li key={video._id} className={`${styles.video}`}>
                        <Link href={getVideoLink(video._id)} passHref>
                          <a className={`${styles.videoLink}`}>{video.title}</a>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </>
            )}
          </div>
        ) : (
          <h1>User Not Found</h1>
        )
      ) : (
        <div className={`loader`}>
          <Loader />
        </div>
      )}
    </div>
  );
}

export default User;
