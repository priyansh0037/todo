import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import React, { SetStateAction } from "react";
import CheckBox from "./CheckBox";
import { cn } from "@/utils/cn";
import { TodoType } from "@/app/page";

type Props = {
  className?: string;
  text: string;
  isCompleted: boolean;
  // id:Number
  deleteTodo: (id: number) => void;
  d: TodoType;
  handelIsTodoCompleted: (todo: TodoType) => void;

  textValue: string;
  saveEditTodo: () => void;
  editTodo: (id: number) => void;
  editModeId: number | null;
  setTextValue:React.Dispatch<SetStateAction<string>>;

};

function SingleToDo({
  className,
  text,
  isCompleted,
  deleteTodo,
  d,
  handelIsTodoCompleted,
  editModeId,
  textValue,
  saveEditTodo,
  editTodo,
  setTextValue
}: Props) {
  return (
    <div
      className={cn(
        "px-5 w-full flex gap-3 items-center h-[6.5vh] text-sm border-b border-b-zinc-800    dark:border-b-zinc-500  "
      )}
    >
      {/* single todo */}
      <button onClick={() => handelIsTodoCompleted(d)}>
        <CheckBox isCompleted={isCompleted} />
      </button>

      <div className="flex justify-between h-full items-center w-full">
        {/* butons */}
        {editModeId === d.id ? (
          <div className="w-full flex h-full  ">
            <input
              type="text"
              className="w-full h-full  bg-inherit outline-none "
              value={textValue}
              onChange={(e)=> setTextValue(e.target.value)}

            />

            <button
              onClick={saveEditTodo}
              className="bg-zinc-800 text-white scale-[80%] px-4 py-2 rounded-md "
            >
              Save
            </button>
          </div>
        ) : (
          <>
            <p
              className={cn("dark:text-zinc-300", {
                "line-through": isCompleted,
              })}
            >
              {text}
            </p>

            <div className="flex gap-4 items-center">
              <MdEdit
                onClick={() => editTodo(d.id)}
                className="cursor-pointer text-xl"
              />
              <MdDelete
                onClick={() => deleteTodo(d.id)}
                className="cursor-pointer text-xl"
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default SingleToDo;
