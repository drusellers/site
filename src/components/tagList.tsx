import Link from 'next/link'

type Props = {
  tags: string[]
}

export default function TagList({ tags }: Props) {
  if (tags.length === 0) return <></>

  return (
    <ul className="list">
      {tags.map((t) => {
        return (
          <li key={t} className="tag">
            <Link href={`/tags/${t}`}>
              <i className="fal fa-tag"></i> <span>{t}</span>
            </Link>
          </li>
        )
      })}
    </ul>
  )
}
