import { Modal } from "react-responsive-modal";
import { CircleX } from "lucide-react";
import PropTypes from 'prop-types';

const ModalWrapper = ({ children, open, onClose }) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      center
      closeIcon={<CircleX />}
    >
      {children}
    </Modal>
  );
};

ModalWrapper.propTypes = {
  children: PropTypes.node.isRequired, 
  open: PropTypes.bool.isRequired, 
  onClose: PropTypes.func.isRequired, 
};

export default ModalWrapper;
