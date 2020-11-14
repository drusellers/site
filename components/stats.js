export default function Stats({wordCount, readingTime}) {
  if(wordCount == undefined) return (<></>);

  return (
<div className="article-detail">
    {wordCount} words · {readingTime} minute read
</div>
  );
}
