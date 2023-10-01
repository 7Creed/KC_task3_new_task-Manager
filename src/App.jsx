import { useGlobalContext } from "../utils/context";
import Modal from "../components/Modal";
import { AiOutlinePlus } from "react-icons/ai";
import { BsCheckAll } from "react-icons/bs";
import "./App.css";

export default function App() {
  const { val, setVal, state, dispatch } = useGlobalContext();

  const robot = "./images/robot.png";
  const planner = "./images/planner.jpg";
  const todo = "./images/to-do.jpg";

  const handleOpenModal = () => {
    dispatch({ type: "OPEN_MODAL", payload: val || null });
  };

  const handleCheck = (id) => {
    dispatch({ type: "CHECK_TODO", payload: { id: id } });
  };

  const handleEdit = (id, todo) => (e) => {
    console.log(val);
    dispatch({
      type: "EDIT_TODO",
      payload: { id: id, edit: val, value: todo },
    });
  };

  const handleDel = (id) => {
    dispatch({ type: "REMOVE_TODO", payload: { id: id } });
  };

  const handleClearTask = () => {
    dispatch({ type: "CLEAR_TODO" });
  };

  return (
    <div
      className={`${
        state.todoArr.length === 0 && "min-h-screen"
      }flex flex-col justify-between w-11/12 mx-auto `}
    >
      <h1 className="text-center text-2xl md:text-3xl font-bold py-5">
        Task Management App
      </h1>
      {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-20"></div> */}

      {state.todoArr.length >= 1 ? (
        <div className="">
          <div className="flex justify-between items-center">
            <div className="my-5">
              <h1 className="font-bold text-xl">Tasks</h1>
              <p className="">
                Click on the checkbox to mark task as completed
              </p>
            </div>
            <button className="cursor-pointer" onClick={handleClearTask}>
              Clear Tasks
            </button>
          </div>
          <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-5">
            {state.todoArr.map((todo) => {
              const { id, title, desc, date, completed } = todo;
              return (
                <div key={id} className="card h-full">
                  <div className="mb-10 flex flex-col">
                    <div
                      className="w-full border border-gray-300 rounded-md p-3 bg-slate-200
                    "
                    >
                      <div className="flex justify-between">
                        <input
                          type="checkbox"
                          checked={completed}
                          className=" checked:bg-red-500"
                          onChange={() => handleCheck(id)}
                        />
                        <p className="">Due Date: {date}</p>
                      </div>
                      <div className="">
                        <div className="w-full">
                          <div className="w-full flex justify-between items-center">
                            <h2 className="font-bold text-3xl my-3">{title}</h2>
                            {completed && (
                              <BsCheckAll className="text-3xl text-green-600" />
                            )}
                          </div>
                          <p className="text-lg mb-5">{desc}</p>
                        </div>
                      </div>
                      <div className="flex justify-center gap-3">
                        <button
                          className="py-1 px-3 rounded-md border border-green-600 text-green-600 bg-tranparent"
                          onClick={(e) => {
                            setVal(todo);
                            handleEdit(id, todo)(e);
                          }}
                        >
                          Edit
                        </button>
                        <button
                          className="py-1 px-3 rounded-md border border-green-600 bg-green-600 text-white"
                          onClick={() => handleDel(id)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="">
          <p className="text-area text-center p-4">
            You have no tasks currently. Please click on the button at the right
            corner to add tasks
          </p>
          <div className="image-area w-11/12 mx-auto">
            <div className="flex justify-center items-center w-[70%] h-[70%] bg-green-60 mx-auto">
              <div className="flex w-1/2 place-content-center">
                <img src={robot} alt="robot" className="w-full h-auto" />
              </div>
            </div>
            <div className="grid grid-cols-2 pb-2 px-7 w-[60%] h-[20%] mx-auto">
              <img src={planner} alt="planner" className="w-full h-auto" />
              <img src={todo} alt="todo" className="w-full h-auto" />
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-end py-8">
        <button
          className="text-3xl text-white p-4 bg-green-600 rounded-full border-none outline-none"
          onClick={handleOpenModal}
        >
          <AiOutlinePlus className="" />{" "}
        </button>
      </div>

      {state.modal && <Modal />}
    </div>
  );
}
