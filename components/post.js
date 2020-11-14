import Link from "next/link";

export default function Post({id, title, description}){
  let d = <></>;
  if(description) {
    d = <p>{description}</p>
  }
  return (
    <>
      <Link href={`/posts/${id}`}>
        <a><h2>{title}</h2></a>
      </Link>
      {d}
    </>
  )
}
