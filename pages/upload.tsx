import { useSession } from "next-auth/react";

import styles from "../styles/modules/Upload.module.css";
import Loader from "./components/Loader";

function Upload() {
  const { status } = useSession({
    required: true,
  });

  if (status === "loading") {
    return (
      <div className={`loader`}>
        <Loader />
      </div>
    );
  }

  return (
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
  );
}

export default Upload;
