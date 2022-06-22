import { useRouter } from "next/router";
import path from "path";
import { useEffect, useState } from "react";
import useSWR from "swr";
import { fetcher } from "../../utils/fetcher";
import Image from "next/image";

import styles from "../../styles/modules/Video.module.css";
import Link from "next/link";
import Loader from "../components/Loader";

function Video() {
  const router = useRouter();
  const { id } = router.query;

  const { data, error } = useSWR(`/api/video/${id}`, fetcher);
  const [videoDimensions, setVideoDimensions] = useState({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    setVideoDimensions({
      width: window.innerWidth - 20,
      height: 480,
    });

    window.onresize = () =>
      setVideoDimensions({
        width: window.innerWidth - 20,
        height: 480,
      });
  }, [data]);

  return (
    <div>
      {error ? (
        <h1>Something Went Wrong</h1>
      ) : data ? (
        data.success ? (
          <div>
            <div className={styles.videoContainer}>
              <video
                width={videoDimensions.width}
                height={videoDimensions.height}
                autoPlay={false}
                muted={false}
                controls
              >
                <source
                  src={data.data.video.path.replace("public", "")}
                  type={
                    "video/" +
                    path.extname(data.data.video.path).replace(".", "")
                  }
                />
              </video>
            </div>
            <div className={styles.videoInfo}>
              <h1 className={styles.videoTitle}>{data.data.video.title}</h1>

              <Link href={`/user/${data.data.author.id}`} passHref>
                <a className={styles.authorInfo}>
                  <Image
                    className={`avatar ${styles.authorImage}`}
                    src={data.data.author.picture}
                    alt="profile picture"
                    width={45}
                    height={45}
                  />
                  <h1 className={styles.authorName}>{data.data.author.name}</h1>
                </a>
              </Link>
            </div>
          </div>
        ) : (
          <h1>Video Not Found</h1>
        )
      ) : (
        <div className={`loader`}>
          <Loader />
        </div>
      )}
    </div>
  );
}

export default Video;
