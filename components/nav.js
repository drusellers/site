import Link from 'next/link';
import styles from './nav.module.scss';

export default function Nav({isHome}) {
  let homeLink = <></>;
  if(!isHome) {
    homeLink = (
    <Link href="/">
      <a title="Home">
          <span className="arrow">←</span>Home
        </a>
    </Link>
    );
  }
  return (
    <header className={styles.nav}>
      <nav>
      {homeLink}
      <aside>
        <Link href="/posts">
          <a title="Archive">Archive</a>
        </Link>{" "}
        <Link href="/iron">
          <a title="Iron and the Soul">
            Iron and the Soul
          </a>
        </Link>{" "}
        <Link href="/tags">
          <a title="Tags">
            Tags
          </a>
        </Link>{" "}
        <Link href="/resume">
          <a title="Resume">
            Resume
          </a>
        </Link>
      </aside>
      </nav>
    </header>
  );
}
