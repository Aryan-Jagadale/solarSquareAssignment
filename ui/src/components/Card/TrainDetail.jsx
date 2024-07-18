import Card from "./card";
import PropTypes from "prop-types";

const TrainDetail = ({ trainInfo }) => {
  console.log(trainInfo);
  return (
    <Card item={trainInfo} isMainPage={false}/>
  );
};

TrainDetail.propTypes = {
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
export default TrainDetail;
