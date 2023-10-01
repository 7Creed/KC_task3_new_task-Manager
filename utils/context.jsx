import React, { useContext, useReducer, useState } from "react";

function formReducer(state, action) {
  const { type, payload, date, value } = action;
  //   console.log(state);
  //   console.log(action);
  switch (type) {
    case "CHANGE": {
      return { ...state, [payload]: value };
    }

    case "OPEN_MODAL": {
      return {
        ...state,
        modal: true,
      };
    }

    case "CLOSE_MODAL": {
      return {
        ...state,
        title: "",
        desc: "",
        date: "",
        modal: false,
        val: null,
      };
    }

    case "EDIT_TODO": {
      console.log([payload.edit]);

      const editTask = state.todoArr.map((task) =>
        task.id === payload.id
          ? { ...task, title: task.title, desc: task.desc, date: task.date }
          : task
      );
      console.log(state);
      return {
        ...state,
        val: payload.value,
        // val: editTask,
        title: payload.value.title,
        desc: payload.value.desc,
        date: payload.value.date,
        modal: true,
        todoArr: editTask,
      };
    }

    case "CLEAR_INPUT": {
      return {
        ...state,
        title: "",
        desc: "",
        date: "",
      };
    }

    case "ADD_TODO": {
      if (state.val) {
        const editedTask = {
          ...state,
          id: state.val.id,
          title: state.title,
          desc: state.desc,
          date: state.date,
          completed: state.val.completed,
        };
        const updatedTodoArr = state.todoArr.map((task) =>
          task.id === state.val.id ? editedTask : task
        );
        return {
          ...state,
          val: null,
          todoArr: updatedTodoArr,
        };
      }

      if (!state.val) {
        const newTask = {
          id: state.todoArr.length + 1,
          title: state.title,
          desc: state.desc,
          date: state.date,
          completed: false,
        };
        return {
          ...state,
          todoArr: [...state.todoArr, newTask],
        };
      }
      return state;
    }

    case "REMOVE_TODO": {
      const updatedTask = state.todoArr.filter(
        (task) => task.id !== payload.id
      );
      return {
        ...state,
        todoArr: updatedTask,
      };
    }

    case "CLEAR_TODO": {
      return {
        ...state,
        todoArr: [],
      };
    }

    case "CHECK_TODO": {
      const checkIt = state.todoArr.map((todo) => {
        return todo.id === payload.id
          ? { ...todo, completed: !todo.completed }
          : todo;
      });

      return {
        ...state,
        todoArr: checkIt,
      };
    }

    case "ERROR": {
      console.log("Validation error: Some fields are empty or undefined.");
      return { ...state, error: true && "Input word greater than ..." };
    }

    default:
      return state;
  }
}
const TaskContext = React.createContext("");

const TodoProvider = ({ children }) => {
  const [val, setVal] = useState(null);
  const [modal, setModal] = useState(false);

  console.log(val);
  const [state, dispatch] = useReducer(formReducer, {
    // todoArr: [],
    title: val?.title || "",
    desc: val?.desc || "",
    date: val?.date || "",
    modal: false,
    error: false,
    val: null,
    todoArr: [],
  });
  console.log(val);

  return (
    <TaskContext.Provider
      value={{ val, setVal, modal, setModal, state, dispatch }}
    >
      {children}
    </TaskContext.Provider>
  );
};

const useGlobalContext = () => {
  return useContext(TaskContext);
};

export { TodoProvider, useGlobalContext };
