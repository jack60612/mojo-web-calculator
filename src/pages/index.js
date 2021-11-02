import React, { useState, useEffect } from 'react';

import Layout from "../components/layout"
import Seo from "../components/seo"

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = { chia: 0.0, mojo: 0.0, chiaPrice: 0.0};

    this.handleChiaChange = this.handleChiaChange.bind(this);
    this.handleMojoChange = this.handleMojoChange.bind(this);

  }

  handleChiaChange(event) {
    this.setState({ chia: event.target.value });
    this.setState({ mojo: (event.target.value * 1000000000000) });
    this.setState({ chiaPrice: (event.target.value * this.props.price) });
  }
  handleMojoChange(event) {
    this.setState({ mojo: event.target.value });
    this.setState({ chia: (event.target.value /  1000000000000)});
    this.setState({ chiaPrice: ((event.target.value /  1000000000000) * this.props.price) });
  }

  render() {
    return (
      <Layout>
        <Seo title="Home" />
        <div className="container text-center ">
          <div className="row">
            <div className="col">
              <h4>XCH: ${this.props.price}</h4>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <label>
                Chia:
                <input type="number" value={this.state.chia} name="chia" onChange={this.handleChiaChange} />
              </label>
            </div>
            <div className="col">
              <label>
                Mojo:
                <input type="number" value={this.state.mojo} name="mojo" onChange={this.handleMojoChange} />
              </label>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <h4> Worth: ${this.state.chiaPrice}</h4>
            </div>
          </div>
        </div>
      </Layout>
    )
  }
}

function IndexPage(props) {
  const [price, setPrice] = useState(0);
  useEffect(() => {
    fetch('https://xchscan.com/api/chia-price')
      .then(response => response.json()) // parse JSON from request
      .then(resultData => {
        setPrice(resultData.usd)
      })
  }, []); // <-- Have to pass in [] here!
  return (
    <Index price={price}/>
  )
}

export default IndexPage
