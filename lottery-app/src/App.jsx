// import React, { useState, useEffect } from "react";
// import tombola from "./tombola";
// import web3 from "./web3";
// import { Form, Input, Button, Typography } from "antd";
// import "./TestApp.css"; // Import custom CSS file for styling

// const { Title, Paragraph } = Typography;

// const App = () => {
//   const [owner, setOwner] = useState("");
//   const [participants, setParticipants] = useState([]);
//   const [totalPrize, setTotalPrize] = useState("");
//   const [ticketPrice, setTicketPrice] = useState("");
//   const [message, setMessage] = useState("");
//   const [value, setValue] = useState("");

//   useEffect(() => {
//     const fetchData = async () => {
//       const owner = await tombola.methods.owner().call();
//       const participants = await tombola.methods
//         .getAllParticipantsAddress()
//         .call();
//       const totalPrize = await tombola.methods.getTotalPrize().call();
//       const ticketPrice = await tombola.methods.ticketPrice().call();

//       setOwner(owner);
//       setParticipants(participants);
//       setTotalPrize(totalPrize);
//       setTicketPrice(ticketPrice);
//     };

//     fetchData();
//   }, []);

//   const onSubmit = async (values) => {
//     const accounts = await web3.eth.getAccounts();

//     setMessage("Waiting for transaction success...");
//     await tombola.methods.buyTicket().send({
//       from: accounts[0],
//       value: ticketPrice,
//     });

//     setMessage("You have successfully bought a ticket!");
//   };

//   const onClick = async () => {
//     const accounts = await web3.eth.getAccounts();

//     setMessage("Waiting for transaction success...");

//     await tombola.methods.startTombola().send({
//       from: accounts[0],
//     });

//     setMessage("The Tombola has ended, winners have been picked!");
//   };

//   return (
//     <div className="container">
//       <div className="center-content">
//         <Typography>
//           <div className="title">
//             <Title
//               level={2}
//               style={{ fontWeight: "bold", fontSize: "64px", color: "#fff" }}
//             >
//               Tombola Contract
//             </Title>
//           </div>

//           <Paragraph
//             style={{
//               fontWeight: "bold",
//               fontSize: "24px",
//               color: "#eee",
//               textAlign: "center",
//             }}
//           >
//             This contract is owned by {owner}.
//             <br />
//             There are currently {participants.length} participants,
//             <br />
//             competing to win a total prize of {totalPrize} ether!
//           </Paragraph>
//         </Typography>
//         <hr />
//         <Form onFinish={onSubmit}>
//           <Typography>
//             <Title level={4}>Want to participate?</Title>
//           </Typography>
//           <Form.Item name="amount" label="Amount of ether to buy a ticket">
//             <Input />
//           </Form.Item>
//           <Button className="button" type="primary" htmlType="submit">
//             Buy Ticket
//           </Button>
//         </Form>
//         <hr />
//         <Typography>
//           <Title level={4}>Ready to pick the winners?</Title>
//         </Typography>
//         <Button type="primary" onClick={onClick}>
//           Pick Winners
//         </Button>
//         <hr />
//         <Typography>
//           <Title level={1}>{message}</Title>
//         </Typography>
//       </div>
//     </div>
//   );
// };

// export default App;
