import Link from 'next/link';

export default function TagList({ tags }) {
  if (tags.length === 0) return <></>

  return (
    <ul className="list">
      {tags.map((t) => {
        return (
          <li key={t} className="tag">
            <Link href={`/tags/${t}`}>
              <a>
                <i className="fal fa-tag"></i> <span>{t}</span>
              </a>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
