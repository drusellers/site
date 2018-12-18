const URL = process.env.ES_READ_URL;

function getQuery(query) {
  return {
    "suggest": {
      "title-suggest": {
        "prefix": query,
        "completion": {
          "field": "suggest"
        }
      }
    },
    "query": {
      "multi_match": {
        "query": query,
        "fields": ["description", "summary", "title"]
      }
    },
    "stored_fields": ['title', 'description', 'summary', 'url'],
    "highlight": {
      "fields": {
        "text": {}
      }
    }
  }
}

// should return a promise whose happy state is an array of hits
function query(query) {
  const headers = new Headers()
  headers.append('Content-Type', 'application/json');
  headers.append('Accept', 'application/json');
  return fetch(`${URL}/posts/_search`, {
      method: 'POST',
      body: JSON.stringify(getQuery(query)),
      headers: headers
    }).then(response => response.json())
    .then(body => {
      const hits = body.hits.hits || [];
      const options = body.suggest['title-suggest'][0].options || [];
      return Promise.resolve(hits.length == 0 ? options : hits);
    });
}

export default {
  query
}