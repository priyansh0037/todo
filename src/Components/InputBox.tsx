import { AiOutlineEnter } from "react-icons/ai";
import React, { SetStateAction } from "react";
import CheckBox from "./CheckBox";
import { cn } from "@/utils/cn";

type Props = {
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement> | undefined;
  onSubmit: React.FormEventHandler<HTMLFormElement> | undefined;
  setIsTodoCompleted: React.Dispatch<SetStateAction<boolean>>;
  isTodoCompleted: boolean;
  isCheckBoxDisabled: boolean;
  
};

function InputBox({
  value,
  onChange,
  onSubmit,
  isTodoCompleted,
  setIsTodoCompleted,
  isCheckBoxDisabled,
  
}: Props) {
  function toggleCompleted() {
    setIsTodoCompleted(!isTodoCompleted);
  }

  return (
    <form onSubmit={onSubmit} className="w-full relative flex items-center">
      <button
        type="button"
        disabled={isCheckBoxDisabled}
        onClick={toggleCompleted}
        className="absolute left-5"
      >
        <CheckBox
          className={cn({
            "border dark:border-white border-gray-100 cursor-not-allowed":
              isCheckBoxDisabled,
          })}
          isCompleted={isTodoCompleted}
        />
      </button>

      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder="Enter Your Task"
        className="w-full h-[6vh] dark:bg-zinc-700 shadow-md bg-zinc-100 rounded-md focus-within:outline outline-none px-14"
      />

      <button className="absolute right-7">
        <AiOutlineEnter />
      </button>
    </form>
  );
}

export default InputBox;
