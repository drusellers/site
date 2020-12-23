import Link from "next/link";

export default function Logo() {
  return (
      <Link href="/">
        <a className="block">
          <img
            className="h-12"
            height="90"
            src="/images/logo.svg"
            alt="Dru Sellers"
          />
        </a>
      </Link>
  );
}
