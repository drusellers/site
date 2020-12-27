import Layout from "../layouts/layout";

// core: Open, Achievement, Respect, Intellect
export default function About() {
  let now = new Date();
  let start = new Date('1997-08-01')
  return (
    <Layout title="About">
      <div className="space-y-8">
        <p>
          <img className="rounded-md mb-6" src="/images/planning.jpg" />
          With over {now.getFullYear() - start.getFullYear()} years of experience blending technology and business, I
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
      </div>
    </Layout>
  );
}
