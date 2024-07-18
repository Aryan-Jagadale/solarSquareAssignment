import { CircleX } from "lucide-react";
import PropTypes from 'prop-types';

const RemoveButton = ({ text, onClick, removeIcon = false }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="ml-[10px] text-red-500 flex items-center gap-[4px] py-2 px-4 rounded hover:bg-red-100"
    >
      {!removeIcon && <CircleX height={18} />}

      {text}
    </button>
  );
};

RemoveButton.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  removeIcon: PropTypes.bool
};


export default RemoveButton;
