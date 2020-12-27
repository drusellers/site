import Layout from "../layouts/layout";

export default function Health() {
  return (
    <Layout
      title="Health"
      subtitle="Transcribed notes from conversations with Dr. House Ph. D."
    >
      Current Weight: 210 lbs Goal Weight: 195 lbs
      <h1>Daily Macro Template</h1>
      <ul>
        <li>PRO: 200g / day</li>
        <li>CHO: 200g / day</li>
        <li>FAT: 80g / day</li>
        <li>FIB: 45g / day</li>
      </ul>
      <em>That's a lot of fucking fiber</em>
    </Layout>
  );
}
