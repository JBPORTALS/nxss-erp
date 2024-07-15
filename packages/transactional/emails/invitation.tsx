import * as React from "react";
import { Button, Container, Heading, Html } from "@react-email/components";
import { RocketIcon } from "lucide-react";

export const Invitation = ({
  link,
  org,
  to,
}: {
  link: string;
  org: string;
  to: string;
}) => {
  return (
    <Html style={{ fontFamily: "sans-serif" }}>
      <Container>
        <div
          style={{
            paddingBlock: "40px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              width: "64px",
              height: "64px",
              borderRadius: "9999px",
              background: "black",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <RocketIcon
              style={{ height: "32px", width: "32px", color: "white" }}
            />
          </div>
          <Heading as="h2">Join KSIT on NexussERP</Heading>
          <span style={{ color: "gray", textAlign: "center" }}>
            Empowering Education with Smart ERP Solutions
          </span>
        </div>
        <p>
          Dear <b>manu48617@gmail.com,</b>
        </p>
        <p style={{ lineHeight: "24px" }}>
          You have been invited to join <b>KSIT's</b> workspace on Nexus ERP as
          a staff member. Please click on the button below to accept the
          invitation and set up your account.
        </p>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Button
            href="https://example.com"
            style={{
              background: "#000",
              color: "#fff",
              padding: "12px 20px",
              width: "100%",
              textAlign: "center",
              borderRadius: "6px",
            }}
          >
            Join the Institution
          </Button>
        </div>
      </Container>
    </Html>
  );
};

export default Invitation;
