import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllTrainRoutes } from "../redux/actions/trainRoute";
import { useNavigate } from "react-router-dom";
import Card from "./Card/card";
import { inputClassName } from "../constants";
import InfoButton from "./Button/InfoButton";
import ModalWrapper from "./Modals/ModalWrapper";
import TrainRouteForm from "./Modals/TrainRouteForm";

const Home = () => {
  //REDUCERS
  const { trainRoutes } = useSelector((state) => state.trainRoutes);
  const { user } = useSelector((state) => state.user);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [keyword, setKeyword] = useState("");

  //MODAL STATE
  const [open, setOpen] = useState(false);
  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => {
    setOpen(false);
  };

  //DEBOUNCE FOR SEARCH
  const onInputChangeHandler = (e) => {
    setKeyword(e.target.value);
  };
  const debounceFunction = (func, delay) => {
    let timer;
    return function () {
      let self = this;
      let args = arguments;
      clearTimeout(timer);
      timer = setTimeout(() => {
        func.apply(self, args);
      }, delay);
    };
  };

  const debounceSearch = useCallback(
    debounceFunction((keyword) => dispatch(getAllTrainRoutes(keyword)), 200),
    []
  );

  useEffect(() => {
    debounceSearch(keyword);
  }, [keyword, debounceSearch, dispatch]);

  //NAVIGATION
  function handleClick(_id) {
    navigate(`/${_id}`);
  }

  return (
    <div className="flex">
      <div className="w-[30%] min-h-[80vh] border-r-2 sticky-section">
        <section className="p-8">
          <input
            type="text"
            name="name"
            placeholder="Search by train name"
            style={{ marginRight: "10px", width: "100%" }}
            className={inputClassName}
            value={keyword}
            onChange={onInputChangeHandler}
          />
        </section>
      </div>
      <div className="w-[70%] ml-1/4 p-4 overflow-auto">
        {user.role === "admin" && (
          <>
            <div className="flex items-center justify-end mr-4">
              <InfoButton
                text={"Insert Train Route"}
                removeIcon={true}
                style={{
                  border: "1px solid #325cd9",
                }}
                onClick={onOpenModal}
              />
              <ModalWrapper open={open} onClose={onCloseModal}>
                <TrainRouteForm isEditMode={false}/>
              </ModalWrapper>
            </div>
          </>
        )}
        {trainRoutes &&
          trainRoutes.map((item) => {
            return (
              <Card
                key={item._id}
                item={item}
                onClick={() => handleClick(item._id)}
              />
            );
          })}
        {trainRoutes.length === 0 && (
          <>
            <section className="h-full flex items-center justify-center">
              <p>404, No results !!</p>
            </section>
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
