import axios from "axios";
import { server } from "../store";

export const getAllTrainRoutes = (keyword = "") => async (dispatch) => {
  try {
    dispatch({ type: "allRoutesRequest" });

    const { data } = await axios.get(`${server}/getAllTrainRoutes?keyword=${keyword}`, {
      withCredentials: true,
    });
    
    dispatch({ type: "allRoutesSuccess", payload: data?.trainRoutes });
  } catch (error) {
    dispatch({ type: "allRoutesFail", payload: error.response.data.message });
  }
};



