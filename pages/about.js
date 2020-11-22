import Layout from "../components/layout";
import Link from 'next/link';

// core: Open, Acheivement, Respect, Intellect
export default function About() {
  return (
    <Layout title="About">
      <div className="space-y-8">
        <p>
          <img className="float-right" src="/images/pic.png" />
          With over 20 years of experience blending technology and business, I
          can explain in both technical terms and non-technical terms why a
          variety of technology choices can or should be made. I'm just as
          comfortable analyzing a P&amp;L as I am dissecting an architectural
          diagram.
        </p>

        <p>
          I'm classically trained in Business &amp; Economics, with a "school of
          hardknocks" education in software development. I've worked in banking,
          HR, warehousing, e-Commerce, ERPs and Infrastructure-as-a-Service industries.
        </p>
        <p>
          I have multiple systems in multiple companies that continue to produce
          positive business value even after 10 years of service.
        </p>
        <div className="bg-blue-100 p-4 my-4 rounded border border-blue-400">
          <Link href="/resume">
            <a>
              Resume
            </a>
          </Link>
        </div>
      </div>
    </Layout>
  );
}
