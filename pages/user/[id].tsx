import { useRouter } from "next/router";
import useSWR from "swr";
import { fetcher } from "../../utils/fetcher";
import Image from "next/image";

import styles from "../../styles/modules/User.module.css";
import Link from "next/link";

import { VideoDocument } from "../../types/VideoDocument";
import { UserDocument } from "../../types/UserDocument";
import Loader from "../components/Loader";

function User() {
  const router = useRouter();
  const { id } = router.query;

  const { data, error } = useSWR(`/api/user/${id}`, fetcher);

  return (
    <div>
      {error ? (
        <h1>Something Went Wrong</h1>
      ) : data ? (
        data.success ? (
          <div className={`${styles.main}`}>
            <div className={`${styles.userInfoContainer}`}>
              <Image
                className={`avatar`}
                src={data.data.image}
                width={50}
                height={50}
                alt="Profile"
              />
              <p className={`${styles.userName}`}>{data.data.name}</p>
            </div>

            <ul className={`${styles.videoList}`}>
              {data.data.videos.map((video: VideoDocument) => {
                return (
                  <li key={video._id} className={`${styles.video}`}>
                    <Link href={`/video/${video._id}`} passHref>
                      <a className={`${styles.videoLink}`}>{video.title}</a>
                    </Link>
                  </li>
                );
              })}
            </ul>
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
