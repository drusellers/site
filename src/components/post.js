import Link from 'next/link'

export default function Post({ id, title, description }) {
  let d = <></>
  if (description) {
    d = <p>{description}</p>
  }
  return (
    <div>
      <Link href={`/posts/${id}`}>
        <a className="font-heading text-2xl text-blue-500">
          <h2>{title}</h2>
        </a>
      </Link>
      {d}
    </div>
  )
}
