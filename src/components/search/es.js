const URL = process.env.NEXT_PUBLIC_ES_READ_URL;

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
    "aggregations": {
      "categories": {
        "global": {},
        "aggs": {
          "categories": {
            "terms": {
              "field": "categories"
            }
          }
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
// categories: [{ key: 'name', doc_count: 44 }]
function query(query) {
  // TODO: if we get known keywords + 'enter'
  // we should go to that page
  if (query === '') {
    return Promise.resolve({
      hits: [],
      categories: []
    });
  }

  // fire and forget ga event to track search
  // try {
  //   ga('send', {
  //     hitType: 'event',
  //     eventCategory: 'Interactions',
  //     eventAction: 'Search',
  //     eventLabel: (window.location || {}).pathname,
  //     eventValue: query,
  //   })
  // } catch (error) {
  //   console.log('GA Error:', error);
  // }

  return request(query)
    .then(body => {
      console.log(body);
      const hits = body.hits.hits || [];
      const suggestions = body.suggest['title-suggest'][0].options || [];
      const categories = body.aggregations.categories.categories.buckets;
      const result = {
        hits: hits.length == 0 ? suggestions : hits,
        categories
      };
      return Promise.resolve(result);
    });
}

export default {
  query
}

// effectively private
function request(query) {
  console.log('request', request);
  const headers = new Headers();
  headers.append('Content-Type', 'application/json');
  headers.append('Accept', 'application/json');
  return fetch(`${URL}/posts/_search`, {
    method: 'POST',
    body: JSON.stringify(getQuery(query)),
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  }).then(response => {
    console.log(response);
    return response.json()
  })
}
