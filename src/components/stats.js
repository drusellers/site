export default function Stats({ wordCount, readingTime }) {
  if (wordCount == undefined) return <></>

  return (
    <div>
      {wordCount} words · {readingTime} minute read
    </div>
  )
}
