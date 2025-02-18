import { PostData } from '@/lib/cms.posts'

const URL = process.env.ES_WRITE_URL
const INDEX = 'posts'

export function indexPost(post: PostData) {
  const doc = {
    _id: post.id,
    suggest: post.title,
    title: post.title,
    subtitle: post.subtitle,
    content: post.contentPlain,

    description: 'abc',
    summary: 'abc',
    keywords: 'abc',
    kind: 'post',
    permalink: '',
    url: 'url',
    tags: post.tags,
    categories: [],
    date: post.date,
    publishdate: post.date,
  }
  return request(doc)
}

// effectively private
function request(doc) {
  const url = `${URL}/${INDEX}/_doc/${doc['_id']}`

  delete doc['_id']
  // console.log('doc', Object.keys(doc));

  const headers = new Headers()
  headers.append('Content-Type', 'application/json')
  headers.append('Accept', 'application/json')
  return fetch(url, {
    method: 'PUT',
    mode: 'no-cors',
    body: JSON.stringify(doc),
    headers: headers,
  }).then(
    (response) => response.json(),
    () => console.log('ERR')
  )
}
