import PageTitle from '@/components/oxford/PageTitle'

export default async function Page() {
  return (
    <div className={'flex flex-col pl-8 pt-9 gap-y-4 deep'}>
      <PageTitle>Deep</PageTitle>

      <div style={{ height: 2000 }}></div>
      <div>Deeper</div>
    </div>
  )
}
