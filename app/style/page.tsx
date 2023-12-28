import Header from '@/components/Header'
import TwoColumn from '@/components/TwoColumn'
import SideColumn from '@/components/SideColumn'

export default function Style() {
  return (
    <>
      <Header />
      <TwoColumn left={<SideColumn title={'Style Guide'} />}>
        <h2>Brand Introduction</h2>
        <p>Serious</p>
        <p>
          I tend to like <a href="https://simple.com">Simple.com&apos;s</a>{' '}
          brand. Clean whites with a bit of color
        </p>
        <p>Openness, Empathy, Experience, Emotion</p>
        <p>The balance of warm and cool - not just cool</p>
        <p>Balance Masculine images with feminine colors?</p>
        <ul>
          <li>Lotus Flower SVG</li>
          <li>Flat Irons SVG</li>
        </ul>
        <p>
          The balance of masculine and feminine is particularly interesting to
          me.
        </p>
        <h2>Words</h2>
        <ul>
          <li>Tattoos - edgey</li>
          <li>Business - let&apos;s make money</li>
          <li>deadlifts - heavy, hard, big boy/girl shit</li>
          <li>code - intellect, thoughtfulness, optimization</li>
        </ul>
        <h2>Design</h2>
        <p>Should feel like a scholarly article: mimic scholarly layouts.</p>
        <p>
          Should blend in some commerce: Use a guilloche pattern to bring in a
          variety of subtle colors. A guilloche pattern of 1&apos;s and 0&apos;s
          that&apos;s pretty fine like the idea of &ldquo;micro-print&rdquo; on
          currency. You have to &ldquo;zoom&rdquo; to some extent to see it. Its
          subtle, like weaving money and technology. I would love to have it in
          SVG so I would easily swap colors to fit with the brand.
        </p>
        <h1>1. Fonts</h1>
        <p>
          Headers: Helvetica - when i see this in bold headers it really feels
          like the standard white paper. I&apos;m ok with that. I&apos;ll spend
          my &ldquo;fun&rdquo; elsewhere.
        </p>
        <p>Body Copy: Helvetica - same, same</p>
        <h1>1. Colors</h1>
        <p>
          Blues / Blacks - Blue is a core part of the internet. Links are blue.
          While the OG blue is a bit too dark for me I want to maintain that
          history of blue links. So, blue should be an accent color in some ways
          at least.
        </p>
        https://www.pinterest.com/pin/83879611797634474/
        <p>But shouldn&apos;t shy away from Pinks</p>
        https://www.pinterest.com/pin/9781324169464026/
        <p>
          Always like the idea of finding a way to work feminine colors in. What
          is the feminine version of serious? I feel like the blues of IBM, dark
          tones are what makes a manly color serious.
        </p>
        <p>
          How could you do a &ldquo;Dark Mode&rdquo; that wasn&apos;t black?
          Purples? Navy? Greens.
        </p>
        <h1>2. Taglines</h1>
        <p>Curiosity is life.</p>
        <p>Fusing Business and Technology</p>
        <p>Weaving Business and Technology</p>
        <h1>1.1 Brand Colors</h1>
        <div className="bg-blue pa3">
          <div>blue</div>
          <div>#357EDD</div>
        </div>
        <div className="bg-navy pa3">
          <div>navy</div>
          <div>#357EDD</div>
        </div>
        <h1>2. Urls</h1>
        <p>Prefer `-` (dashes) to `_` (underscores)</p>
        <h1>3. Page Structures</h1>
        <p>1/3 text - 2/3 image? (print media me thinks)</p>
        <h1>4. Do&apos;s and Dont&apos;s</h1>
        <p>Words we do like / Words we don&apos;t like</p>
      </TwoColumn>
    </>
  )
}
