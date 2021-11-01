import * as React from "react"

import Layout from "../components/layout"
import Seo from "../components/seo"

class IndexPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: '' };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  render() {
    return (
      <Layout>
        <Seo title="Home" />
        <div className="container">
          <div className="row">
            <div className="col">
              <h4 className="text-center">XCH: temp</h4>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <label>
                Chia:
                <input type="text" value={this.state.value} onChange={this.handleChange} />
              </label>
            </div>
            <div className="col">
              <label>
                Mojo:
                <input type="text" value={this.state.value} onChange={this.handleChange} />
              </label>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <h4 className="text-center">XCH: temp</h4>
            </div>
          </div>
        </div>
      </Layout>
    )
  }
}

export default IndexPage
