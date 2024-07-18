import formatDate from "../../utils/formateDate";
import PropTypes from "prop-types";
import { Pencil, Trash2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import notify from "../../utils/toastHandler";
import axios from "axios";
import { server } from "../../redux/store";
import { getAllTrainRoutes } from "../../redux/actions/trainRoute";
import DeleteRoute from "../Modals/DeleteRoute";
import TrainRouteForm from "../Modals/TrainRouteForm";
import ModalWrapper from "../Modals/ModalWrapper";

const isNeedsTobeDisabled = (isoDate, role) => {
  if (role === "admin") {
    return true;
  }
  const inputDate = new Date(isoDate);
  const currentDate = new Date();
  return inputDate < currentDate;
};

const Card = ({ item, onClick, isMainPage = true }) => {
  const { user } = useSelector((state) => state.user);
  const [open, setOpen] = useState(false);
  const [type, setType] = useState("");

  const [typedName, setTypedName] = useState("");
  const dispatch = useDispatch();

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => {
    setOpen(false);
    setTypedName("");
  };

  const handleClickIcon = (type) => {
    setType(type);
    onOpenModal();
  };

  const handleInputChange = (e) => {
    setTypedName(e.target.value);
  };

  const handleConfirmDelete = async () => {
    if (typedName.trim() === item.train_name) {
      try {
        const response = await axios.delete(
          `${server}/admin/train/${item._id}`,
          { withCredentials: true }
        );
        if (response.data.success) {
          notify("Train details deleted successfully.", "success");
          dispatch(getAllTrainRoutes());
          onCloseModal();
        } else {
          notify("Failed to delete train details.", "error");
        }
      } catch (error) {
        console.error("There was an error deleting the train details:", error);
        notify("There was an error deleting the train details.", "error");
      }
    } else {
      notify("Wrong spelling. Please type the correct train name.", "error");
    }
  };

  return (
    <>
      <div className="m-2.5 border border-dotted border-black rounded-lg">
        <div
          className={`bg-[#e3eeff] ${
            user.role === "admin" ? "flex items-center justify-between" : ""
          } `}
          style={{
            borderTopLeftRadius: "10px",
            borderTopRightRadius: "10px",
            padding: "10px",
            paddingLeft: "22px",
          }}
        >
          <p className="text-xl font-extrabold">{item?.train_name}</p>
          {user.role === "admin" && (
            <div
              className={`${
                user.role === "admin" ? "flex gap-2 items-center" : "none"
              }`}
            >
              <Pencil
                height={16}
                onClick={() => handleClickIcon("edit")}
                className="cursor-pointer text-blue-500 hover:text-blue-700"
              />
              <Trash2
                height={16}
                onClick={() => handleClickIcon("delete")}
                className="cursor-pointer text-red-500 hover:text-red-700"
              />
            </div>
          )}
        </div>
        <div className="p-[17px] pl-[25px] pr-[25px]">
          <section className="flex items-center justify-between pb-[17px]">
            <p>
              From : <strong>{item.origin}</strong>
            </p>
            <p> {"---------------------------->"} </p>
            <p>
              To : <strong>{item.destination}</strong>
            </p>
          </section>
          <hr />
          <section className="flex items-center justify-between pt-[17px] pb-[5px] text-sm">
            <p>
              🚅Departure time :{" "}
              <span className="font-semibold">
                {formatDate(item?.arrival_time, "time")}
              </span>
            </p>
            <p>
              🚉Arrival time :{" "}
              <span className="font-semibold">
                {formatDate(item?.departure_time, "time")}
              </span>
            </p>
          </section>
          <section className="flex items-center justify-between pt-[5px] pb-[5px] text-sm">
            <p>
              Date :{" "}
              <span className="font-semibold">
                {formatDate(item?.arrival_time, "date")}
              </span>
            </p>
            <p>
              Date :{" "}
              <span className="font-semibold">
                {formatDate(item?.departure_time, "date")}
              </span>
            </p>
          </section>
          {isMainPage ? (
            <section className="flex items-center justify-center">
              <button
                disabled={isNeedsTobeDisabled(item?.arrival_time, user.role)}
                onClick={() => onClick(item._id)}
                className={`text-center text-white ${
                  isNeedsTobeDisabled(item?.arrival_time, user.role)
                    ? "bg-slate-400 cursor-not-allowed"
                    : "bg-blue-700 hover:bg-blue-800"
                }   focus:ring-4 focus:ring-blue-300 font-medium rounded-lg px-5 py-2.5 mr-2 mb-2  focus:outline-none `}
              >
                Book now!
              </button>
            </section>
          ) : (
            <section className="flex items-center justify-between pt-[5px] pb-[17px] text-sm">
              <p>
                Distance :{" "}
                <span className="font-semibold">{item?.distance_km}km</span>
              </p>
              <p>
                Price per person :{" "}
                <span className="font-semibold">${item?.ticket_price}</span>
              </p>
            </section>
          )}
        </div>
      </div>

      {/*EDIT && DELETE MODAL CODE */}

      <ModalWrapper open={open} onClose={onCloseModal}>
        {type === "delete" && (
          <DeleteRoute
            key="delete"
            item={item}
            typedName={typedName}
            handleInputChange={handleInputChange}
            handleConfirmDelete={handleConfirmDelete}
          />
        )}
        {type === "edit" && <TrainRouteForm item={item} isEditMode={true} />}
      </ModalWrapper>
    </>
  );
};

Card.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.string,
    train_id: PropTypes.number,
    train_name: PropTypes.string,
    origin: PropTypes.string,
    destination: PropTypes.string,
    distance_km: PropTypes.number,
    ticket_price: PropTypes.number,
    departure_time: PropTypes.string,
    arrival_time: PropTypes.string,
  }).isRequired,
  onClick: PropTypes.func,
  isMainPage: PropTypes.bool,
};

export default Card;
