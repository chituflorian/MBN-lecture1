import React from "react";

function TestApp() {
  return (
    <div>
      <h2>Tombola Contract</h2>
      <p>
        This contract is owned by owner.
        <br />
        There are currently 3 participants,
        <br />
        competing to win a total prize of 34 ether!
      </p>
      <hr />

      <form onSubmit={this.onSubmit}>
        <h4>Want to participate?</h4>
        <div>
          <label>Amount of ether to buy a ticket</label>
          <input />
        </div>
        <button>Buy Ticket</button>
      </form>
      <hr />

      <h4>Ready to pick the winners?</h4>
      <button onClick={this.onClick}>Pick Winners</button>
      <hr />

      <h1>message</h1>
    </div>
  );
}

export default TestApp;
