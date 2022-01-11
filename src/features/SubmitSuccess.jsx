import Button from "@mui/material/Button";

import { useHistory } from "react-router-dom";

export default function SubmitSuccess() {
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
        Request submitted successfully. You will get a response shortly.
        <br />
        Avg wait time 10mins
        <br />
        <Button onClick={() => push(`/my-tickets`)} sx={{ mt: 2 }}>
          My tickets
        </Button>
        <Button onClick={() => push(`/my-tickets/new`)} sx={{ mt: 2 }}>
          Submit another
        </Button>
      </div>
    </div>
  );
}
