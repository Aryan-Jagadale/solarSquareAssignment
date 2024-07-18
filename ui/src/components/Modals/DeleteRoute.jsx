import { inputClassName } from "../../constants";
import RemoveButton from "../Button/RemoveButton";
import PropTypes from "prop-types";

const DeleteRoute = ({
  item,
  typedName,
  handleInputChange,
  handleConfirmDelete,
}) => {
  return (
    <>
      <h2 className="font-bold text-xl">
        Are you sure you want to Delete train details ?
      </h2>
      <section className="w-[40vw] flex flex-col pt-8 gap-2">
        <p className="font-medium text-sm">
          Type a train name to confirm Delete.
        </p>
        <input
          placeholder={`${item?.train_name}`}
          className={inputClassName}
          value={typedName}
          onChange={handleInputChange}
        />
        <div className="text-right flex items-center justify-end">
          <RemoveButton
            text={"Confirm"}
            removeIcon={true}
            onClick={handleConfirmDelete}
          />
        </div>
      </section>
    </>
  );
};
DeleteRoute.propTypes = {
  item: PropTypes.shape({
    train_name: PropTypes.string,
  }).isRequired,
  typedName: PropTypes.string,
  handleInputChange: PropTypes.func,
  handleConfirmDelete: PropTypes.func,
};
export default DeleteRoute;
