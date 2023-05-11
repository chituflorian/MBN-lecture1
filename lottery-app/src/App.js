import "./App.css";
import { Component } from "react";
import tombola from "./tombola";
import web3 from "./web3";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      owner: "",
      participants: [],
      totalPrize: "",
      ticketPrice: "",
      message: "",
      value: "",
    };
  }

  async componentDidMount() {
    const owner = await tombola.methods.owner().call();
    const participants = await tombola.methods
      .getAllParticipantsAddress()
      .call();
    const totalPrize = await tombola.methods.getTotalPrize().call();
    const ticketPrice = await tombola.methods.ticketPrice().call();

    this.setState({ owner, participants, totalPrize, ticketPrice });
  }

  onSubmit = async (event) => {
    event.preventDefault();

    const accounts = await web3.eth.getAccounts();

    this.setState({ message: "Waiting for transaction success..." });
    await tombola.methods.buyTicket().send({
      from: accounts[0],
      value: this.state.ticketPrice,
    });

    this.setState({ message: "You have successfully bought a ticket!" });
  };

  onClick = async () => {
    const accounts = await web3.eth.getAccounts();

    this.setState({ message: "Waiting for transaction success..." });

    await tombola.methods.startTombola().send({
      from: accounts[0],
    });

    this.setState({
      message: "The Tombola has ended, winners have been picked!",
    });
  };

  render() {
    return (
      <div>
        <h2>Tombola Contract</h2>
        <p>
          This contract is owned by {this.state.owner}.<br />
          There are currently {this.state.participants.length} participants,
          <br />
          competing to win a total prize of{" "}
          {web3.utils.fromWei(this.state.totalPrize, "ether")} ether!
        </p>
        <hr />

        <form onSubmit={this.onSubmit}>
          <h4>Want to participate?</h4>
          <div>
            <label>Amount of ether to buy a ticket</label>
            <input
              value={this.state.value}
              onChange={(event) => this.setState({ value: event.target.value })}
            />
          </div>
          <button>Buy Ticket</button>
        </form>
        <hr />

        <h4>Ready to pick the winners?</h4>
        <button onClick={this.onClick}>Pick Winners</button>
        <hr />

        <h1>{this.state.message}</h1>
      </div>
    );
  }
}

export default App;
