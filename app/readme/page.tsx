import Header from '@/components/Header'
import TwoColumn from '@/components/TwoColumn'
import SideColumn from '@/components/SideColumn'

export default function Readme() {
  return (
    <>
      <Header />
      <TwoColumn left={<SideColumn title={'README'} />}>
        <div>
          I will push hard for what I want, in an effort to be clear. But I like
          to think that I&apos;m still open to changes even in this state.
        </div>
      </TwoColumn>
    </>
  )
}
