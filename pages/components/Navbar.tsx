import Image from "next/image";
import styles from "../../styles/modules/Navbar.module.css";

import logo from "../../public/logo.svg";
import Link from "next/link";

import { useCallback, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import useSession from "../hooks/useSession";

export default function Navbar() {
  const { user } = useSession();

  const router = useRouter();

  const searchInputRef = useRef(null);

  const keyDown = useCallback((e: { keyCode: number }) => {
    if (e.keyCode === 13 && document.activeElement === searchInputRef.current) {
      onExecuteSearch();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const searchQuery = router.query.search_query;

    if (searchQuery !== undefined && searchQuery !== null) {
      searchInputRef.current.value = searchQuery;
    } else {
      searchInputRef.current.value = "";
    }

    document.addEventListener("keydown", keyDown);

    return () => {
      document.removeEventListener("keydown", keyDown);
    };
  }, [keyDown, router.query.search_query]);

  const onExecuteSearch = () => {
    const searchInput = searchInputRef.current.value;

    if (searchInput) {
      console.log(searchInput);

      router.push({
        pathname: "/search",
        query: { search_query: searchInput },
      });
    }
  };

  return (
    <nav className={styles.navbar}>
      <Link href={"/"} passHref>
        <a className={styles.logo}>
          <Image src={logo} alt="YouTube Logo" width={100} height={50} />
        </a>
      </Link>

      <div className={styles.search}>
        <input
          className={styles.searchInput}
          ref={searchInputRef}
          type="text"
          placeholder="Search"
          required={true}
        />
        <button
          type="submit"
          onClick={onExecuteSearch}
          className={`material-icons ${styles.searchBtn}`}
        >
          search
        </button>
      </div>

      <div className={styles.options}>
        <Link href={user ? "/upload" : "/api/auth/signin"} passHref>
          <a>
            <span className={`material-icons ${styles.upload}`}>
              file_upload
            </span>
          </a>
        </Link>
        <Link href={user ? `/user/${user.id}` : "/api/auth/signin"} passHref>
          <a>
            {user ? (
              <Image
                src={user.picture}
                className={`avatar ${styles.account} ${styles.accountSigned}`}
                alt="profile"
                width={45}
                height={45}
              />
            ) : (
              <span className={`material-icons ${styles.account}`}>
                account_circle
              </span>
            )}
          </a>
        </Link>
      </div>
    </nav>
  );
}
