import { FaCheck } from "react-icons/fa6";
import { cn } from "@/utils/cn";
import React from "react";

type Props = {
  className?: string;
  isCompleted?: boolean;
};

function CheckBox({ className, isCompleted = true }: Props) {
  return (
    <div
    className={cn(
      "h-5 w-5 min-w-5 min-h-5  border border-white rounded-full flex items-center justify-center cursor-pointer",
      isCompleted ? "bg-blue-500" : "dark:bg-zinc-700 bg-zinc-400",
      className
    )}
  >
      {isCompleted && <FaCheck className="text-[12px] dark:text-white text-white" />}
    </div>
  );
}

export default CheckBox;
