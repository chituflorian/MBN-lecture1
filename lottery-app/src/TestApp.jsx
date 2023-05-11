import React from "react";
import { Form, Input, Button, Typography } from "antd";
import "./TestApp.css"; // Import custom CSS file for styling

const { Title, Paragraph } = Typography;

function TestApp() {
  const onFinish = (values) => {
    console.log("Form submitted:", values);
  };

  return (
    <div className="container">
      <div className="center-content">
        {" "}
        {/* Apply centering style to the container */}
        <Typography>
          <div className="title">
            <Title
              level={2}
              style={{ fontWeight: "bold", fontSize: "64px", color: "#fff" }}
            >
              Tombola Contract
            </Title>
          </div>

          <Paragraph
            style={{
              fontWeight: "bold",
              fontSize: "24px",
              color: "#eee",
              textAlign: "center",
            }}
          >
            This contract is owned by owner.
            <br />
            There are currently 3 participants,
            <br />
            competing to win a total prize of 34 ether!
          </Paragraph>
        </Typography>
        <hr />
        <Form onFinish={onFinish}>
          <Typography>
            <Title level={4}>Want to participate?</Title>
          </Typography>
          <Form.Item name="amount" label="Amount of ether to buy a ticket">
            <Input />
          </Form.Item>
          <Button className="button" type="primary" htmlType="submit">
            Buy Ticket
          </Button>
        </Form>
        <hr />
        <Typography>
          <Title level={4}>Ready to pick the winners?</Title>
        </Typography>
        <Button type="primary">Pick Winners</Button>
        <hr />
        <Typography>
          <Title
            level={1}
            style={{ fontWeight: "bold", fontSize: "24px", color: "#fff" }}
          >
            The winners are 0x5B38Da6a701c568545dCfcB03FcB875f56beddC4,
            0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2
          </Title>
        </Typography>
      </div>
    </div>
  );
}

export default TestApp;
