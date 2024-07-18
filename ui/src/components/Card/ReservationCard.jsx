import formatDate from "../../utils/formateDate";
import { TriangleAlert, CircleDollarSign } from "lucide-react";
import RemoveButton from "../Button/RemoveButton";
import PropTypes from 'prop-types';

const ReservationCard = ({ item,onClick }) => {

  return (
    <div className="m-2.5 border border-dotted border-black rounded-lg w-full">
      <div
        className="bg-[#e3eeff] "
        style={{
          borderTopLeftRadius: "10px",
          borderTopRightRadius: "10px",
          padding: "10px",
          paddingLeft: "22px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <p className="text-xl font-extrabold">{item?.train?.train_name}</p>
        <p>
          {!item?.isPaymentDone ? (
            <span className="text-red-500 font-semibold flex items-center gap-1">
              <TriangleAlert height={18} />
              Cancelled
            </span>
          ) : (
            <span className="font-semibold text-green-500 flex items-center gap-1">
              <CircleDollarSign />
              Paid
            </span>
          )}
        </p>
      </div>
      <div className="p-[17px] pl-[25px] pr-[25px]">
        <section className="flex items-center justify-between pb-[17px]">
          <p>
            Total amount :{" "}
            <span className="font-semibold">${item?.totalAmount}</span>
          </p>
          <p>
            Booked at :{" "}
            <span className="font-semibold">{formatDate(item?.bookedAt)}</span>
          </p>
        </section>
        <section className="flex justify-between items-end gap-2  pt-[5px] pb-[5px] text-sm">
          <div>
            <h4 className="text-lg font-semibold">Passengers</h4>

            {item?.passengers.map((passenger) => {
              return (
                <div key={passenger._id}>
                  <span>Name: </span>
                  {passenger.name}
                </div>
              );
            })}
          </div>
          <RemoveButton text={"Cancel ticket"} removeIcon={true} onClick={onClick}/>
        </section>
      </div>
    </div>
  );
};

ReservationCard.propTypes = {
  item: PropTypes.shape({
    train: PropTypes.shape({
      train_name: PropTypes.string.isRequired,
    }).isRequired,
    isPaymentDone: PropTypes.bool.isRequired,
    totalAmount: PropTypes.number.isRequired,
    bookedAt: PropTypes.string.isRequired,
    passengers: PropTypes.arrayOf(PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      seatType: PropTypes.string.isRequired,
      isInfant: PropTypes.bool.isRequired,
    })).isRequired,
  }).isRequired,
  onClick: PropTypes.func.isRequired,
};

export default ReservationCard;
