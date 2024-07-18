import { CirclePlus } from "lucide-react";
import { buttonClassName } from "../../constants";
buttonClassName;
import PropTypes from 'prop-types';


const InfoButton = ({ text, onClick, removeIcon = false,style={} }) => {
  return (
    <button type="button" onClick={onClick} className={buttonClassName} style={style}>
      {!removeIcon && <CirclePlus />}
      {text}
    </button>
  );
};

InfoButton.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  removeIcon: PropTypes.bool,
  style: PropTypes.object
};

export default InfoButton;
