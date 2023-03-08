type Props = {
  title: string
  subtitle?: string
}
export default function TitleSubtitle({ title, subtitle }: Props) {
  let subtitleEl = <></>
  if (subtitle) {
    subtitleEl = <h2 className="font-heading">{subtitle}</h2>
  }

  return (
    <>
      <h1 className="border-t-3 border-black text-4xl font-heading">{title}</h1>
      {subtitleEl}
    </>
  )
}
