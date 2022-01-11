import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import { useHistory, Switch, Route, useRouteMatch } from "react-router-dom";
import ListItemText from "@mui/material/ListItemText";
import axiosInstance from "../app/axiosInstance";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";

import { useState, useContext } from "react";
import { StateContext } from "../app/State";
import { useParams } from "react-router-dom";
import { Redirect } from "react-router-dom";
import useMyTickets from "../app/hooks/useMyTickets";

export default function Home() {
  const [state, setState] = useState(null);

  const { dispatch, myTickets } = useContext(StateContext);

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const { push } = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    axiosInstance
      .post("/ticket", { ...state, status: "pending" })
      .then(({ data }) => {
        dispatch({
          type: "ADD_SINGLE",
          context: "myTickets",
          payload: data,
        });
      })
      .catch((e) => {
        console.log(e);
      });

    push("/success");
  };

  const { path } = useRouteMatch();
  useMyTickets();

  return (
    <form onSubmit={handleSubmit}>
      <Typography variant="h6">Eazzybooks MIS Support</Typography>
      <Divider />
      <Container>
        <Grid container>
          <Grid item xs={3}>
            <Button
              onClick={() => push(`/my-tickets/new`)}
              sx={{ my: 2 }}
              type="button"
            >
              Create new
            </Button>
            <Typography sx={{ mt: 2 }}>Previous tickets tickets</Typography>
            <Divider />
            {myTickets &&
              myTickets?.map((m, i) => {
                return (
                  <div key={i}>
                    <ListItem sx={{ mt: 2 }} disablePadding>
                      <ListItemButton
                        onClick={() => push(`/my-tickets/${m.id}`)}
                      >
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
          <Grid sx={{ bgcolor: "lightgray", p: 3 }} item xs mt={2}>
            <Switch>
              <Route exact path={path}>
                <div
                  style={{
                    minHeight: "80vh",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <div>Select a ticket to view its details</div>
                </div>
              </Route>
              <Route exact path={`${path}/new`}>
                <Typography>Submit a ticket</Typography>
                <Divider />
                <Divider />
                <Stack sx={{ mt: 2 }} spacing={2}>
                  <TextField
                    required
                    onChange={handleChange}
                    name="fullName"
                    fullWidth
                    value={state?.fullName}
                    label="Enter full name"
                  ></TextField>

                  <TextField
                    required
                    onChange={handleChange}
                    name="company"
                    fullWidth
                    value={state?.company}
                    label="Company"
                  ></TextField>
                  <Grid container spacing={2}>
                    <Grid item xs>
                      <TextField
                        required
                        onChange={handleChange}
                        name="email"
                        fullWidth
                        value={state?.email}
                        label="Enter email address"
                      ></TextField>
                    </Grid>
                    <Grid item xs>
                      <TextField
                        required
                        value={state?.phone}
                        onChange={handleChange}
                        name="phone"
                        fullWidth
                        label="Contact Phone number"
                      ></TextField>
                    </Grid>
                  </Grid>
                  <TextField
                    required
                    onChange={handleChange}
                    name="anydesk"
                    value={state?.anydesk}
                    fullWidth
                    label="Anydesk address"
                  ></TextField>
                  <TextField
                    name="subject"
                    onChange={handleChange}
                    required
                    value={state?.subject}
                    fullWidth
                    label="Request subject"
                  ></TextField>
                  <TextField
                    name="body"
                    required
                    onChange={handleChange}
                    value={state?.body}
                    multiline
                    fullWidth
                    label="Request desc"
                  ></TextField>
                  <TextField
                    disabled
                    label="Attatchments"
                    type="file"
                  ></TextField>
                  <Button type="submit" variant="contained">
                    Submit request
                  </Button>
                </Stack>
              </Route>
              <Route exact path={`${path}/:id`}>
                <TicketDetails />
              </Route>
              <Route exact path="**">
                url not found
              </Route>
            </Switch>
          </Grid>
        </Grid>
      </Container>
    </form>
  );
}

const TicketDetails = () => {
  const { myTickets } = useContext(StateContext);

  const { id } = useParams();

  if (!myTickets) return <Redirect to="my-tickets" />;

  const tcket = myTickets?.filter((s) => s.id === id)[0];


  return (
    <div>
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
      <Button sx={{ mt: 2 }}>Cancel ticket</Button>
      <Divider />
      <Typography>
        {tcket?.phone} || {tcket?.email}
      </Typography>
    </div>
  );
};
