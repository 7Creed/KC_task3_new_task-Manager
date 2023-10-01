import React, { useEffect, useRef, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { useGlobalContext } from "../utils/context";

const Modal = () => {
  const titleInputRef = useRef(null);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  // const { modal, setModal } = useGlobalContext();
  const { modal, state, dispatch } = useGlobalContext();

  const hasError =
    !state.title.trim() || !state.desc.trim() || !state.date.trim();

  useEffect(() => {
    if (titleInputRef.current) {
      titleInputRef.current.focus();
    }
  }, [modal]);

  useEffect(() => {
    hasError ? setIsButtonDisabled(true) : setIsButtonDisabled(false);
  }, [state]);

  const handleCloseModal = () => {
    dispatch({ type: "CLOSE_MODAL" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (hasError) {
      dispatch({
        type: "ERROR",
      });
      return;
    }

    dispatch({
      type: "ADD_TODO",
      payload: "val",
    });
    dispatch({
      type: "CLEAR_INPUT",
    });
    handleCloseModal();
  };

  return (
    <div className="w-full h-screen fixed top-0 left-0 bg-[#00000099] p-5 z-[100]">
      {
        <div className="w-full h-full grid place-items-center">
          {/* flex justify-center items-center */}
          <form
            onSubmit={handleSubmit}
            action=""
            className="bg-white w-[60%] min-w-[300px] lg:max-w-[50%] pt-6 pb-8 px-6 md:px-8 rounded-2xl"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-black text-xl font-semibold">Add New Task</h2>
              <AiOutlineClose
                className="text-[#eb1414] text-3xl"
                onClick={handleCloseModal}
              />
            </div>
            <fieldset className="flex flex-col gap-3 mb-4">
              <label htmlFor="title" className="flex flex-col mb-4">
                <span className="font-semibold text-[#10171b] text-xs mb-2">
                  Title
                </span>
                <input
                  type="text"
                  name="title"
                  value={state.title}
                  ref={titleInputRef}
                  placeholder="Enter task title"
                  onChange={(e) =>
                    dispatch({
                      type: "CHANGE",
                      payload: "title",
                      value: e.target.value,
                    })
                  }
                  className="w-full border border-gray-400 text-base text-black placeholder:text-[#666666] px-3 py-4 bg-transparent outline-none rounded-[0.5rem]"
                />
              </label>
              <label htmlFor="desc" className="flex flex-col mb-4">
                <span className="font-semibold text-[#10171b] text-xs mb-2">
                  Description
                </span>
                <textarea
                  rows="3"
                  type="text"
                  name="desc"
                  value={state.desc}
                  placeholder="Enter task description"
                  onChange={(e) =>
                    dispatch({
                      type: "CHANGE",
                      payload: "desc",
                      value: e.target.value,
                    })
                  }
                  className="w-full border border-gray-400 text-base text-black placeholder:text-[#666666] px-3 py-4 bg-transparent outline-none rounded-[0.5rem]"
                />
              </label>

              <div className="flex flex-col">
                <label htmlFor="dueDate" className="">
                  <span className="font-semibold text-[#10171b] text-xs mb-2">
                    Due Date:
                  </span>
                  <input
                    type="date"
                    value={state.date}
                    name="dueDate"
                    className="w-full border border-gray-400 text-base text-black placeholder:text-[#666666] px-3 py-4 bg-transparent outline-none rounded-[0.5rem]"
                    onChange={(e) =>
                      dispatch({
                        type: "CHANGE",
                        payload: "date",
                        value: e.target.value,
                      })
                    }
                  />
                </label>
              </div>
            </fieldset>
            <div className="w-full flex justify-center mt-8">
              <button
                type="submit"
                className="w-full bg-green-600 text-white rounded-lg py-3 px-8 hover:bg-green-700 active:scale-90 transition-all duration-300 ease-in disabled:opacity-50"
                disabled={isButtonDisabled}
              >
                {state.val ? "Save" : "Add Task"}
              </button>
            </div>
          </form>
        </div>
      }
    </div>
  );
};

export default Modal;
