import ShortDate from "../components/shortDate";
import Link from "next/link";

export default function DateTitle({ date, title, href }) {
  return (
    <div>
      <div className="inline mr-4">
        <ShortDate dateString={date} />
      </div>
      <div className="inline">
        <Link href={href}>
          <a>{title}</a>
        </Link>
      </div>
    </div>
  );
}
