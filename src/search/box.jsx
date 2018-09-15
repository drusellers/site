import React from 'react';
import ReactDom from 'react-dom';

const URL = 'https://drusellers-com-4320113980.us-east-1.bonsaisearch.net';
const USERNAME = '';
const PASSWORD = '';

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
      "query": {
        "multi_match": {
          "query": query,
          "fields": ["description", "summary", "title"]
        }
      },
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
    //headers.append('Authorization', 'Basic ' + Buffer.from(USERNAME + ":" + PASSWORD).toString('base64'));
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    fetch(`${URL}/_search`, {
      method: 'POST',
      body: JSON.stringify(this.getQuery(query)),
      headers: headers
    }).then((response) => response.json())
      .then((body) => {
        this.setState({
          hits: body.hits.hits,
          length: body.hits.total
        })
      });
  }

  render() {
    console.log("render");
    return (
      <div>
        <div className="fl w-100 dds-search-input">
          <div className="fl pa2" style={{ width: '4%' }}>
            <i className="far fa-search"></i>
          </div>
          <div className="fl pt2 pl2" style={{ width: '96%' }}>
            <input type="text"
              className="input-reset f5 ba b--white w-100 db"
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
      return (<li key={hit['_source']['_id']}>
        <h2><a href={hit['_source'].url} className="link blue" >{hit['_source'].title}</a></h2>
        <p className="measure lh-copy f5">{hit['_source'].summary}</p>
      </li>);
    });

    return (
      <div className="dds-search-results ba b--black-10 shadow-5">
        <div className="ph3 black-90 f5">{this.state.length} results found</div>
        <ul className="list ma0 pb3">
          {hits}
        </ul>
      </div >
    );
  }
}

export default SearchBox;