import Link from 'next/link';
import Date from './date';
import { Stack } from './elo';
import Stats from './stats';

export default function Sidebar(props) {
  var subtitle = <></>;
  if (props.subtitle) {
    subtitle = <h2 className="article-subtitle">{props.subtitle}</h2>;
  }
  return (
    <header>
      <Stack space="var(--s0)">
        <h1 className="article-title">
          {/* fall back to site description */}
          {props.title}
        </h1>
        {subtitle}
        <Stats wordCount={props.wordCount} readingTime={props.readingTime} />


        <time className="article-detail">
          {/* Jan 10, 2020 format */}
          <Date dateString={props.date} />
        </time>

        <div className="tags">
          <ul className="list">
            {props.tags.map((t) => {
              return (
                <li id={t} className="tag">
                  <Link href="/tags/{t}">
                    <a>
                      <i className="fal fa-tag"></i>{" "}
                      <span>{t}</span>
                    </a>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </Stack>
    </header>
  );
}
