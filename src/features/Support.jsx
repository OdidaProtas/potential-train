import Grid from "@mui/material/Grid";
import useMyTickets from "../app/hooks/useMyTickets";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import { useContext } from "react";
import { StateContext } from "../app/State";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import {
  useHistory,
  useRouteMatch,
  Switch,
  Route,
  useParams,
} from "react-router-dom";
import Container from "@mui/material/Container";
import useSocket from "../app/hooks/useSocket";
import axiosInstance from "../app/axiosInstance";
export default function Support() {
  const { myTickets } = useContext(StateContext);
  useMyTickets();
  useSocket();

  const { push } = useHistory();
  const { path } = useRouteMatch();

  return (
    <div>
      <Grid container>
        <Grid sx={{ minHeight: "100vh", bgcolor: "lightgray" }} item xs={3}>
          <Typography variant="h5"> Eazzy Support admin</Typography>
          <Divider sx={{ my: 2 }}></Divider>
          Available tickets (
          {myTickets?.filter((f) => f.status === "pending")?.length} pending)
          <Divider sx={{ my: 2 }} />
          {myTickets &&
            myTickets
              ?.filter((f) => f.status === "pending")
              ?.map((m, i) => {
                return (
                  <div key={i}>
                    <ListItem sx={{ mt: 2 }} disablePadding>
                      <ListItemButton onClick={() => push(`/admin/${m.id}`)}>
                        <ListItemText
                          sx={{
                            color: m.status === "pending" ? "red" : "green",
                          }}
                          secondary={`Ticket number ${i}`}
                          primary={m?.subject}
                        />
                      </ListItemButton>
                    </ListItem>
                  </div>
                );
              })}
        </Grid>
        <Grid item xs>
          <Switch>
            <Route exact path={path}>
              <div
                style={{
                  minHeight: "100vh",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                Select a ticket to view
              </div>
            </Route>
            <Route exact exact path={`${path}/:id`}>
              <Ticket />
            </Route>
            <Route path="**">Component not found</Route>
          </Switch>
        </Grid>
      </Grid>
    </div>
  );
}

const Ticket = () => {
  const { myTickets, dispatch } = useContext(StateContext);
  const { id } = useParams();
  const { push } = useHistory();
  const tcket = myTickets?.filter((f) => f.id === id)[0];

  if (!myTickets?.length)
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        No tickets available
      </div>
    );

  const handleResolved = (i) => {
    axiosInstance
      .patch(`/ticket/${id}`, { status: "resolved" })
      .then(({ data }) => {
        const idx = myTickets?.indexOf(tcket);
        const all = [...myTickets];
        all.splice(idx, 1);
        dispatch({
          type: "ADD_MULTIPLE",
          context: "myTickets",
          payload: all,
        });
        push("/admin");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <Container sx={{ mt: 2 }}>
      <Typography
        sx={{ color: tcket?.status === "pending" ? "red" : "green" }}
        variant="h5"
      >
        {" "}
        {tcket?.subject}
      </Typography>
      <Divider />
      <Typography>Status: {tcket?.status}</Typography>
      Anydesk: {tcket?.anydesk}
      <br />
      <Button onClick={handleResolved} sx={{ mt: 2 }}>
        Mark solved
      </Button>
      <Divider />
      <Typography>
        {tcket?.phone} || {tcket?.email}
      </Typography>
    </Container>
  );
};
