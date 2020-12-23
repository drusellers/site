export default function TitleSubtitle({ title, subtitle }) {
  if (subtitle) {
    subtitle = <h2 className="">{subtitle}</h2>;
  }
  return (
    <>
      <h1 className="text-4xl border-t-3 border-black">{title}</h1>
      {subtitle}
    </>
  );
}
