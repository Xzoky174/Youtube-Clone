import { useRouter } from "next/router";
import path from "path";
import { FormEvent, useEffect, useRef, useState } from "react";
import Image from "next/image";

import styles from "../../styles/modules/Video.module.css";
import Link from "next/link";
import Loader from "../components/Loader";
import useSession from "../hooks/useSession";
import { fetcher } from "../../utils/fetcher";

function Video() {
  const router = useRouter();
  const { id } = router.query;

  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const [refresh, setRefresh] = useState(0);

  const [liked, setLiked] = useState(false);
  const [disliked, setDisLiked] = useState(false);

  const commentRef = useRef(null);

  const { user, loading } = useSession();

  const [videoDimensions, setVideoDimensions] = useState({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    if (id !== undefined) {
      fetcher(`/api/video/${id}`)
        .then((data) => {
          setData(data);

          setLiked(false);
          setDisLiked(false);

          setError(null);
        })
        .catch((e) => {
          setError(e);

          setLiked(false);
          setDisLiked(false);
        });
    }

    setVideoDimensions({
      width: window.innerWidth - 20,
      height: 480,
    });

    window.onresize = () =>
      setVideoDimensions({
        width: window.innerWidth - 20,
        height: 480,
      });
  }, [id, refresh]);

  const handleLike = async () => {
    if (!loading) {
      if (!user) {
        router.push("/api/auth/signin");
      } else if (data) {
        if (!data.data.video.users_liked.includes(user.id)) {
          setLiked(true);

          await fetch("/api/video/add-like", {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              video_id: data.data.video._id,
            }),
          });

          setRefresh(refresh + 1);
        } else {
          handleDisLike();
        }
      }
    }
  };

  const handleDisLike = async () => {
    setDisLiked(true);

    await fetch("/api/video/remove-like", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        video_id: data.data.video._id,
      }),
    });

    setRefresh(refresh + 1);
  };

  const handleComment = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!loading) {
      if (!user) {
        router.push("/api/auth/signin");
        return;
      }
      const comment = commentRef.current.value;
      commentRef.current.value = "";

      await fetch("/api/video/add-comment", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          video_id: id,
          comment,
        }),
      });

      setRefresh(refresh + 1);
    }
  };

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
              <div className={styles.titleInfo}>
                <h1 className={styles.videoTitle}>{data.data.video.title}</h1>
                <p className={styles.views}>{data.data.video.views} views</p>
              </div>

              <div className={styles.like}>
                <div className={styles.likeSub} onClick={handleLike}>
                  <Image
                    className={styles.likeImage}
                    src={
                      user &&
                      data &&
                      (liked ||
                        (data.data.video.users_liked.includes(user.id) &&
                          !disliked))
                        ? "/liked-icon.svg"
                        : "/like-icon.svg"
                    }
                    alt="like"
                    width={32}
                    height={32}
                  />
                  <p className={styles.likes}>
                    {!disliked
                      ? data.data.video.likes +
                        (liked && !data.data.video.users_liked.includes(user.id)
                          ? 1
                          : 0)
                      : data.data.video.likes - 1}
                  </p>
                </div>
              </div>

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

              <h1 className={styles.commentsHeader}>Comments:</h1>
              <form onSubmit={handleComment}>
                <input
                  className={styles.commentInput}
                  type="text"
                  placeholder="Write a Comment"
                  ref={commentRef}
                />
              </form>

              {data.data.video.comments.length > 0 ? (
                <>
                  <ul className={styles.commentsList}>
                    {data.data.video.comments.map((comment: any) => {
                      return (
                        <li key={comment._id}>
                          <div className={styles.comment}>
                            {comment.comment}
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </>
              ) : (
                <h1>No comments. Be the first one to comment!</h1>
              )}
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
