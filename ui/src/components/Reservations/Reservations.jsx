import { useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { server } from "../../redux/store";
import { useState } from "react";
import ReservationCard from "../Card/ReservationCard";
import InfoButton from "../Button/InfoButton";
import { useNavigate } from "react-router-dom";
import notify from "../../utils/toastHandler";
import toast from "react-hot-toast";

const config = {
  headers: {
    "Content-type": "application/json",
  },

  withCredentials: true,
};

const Reservations = () => {
  const [data, setData] = useState([]);
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const handleFetch = async () => {
    try {
      notify("Loading...", "loading");
      let info = {
        userId: user._id,
      };
      const response = await axios.post(`${server}/getHistory`, info, config);
      setData(response.data.userHistory || []);
    } catch (error) {
      console.error("There was an error making the request:", error);
    } finally {
      toast.dismiss();
    }
  };

  const handleCancel = async (id) => {
    let info = {
      userId: user._id,
      objectId: id,
    };

    try {
      notify("Loading...", "loading");
      const response = await axios.put(`${server}/updateHistory`, info, config);
      if (response && response.data && response.data.success) {
        handleFetch();
      }
    } catch (error) {
      console.error("There was an error making the request:", error);
    }finally{
      toast.dismiss();

    }
  };

  useEffect(() => {
    if (user._id) {
      handleFetch();
    }
  }, []);

  return (
    <div>
      <div className="m-[20px]">
        <section className="text-center mb-[20px]">
          <h1 className="text-3xl font-extrabold">Previous Reservations</h1>
        </section>
      </div>
      <div className="flex items-center justify-center flex-col gap-2">
        {data &&
          data.map((item) => {
            return (
              <div className="w-[600px]" key={item._id}>
                <ReservationCard
                  item={item}
                  onClick={() => handleCancel(item._id)}
                />
              </div>
            );
          })}

        {data.length === 0 && (
          <>
            <div className="flex items-center justify-center h-[40vh] gap-4 flex-col">
              <h3>Looks like you are new to site..!!😊</h3>
              <InfoButton
                text={"Go to Home page"}
                onClick={() => navigate("/")}
                removeIcon={true}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Reservations;
