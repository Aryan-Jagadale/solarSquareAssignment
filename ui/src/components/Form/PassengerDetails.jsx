import { useParams } from "react-router-dom";
import TrainDetail from "../Card/TrainDetail";
import { useState } from "react";
import { useEffect } from "react";
import { server } from "../../redux/store";
import axios from "axios";
import { useSelector } from "react-redux";
import { inputClassName } from "../../constants";
import RemoveButton from "../Button/RemoveButton";
import InfoButton from "../Button/InfoButton";
import notify from "../../utils/toastHandler";
import PropTypes from "prop-types";

const config = {
  headers: {
    "Content-type": "application/json",
  },
  withCredentials: true,
};

const PassengerDetails = () => {
  const { objectid } = useParams();

  const [trainInfo, setTrainInfo] = useState({});
  const handleFetch = async () => {
    try {
      const response = await axios.get(
        `${server}/getSingleTrainRouteData/${objectid}`,
        {
          withCredentials: true,
        }
      );
      setTrainInfo(response?.data?.trainRoute || {});
    } catch (error) {
      console.error("There was an error making the request:", error);
    }
  };
  useEffect(() => {
    handleFetch();
  }, [objectid]);

  return (
    <div className="m-[20px]">
      <section className="text-center mb-[20px]">
        <h1 className="text-3xl font-extrabold">Passenger Details</h1>
      </section>
      <TrainDetail trainInfo={trainInfo} />
      <section className="ml-[5px] mr-[5px] p-[30px] border-2 border-b-slate-400 rounded">
        <UserForm trainInfo={trainInfo} />
      </section>
    </div>
  );
};

const UserForm = ({ trainInfo }) => {
  const [users, setUsers] = useState([
    { name: "", age: "", gender: "", seatType: "", isInfant: false },
  ]);
  const [infants, setInfants] = useState([]);

  const { user } = useSelector((state) => state.user);
  const handleUserInputChange = (index, event) => {
    const { name, value } = event.target;
    const newUsers = [...users];
    newUsers[index][name] = value;
    setUsers(newUsers);
  };

  const handleInfantInputChange = (index, event) => {
    const { name, value } = event.target;
    const newInfants = [...infants];
    newInfants[index][name] = value;
    setInfants(newInfants);
  };

  const addMoreFields = () => {
    setUsers([...users, { name: "", age: "", gender: "", seatType: "" }]);
  };

  const addInfantFields = () => {
    setInfants([...infants, { name: "", age: "", gender: "" }]);
  };

  const removeUserField = (index) => {
    const newUsers = users.filter((_, i) => i !== index);
    setUsers(newUsers);
  };

  const removeInfantField = (index) => {
    const newInfants = infants.filter((_, i) => i !== index);
    setInfants(newInfants);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    for (let user of users) {
      if (!user.name || !user.age || !user.gender || !user.seatType) {
        notify("All inputs user must be filled.", "error");
        return;
      }
    }
    for (let infant of infants) {
      if (!infant.name || !infant.age || !infant.gender) {
        notify("All inputs infant must be filled.", "error");
        return;
      }
    }

    let info = {
      userId: user._id,
      trainId: trainInfo._id,
      passengers: [...users, ...infants],
      isPaymentDone: true,
      totalAmount: users.length * trainInfo?.ticket_price,
    };
    const response = await axios.post(`${server}/insertHistory`, info, config);

    if (response && response.data && response.data.success) {
      notify("Tickets are booked.");
      setInfants([]);
      setUsers([
        { name: "", age: "", gender: "", seatType: "", isInfant: false },
      ]);
      return;
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "30px" }}>
          {users.map((user, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                marginBottom: "10px",
                alignItems: "center",
                justifyContent: "space-evenly",
              }}
            >
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={user.name}
                onChange={(e) => handleUserInputChange(index, e)}
                style={{ marginRight: "10px" }}
                className={inputClassName}
              />
              <input
                type="number"
                name="age"
                placeholder="Age"
                value={user.age}
                min={10}
                onChange={(e) => handleUserInputChange(index, e)}
                style={{ marginRight: "10px" }}
                className={inputClassName}
              />
              <select
                name="gender"
                value={user.gender}
                onChange={(e) => handleUserInputChange(index, e)}
                style={{ marginRight: "10px" }}
                className={inputClassName}
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
              <select
                name="seatType"
                value={user.seatType}
                onChange={(e) => handleUserInputChange(index, e)}
                style={{ marginRight: "10px" }}
                className={inputClassName}
              >
                <option value="">Select Seat Type</option>
                <option value="window">Window</option>
                <option value="sleeper">Sleeper</option>
              </select>
              {users.length > 1 && (
                <RemoveButton
                  text={"Remove"}
                  onClick={() => removeUserField(index)}
                />
              )}
            </div>
          ))}
        </div>
        <hr />
        <div className="m-5">
          {infants.map((infant, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                marginBottom: "10px",
                alignItems: "center",
                justifyContent: "space-evenly",
              }}
            >
              <input
                type="text"
                name="name"
                placeholder="Infant Name"
                value={infant.name || ""}
                onChange={(e) => handleInfantInputChange(index, e)}
                style={{ marginRight: "10px" }}
                className={inputClassName}
              />
              <select
                name="age"
                value={infant.age || ""}
                onChange={(e) => handleInfantInputChange(index, e)}
                style={{ marginRight: "10px" }}
                className={inputClassName}
              >
                <option value="Less than One year">Less than One year</option>
                <option value="2 years">2 years</option>
                <option value="3 years">3 years</option>
                <option value="4 years">4 years</option>
              </select>
              <select
                name="gender"
                value={infant.gender}
                onChange={(e) => handleInfantInputChange(index, e)}
                style={{ marginRight: "10px" }}
                className={inputClassName}
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>

              <RemoveButton
                text={"Remove"}
                onClick={() => removeInfantField(index)}
              />
            </div>
          ))}
        </div>
        <div className="flex mb-[20px] items-center justify-between">
          <InfoButton text={"Add More Passenger"} onClick={addMoreFields} />
          <InfoButton text={"Add Infant"} onClick={addInfantFields} />
        </div>
        <button
          type="submit"
          className={`text-center text-white  bg-blue-700 hover:bg-blue-800   focus:ring-4 focus:ring-blue-300 font-medium rounded-lg px-5 py-2.5 mr-2 mb-2  focus:outline-none `}
        >
          Book ticket
        </button>

        <div className="flex items-center justify-end text-lg">
          <p>
            Total Price:{" "}
            <strong>${users.length * trainInfo?.ticket_price}</strong>{" "}
          </p>
        </div>
      </form>
    </>
  );
};
UserForm.propTypes = {
  trainInfo: PropTypes.shape({
    _id: PropTypes.string,
    train_id: PropTypes.number,
    train_name: PropTypes.string,
    origin: PropTypes.string,
    destination: PropTypes.string,
    distance_km: PropTypes.number,
    ticket_price: PropTypes.number,
    departure_time: PropTypes.string,
    arrival_time: PropTypes.string,
  })
};
export default PassengerDetails;
