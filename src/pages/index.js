import * as React from "react"

import Layout from "../components/layout"
import Seo from "../components/seo"

class IndexPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { chia: 0, mojo: 0, chiaPrice: 0.0  };

    this.handleChiaChange = this.handleChiaChange.bind(this);
    this.handleMojoChange = this.handleMojoChange.bind(this);
  }

  handleChiaChange(event) {
    this.setState({ value: event.target.chia });
  }
  handleMojoChange(event) {
    this.setState({ value: event.target.mojo });
  }

  render() {
    return (
      <Layout>
        <Seo title="Home" />
        <div className="container text-center ">
          <div className="row">
            <div className="col">
              <h4>XCH: temp</h4>
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
              <h4>XCH: temp</h4>
            </div>
          </div>
        </div>
      </Layout>
    )
  }
}

export default IndexPage
