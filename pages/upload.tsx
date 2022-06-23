import { useRouter } from "next/router";
import { useEffect } from "react";
import styles from "../styles/modules/Upload.module.css";
import Loader from "./components/Loader";
import useSession from "./hooks/useSession";

function Upload() {
  const router = useRouter();
  const { user, loading } = useSession();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.replace("/api/auth/signin");
      }
    }
  }, [loading, user, router]);

  return !loading ? (
    <div className={`${styles.main}`}>
      <form
        className={`${styles.form}`}
        encType="multipart/form-data"
        action="/api/video"
        method="POST"
      >
        <div className={`${styles.formSection}`}>
          <label className={`${styles.label}`} htmlFor="title">
            Title:
          </label>
          <input
            className={`${styles.titleInput}`}
            type="text"
            name="title"
            id="title"
            required
          />
        </div>

        <div className={`${styles.formSection}`}>
          <label className={`${styles.label}`} htmlFor="file">
            File:
          </label>
          <input type="file" name="file" id="file" />
        </div>

        <button className={`${styles.submitBtn}`} type="submit">
          Upload
        </button>
      </form>
    </div>
  ) : (
    <div className="loader">
      <Loader />
    </div>
  );
}

export default Upload;
