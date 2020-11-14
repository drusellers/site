export default function Pagination({ hasPrev, prevUrl, hasNext, nextUrl }) {
  if (!hasPrev || !hasNext) {
    return <></>;
  }

  let prev = <></>;
  if (hasPrev) {
    prev = (
      <span className="prev">
        <a href={prevUrl}>
          <span className="arrow">←</span>Newer Posts
        </a>
      </span>
    );
    let next = <></>;
    if (hasNext) {
      next = (
        <span className="next">
          <a className="link blue" href={nextUrl}>
            Older Posts <span class="arrow">→</span>
          </a>
        </span>
      );
    }
    return (
      <nav id="post-nav">
        {prev}
        {next}
      </nav>
    );
  }
}
