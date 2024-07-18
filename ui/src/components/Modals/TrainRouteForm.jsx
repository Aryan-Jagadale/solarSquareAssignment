import { useState, useEffect } from "react";
import { inputClassName } from "../../constants";
import InfoButton from "../Button/InfoButton";
import axios from "axios";
import { server } from "../../redux/store";
import notify from "../../utils/toastHandler";
import { useDispatch } from "react-redux";
import { getAllTrainRoutes } from "../../redux/actions/trainRoute";
import { getCurrentDateTime } from "../../utils/getCurrentTime";
import PropTypes from 'prop-types';

const TrainRouteForm = ({ item = {}, isEditMode = false }) => {
  const initialState = {
    train_name: item.train_name || "",
    train_id: item.train_id || Math.floor(Math.random() * 900) + 100,
    origin: item.origin || "",
    destination: item.destination || "",
    distance_km: item.distance_km || 0,
    ticket_price: item.ticket_price || 0,
    departure_time: item.departure_time
      ? item.departure_time.split(".")[0]
      : "",
    arrival_time: item.arrival_time ? item.arrival_time.split(".")[0] : "",
  };

  const [trainDetails, setTrainDetails] = useState(initialState);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isEditMode) {
      setTrainDetails(initialState);
    }
  }, [item, isEditMode]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTrainDetails({ ...trainDetails, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      const endpoint = isEditMode
        ? `${server}/admin/train/${item._id}`
        : `${server}/admin/train`;

      const method = isEditMode ? "put" : "post";

      const response = await axios[method](endpoint, trainDetails, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      if (response && response.data && response.data.success) {
        notify(
          `Train details ${isEditMode ? "updated" : "created"} successfully`,
          "success"
        );
        dispatch(getAllTrainRoutes());
        if (!isEditMode) {
          setTrainDetails(initialState);
        }
        return;
      } else {
        notify(
          `Failed to ${isEditMode ? "update" : "create"} train details`,
          "error"
        );
      }
    } catch (error) {
      console.error(
        `There was an error ${
          isEditMode ? "updating" : "creating"
        } the train details:`,
        error
      );
      notify(
        `An error occurred while ${
          isEditMode ? "updating" : "creating"
        } train details`,
        "error"
      );
    }
  };

  return (
    <>
      <h2 className="font-bold text-xl">
        {isEditMode ? "Edit the Train Details" : "Create a New Train Route"}
      </h2>
      <section
        className="w-[40vw] flex flex-col mt-8 gap-4"
        style={{
          border: "1px dotted lightgray",
          borderRadius: "10px",
          padding: "16px",
          paddingTop: "18px",
          paddingBottom: "18px",
        }}
      >
        <div>
          <div className="flex flex-col">
            <label className="font-semibold text-xs">Train Name</label>
            <input
              type="text"
              name="train_name"
              value={trainDetails.train_name}
              onChange={handleChange}
              className={inputClassName}
            />
          </div>
        </div>

        <div className="flex flex-row justify-between gap-4 w-full">
          <div className="flex flex-col w-1/2">
            <label className="font-semibold text-xs">Origin</label>
            <input
              type="text"
              name="origin"
              value={trainDetails.origin}
              onChange={handleChange}
              className={inputClassName}
            />
          </div>
          <div className="flex flex-col w-1/2">
            <label className="font-semibold text-xs">Destination</label>
            <input
              type="text"
              name="destination"
              value={trainDetails.destination}
              onChange={handleChange}
              className={inputClassName}
            />
          </div>
        </div>

        <div className="flex flex-row justify-between gap-4 w-full">
          <div className="flex flex-col w-1/2">
            <label className="font-semibold text-xs">Distance (km)</label>
            <input
              type="number"
              name="distance_km"
              value={trainDetails.distance_km}
              onChange={handleChange}
              min={1}
              className={inputClassName}
            />
          </div>
          <div className="flex flex-col w-1/2">
            <label className="font-semibold text-xs">Ticket Price</label>
            <input
              type="number"
              name="ticket_price"
              min={1}
              value={trainDetails.ticket_price}
              onChange={handleChange}
              className={inputClassName}
            />
          </div>
        </div>

        <div className="flex flex-row justify-between gap-4 w-full">
          <div className="flex flex-col w-1/2">
            <label className="font-semibold text-xs">Departure Time</label>
            <input
              type="datetime-local"
              name="departure_time"
              value={trainDetails.departure_time}
              onChange={handleChange}
              className={inputClassName}
              min={getCurrentDateTime()}
            />
          </div>
          <div className="flex flex-col w-1/2">
            <label className="font-semibold text-xs">Arrival Time</label>
            <input
              type="datetime-local"
              name="arrival_time"
              value={trainDetails.arrival_time}
              onChange={handleChange}
              className={inputClassName}
              min={trainDetails.departure_time}
            />
          </div>
        </div>

        <div className="flex items-center justify-end">
          <InfoButton
            onClick={handleSubmit}
            text={isEditMode ? "Update" : "Create"}
            removeIcon={true}
          />
        </div>
      </section>
    </>
  );
};

TrainRouteForm.propTypes = {
  item: PropTypes.shape({
    train_name: PropTypes.string,
    train_id: PropTypes.number,
    origin: PropTypes.string,
    destination: PropTypes.string,
    distance_km: PropTypes.number,
    ticket_price: PropTypes.number,
    departure_time: PropTypes.string,
    arrival_time: PropTypes.string,
  }),
  isEditMode: PropTypes.bool,
};

export default TrainRouteForm;
