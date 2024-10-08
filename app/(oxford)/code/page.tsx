import PageTitle from '@/components/oxford/PageTitle'

export default function Code() {
  return (
    <div className={'flex flex-col pl-8 pt-9 gap-y-4'}>
      <PageTitle>Code</PageTitle>

      <div className={'grid grid-cols-8 gap-x-4'}>
        <div className={'col-span-3 text-right'}>
          Adapted from Jocko Willink
        </div>
        <div className={'col-span-5'}>
          <div>
            <ol className={'flex flex-col space-y-4'}>
              <li>
                I will take care of my physical health by exercising, eating
                properly, and getting the rest I need to recover and rebuild. I
                will take care of my physical surroundings, keeping them in
                order.
              </li>
              <li>
                I will develop myself mentally by reading, writing, drawing,
                building, creating, and engaging in other activities that
                sharpen and expand my mind.
              </li>
              <li>I will not waste time. Time is precious.</li>
              <li>
                I will not waste money and I will make prudent financial
                decisions. Money is hard to earn.
              </li>
              <li>I will set goals that I will strive toward.</li>
              <li>I will excel in my job because work is integral to life.</li>
              <li>
                I will be humble and not allow my ego to negatively impact my
                decisions.
              </li>
              <li>
                I will control my emotions and not allow my emotions to
                negatively impact my decisions.
              </li>
              <li>
                I wil put others before myself. I will help other people and
                protect those that that cannot protect themselves. I will take
                care of my friends and family and treat other people with
                respect.
              </li>
              <li>
                {' '}
                I will be ready to protect my friends and family. My gear will
                be ready. I will train and prepare to defend myself and others.
              </li>
              <li>
                {' '}
                I will experience my emotions, I will not bury them but nor will
                I let them control me.
              </li>
            </ol>

            <a href="https://jockopodcast.com/2020/04/21/226-the-code-the-evaluation-the-protocols-the-path-with-dave-berke/code.tsx">
              Podcast
            </a>
            <a href="https://www.amazon.com/Code-Evaluation-Protocols-Eminently-Qualified/dp/0981618820">
              Book
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
