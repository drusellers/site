import React from 'react';
import ReactDom from 'react-dom';

const URL = process.env.ES_READ_URL;

class SearchBox extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      query: '',
      hits: [],
      length: 0
    }
  }

  handleQueryChange(e) {
    var q = e.target.value;
    this.setState({
      query: q
    });
    this.search(q);
  }

  getQuery(query) {
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

  search(query) {
    // send query to elasticsearch
    let headers = new Headers()
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    fetch(`${URL}/posts/_search`, {
      method: 'POST',
      body: JSON.stringify(this.getQuery(query)),
      headers: headers
    }).then((response) => response.json())
      .then((body) => {

        let hits = body.hits.hits || [];
        let options = body.suggest['title-suggest'][0].options || [];

        this.setState({
          hits: hits.length == 0 ? options : hits,
          length: hits.length == 0 ? 0 : body.hits.total
        })
      });
  }

  render() {
    return (
      <div>
        <div className="fl w-100 dds-search-input br2">
          <div className="fl pa2" style={{ width: '4%' }}>
            <i className="far fa-search"></i>
          </div>
          <div className="fl pa2" style={{ width: '96%' }}>
            <input type="text"
              className="input-reset f4 ba b--white w-100 db"
              placeholder="Search Posts"
              onChange={this.handleQueryChange.bind(this)}
              value={this.state.query} />
          </div>
        </div>
        {this.renderHits()}
      </div>
    );
  }

  renderHits() {
    if (this.state.query === '') return;

    console.log('hits', this.state.hits);

    const hits = this.state.hits.map((hit) => {
      console.log('hit', hit);
      return (<li key={hit['_id']}>
        <h2><a href={hit.fields.url[0]} className="link blue" >{hit.fields.title[0]}</a></h2>
        <p className="measure lh-copy f5">{hit.fields.summary[0]}</p>
      </li>);
    });

    return (
      <div className="dds-search-results ba b--black-10 shadow-5 cf">
        <ul className="list ma0 ph3 pb3 cf">
          {hits}
        </ul>
      </div >
    );
  }
}

export default SearchBox;