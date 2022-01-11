import { useContext, useEffect } from "react";
import axiosInstance from "../axiosInstance";
import { StateContext } from "../State";

export default function useMyTickets() {
  const { dispatch, myTickets } = useContext(StateContext);

  const fetchRecs = () => {
    if (!Boolean(myTickets)) {
      axiosInstance
        .get("/ticket")
        .then(({ data }) => {
          dispatch({
            type: "ADD_MULTIPLE",
            payload: data,
            context: "myTickets",
          });
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };

  useEffect(() => {
    fetchRecs();
  }, []);
}
