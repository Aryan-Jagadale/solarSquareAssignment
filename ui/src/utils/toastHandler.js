import toast from 'react-hot-toast';

const notify = (text, type = "success") => {
  if (type === "success") {
    toast.success(text);
  } else if (type === "error") {
    toast.error(text);
  } else if (type === "loading") {
    toast.loading(text);
  } else if (type === "custom") {
    toast.custom(text);
  } else {
    toast(text);
  }
};

export default notify
