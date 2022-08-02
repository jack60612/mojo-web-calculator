import React from 'react';
import { toAddress, addressInfo, sanitizeHex, formatHex } from '@rigidity/chia';
import { toHex, fromHex} from "@rigidity/bls-signatures"
import Layout from "../components/layout"
import Seo from "../components/seo"
import {DropdownButton, Dropdown, InputGroup, Form} from "react-bootstrap";

class IndexPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { chia: 0.0, mojo: 0.0, curPrice: 0.0, chiaPrice: 0.0, addr_prefix: "xch", puzzle_hash: "", chia_address: ""};
    this.prefixes = ["xch", "txch", "nft"];
    // these are not arrow functions
    this.handleChiaChange = this.handleChiaChange.bind(this);
    this.handleMojoChange = this.handleMojoChange.bind(this);
    this.updateAddrPrefix = this.updateAddrPrefix.bind(this);
    this.updateChiaAddress = this.updateChiaAddress.bind(this);
    this.updatePuzzleHash = this.updatePuzzleHash.bind(this);
    this.updateChiaPrice(); // run once to get the current price
    setInterval(() => {this.updateChiaPrice()}, 10000); // refresh every 10 seconds


  }

  updateChiaPrice() {
    fetch('https://xchscan.com/api/chia-price')
        .then(response => response.json()) // parse JSON from request
        .then(resultData => {this.setState({curPrice: resultData.usd})})
    }
  updateAddrPrefix(new_prefix) {
    this.setState({ addr_prefix: new_prefix });
    console.log(new_prefix);
    this.updateChiaAddress(null, this.state.puzzle_hash, new_prefix);
  }
  updateChiaAddress(event, puzzle_hash_hex = null, addr_prefix = null) {
    if (puzzle_hash_hex == null) {puzzle_hash_hex = event.target.value; addr_prefix = this.state.addr_prefix}
    // set ph
    if (puzzle_hash_hex.length- 2 !== 0) { // if hex is not empty
      this.setState({ puzzle_hash: formatHex(puzzle_hash_hex) });
      // get full puzzle hash
      let puzzle_hash = fromHex(sanitizeHex(puzzle_hash_hex));
      // get address
      let chia_address = toAddress(puzzle_hash, addr_prefix);
      this.setState({ chia_address: chia_address });
    }
    else {
      this.setState({ puzzle_hash: "", chia_address: "" });
    }
  }
  updatePuzzleHash(event) {
    // set address
    let chia_address = event.target.value;
    this.setState({ chia_address: chia_address });
    // convert address to puzzle hash
    if(chia_address.length >= 62) {
    try{
      let { ph, prefix } = addressInfo(chia_address); // currently broken
      console.log(ph, prefix);
      // save new values
      this.setState({ puzzle_hash: formatHex(toHex(ph))});
      this.setState({ addr_prefix: prefix });
    }
    catch(e) {
      console.log(e);
      this.setState({ puzzle_hash: "Invalid Address!"  });
    }}
    else {
      console.log(chia_address, chia_address.length);
      this.setState({ puzzle_hash: "Incomplete Address." });
    }


  }
  handleChiaChange(event) {
    this.setState({ chia: event.target.value });
    this.setState({ mojo: (event.target.value * 1000000000000) });
    this.setState({ chiaPrice: (event.target.value * this.state.curPrice) });
  }
  handleMojoChange(event) {
    this.setState({ mojo: event.target.value });
    this.setState({ chia: (event.target.value /  1000000000000).toFixed(12) });
    this.setState({ chiaPrice: ((event.target.value /  1000000000000) * this.state.curPrice).toFixed(2) });
  }

  render() {
    return (
      <Layout>
        <Seo title="Home" />
        <div className="container text-center ">
          <div className="row">
            <div className="col">
              <h4>XCH: ${this.state.curPrice}</h4>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <InputGroup>
                <InputGroup.Text>Chia:</InputGroup.Text>
                <Form.Control as="input" type="number" size="sm" aria-label="Chia Units" value={this.state.chia} name="chia" onChange={this.handleChiaChange}/>
              </InputGroup>
            </div>
            <div className="col">
              <InputGroup>
                <InputGroup.Text>Mojo:</InputGroup.Text>
                <Form.Control as="input" type="number" size="sm" aria-label="Mojo Units" value={this.state.mojo} name="mojo" onChange={this.handleMojoChange}/>
              </InputGroup>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <h4 style={{marginTop: "1rem"}}> Worth: ${this.state.chiaPrice}</h4>
            </div>
          </div>
        </div>
        <div className="container text-center ">
          <div className="row">
            <div className="col">
              <DropdownButton id="prefix" style={{marginBottom: "1rem"}} title="Address Prefix:" onSelect={this.updateAddrPrefix}>
                <Dropdown.Item eventKey="xch" active={this.state.addr_prefix === "xch"}>Mainnet</Dropdown.Item>
                <Dropdown.Item eventKey="txch" active={this.state.addr_prefix === "txch"}>Testnet</Dropdown.Item>
                <Dropdown.Item eventKey="nft"  active={this.state.addr_prefix === "nft"}>NFT</Dropdown.Item>
              </DropdownButton>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <InputGroup>
                <InputGroup.Text>Chia Address:</InputGroup.Text>
                <Form.Control as="textarea" aria-label="Encoded Address" value={this.state.chia_address} name="chia" onChange={this.updatePuzzleHash}/>
              </InputGroup>
            </div>
            <div className="col">
              <InputGroup>
                <InputGroup.Text>Puzzle Hash:</InputGroup.Text>
                <Form.Control as="textarea" aria-label="Puzzle Hash" value={this.state.puzzle_hash} name="chia" onChange={this.updateChiaAddress}/>
              </InputGroup>
            </div>
          </div>
        </div>
      </Layout>
    )
  }
}


export default IndexPage
