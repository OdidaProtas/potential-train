import Button from "@mui/material/Button";
import { useHistory } from "react-router-dom";

export default function LandingPage() {
  const { push } = useHistory();
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div style={{ textAlign: "center" }}>
        Welcome to eazzybooks support
        <br />
        <Button onClick={() => push("/my-tickets/new")}>Add a ticket</Button>
        <Button onClick={() => push("/my-tickets")}>Previous tickets</Button>

      </div>
    </div>
  );
}
