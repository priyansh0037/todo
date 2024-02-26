"use client";
import DarkLightBtn from "@/Components/DarkLightBtn";
import bgdesktopLight from "@/app/Assets/images/bg-desktop-light.jpg";
import { useTheme } from "next-themes";
import bgdesktopDark from "@/app/Assets/images/bg-desktop-dark.jpg";
import Image from "next/image";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import InputBox from "@/Components/InputBox";
import CheckBox from "@/Components/CheckBox";
import SingleToDo from "@/Components/SingleToDo";
import bgMobileLight from "@/app/Assets/images/bg-mobile-light.jpg";
import bgMobileDark from "@/app/Assets/images/bg-mobile-dark.jpg";
import { useState } from "react";
import { cn } from "@/utils/cn";
import { useDropzone } from "react-dropzone";
import { read } from "fs";

// import { useAtom } from 'jotai'
// import { atomWithStorage } from 'jotai/utils'


const sampleTodo: TodoType[] = [
  {
    id: 1,
    text: "Task 1",
    isCompleted: false,
  },
  {
    id: 2,
    text: "Task 2",
    isCompleted: true,
  },
  {
    id: 3,
    text: "Task 3",
    isCompleted: false,
  },
];


// const todoAtom = atomWithStorage('todos', sampleTodo)


export type TodoType = {
  id: number;
  text: string;
  isCompleted: boolean;
};

export default function Home() {

  // drag and drop

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (acceptedFiles: File[]) => {
      handelDrop(acceptedFiles); // Call handelDrop function with accepted files
    },
  });
  function handelDrop(acceptedFiles: File[]): void {
    acceptedFiles.forEach((file: File) => {
      const reader = new FileReader();
      reader.onload = () => {
        const fileContent: string | ArrayBuffer | null = reader.result;
        if (fileContent) {
          // Split the file content into separate lines
          const lines = fileContent.toString().split('\n');
  
          // Create a new todo for each line of the file content
          const newTodos: TodoType[] = lines.map((line, index) => ({
            id: todos.length + index + 1,
            text: line.trim(),
            isCompleted: false, // Set default completion status
          }));
  
          // Add the new todos to the todos state
          setTodos((prevTodos) => [...prevTodos, ...newTodos]);
  
          console.log("Dropped file content:", lines);
        }
      };
      reader.readAsText(file);
    });
  }
  
  const [animationParent] = useAutoAnimate();
  const [inputText, setInputText] = useState("");
  const [isTodoCompleted, setIsTodoCompleted] = useState(false);

// jotai

// const [darkMode, setDarkMode] = useAtom(darkModeAtom)


  // const [todos, setTodos] = useAtom<TodoType[]>(todoAtom);
  const [todos, setTodos] = useState<TodoType[]>(sampleTodo);



  const [editModeId, setEditModeId] = useState<number | null>(null);
  const [textValue, setTextValue] = useState("");

  // for filters
  const [todoState, setTodoState] = useState<"all" | "active" | "completed">(
    "all"
  );

  function handelSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (inputText.trim() !== "") {
      const isExistingTodo = todos.some((todo) => todo.text === inputText);
      if (isExistingTodo) {
        alert("this todo is alredy existed");
        setInputText("");
        setIsTodoCompleted(false);
        return null;
      }

      const newTodo: TodoType = {
        id: todos.length + 1,
        isCompleted: isTodoCompleted,
        text: inputText,
      };
      setTodos([...todos, newTodo]);
      setInputText("");
    }
  }

  function deleteTodo(id: number) {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    // jinki id match nhi kregi unko ye fn rerturn krega
    setTodos(updatedTodos);
  }

  function handelIsTodoCompleted(todo: TodoType) {
    const updatedTodo: TodoType[] = todos.map((d) => {
      if (todo == d) {
        return { ...d, isCompleted: !d.isCompleted };
      }
      return d;
    });

    setTodos(updatedTodo);
  }

  function editTodo(id: number) {
    setEditModeId(id);

    const todoEdit = todos.find((todo) => todo.id == id);
    if (todoEdit) {
      setTextValue(todoEdit.text);
    }
  }

  function saveEditTodo() {
    const updatedTodos = todos.map((todo) =>
      todo.id === editModeId ? { ...todo, text: textValue } : todo
    );
    setTodos(updatedTodos);
    setEditModeId(null);
  }

  // filtered data

  const completedTodos = todos.filter((d) => d.isCompleted);

  const activeTodos = todos.filter((d) => !d.isCompleted);
  // jo compelte todo ni ah wo retrunkrna ha

  //! clear complete todos

  function clearCompletedTodos() {
    const updatedTodos = todos.filter((todo) => !todo.isCompleted);
    // jitne bhi complete todo haunko chd kr sare item retrun hoinge

    setTodos(updatedTodos);
  }

  return (
    <div className="relative  w-full h-screen pt-20 ">
      <BackgroundImage />
      {/* main container */}

      <main className=" flex flex-col gap-10 max-w-[750px] w-full  mx-auto  ">
        <div className="flex justify-between items-center w-full sm:px-0 px-5">
          <h2 className="font-semibold text-4xl text-white tracking-widest">
            TODO
          </h2>

          {/*  icons */}
          <DarkLightBtn />
        </div>
        <section className="input w-full flex-col flex gap-3 sm:px-0 px-5 ">
          <InputBox
            isCheckBoxDisabled={inputText.length <= 0 ? true : false}
            isTodoCompleted={isTodoCompleted}
            setIsTodoCompleted={setIsTodoCompleted}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onSubmit={handelSubmit}
          />

          {/* "inputText.length" - {inputText.length}
{inputText.length <= 0 ? "disable" : "enabled"} */}

          {/* todo */}
          <div
            ref={animationParent}
            className="dark:bg-zinc-700 dark:text-white bg-zinc-100 text-zinc-900 w-full rounded-md dark:border dark:border-zinc-600 shadow-xl  dark:shadow-zinc-900 "
          >
            {/* for all */}
            {todoState === "all" &&
              todos.map((d, i) => (
                <SingleToDo
                  key={i}
                  editModeId={editModeId}
                  setTextValue={setTextValue}
                  textValue={textValue}
                  saveEditTodo={saveEditTodo}
                  editTodo={editTodo}
                  handelIsTodoCompleted={() => handelIsTodoCompleted(d)}
                  d={d}
                  deleteTodo={() => deleteTodo(d.id)}
                  isCompleted={d.isCompleted}
                  text={d.text}
                />
              ))}

            {/* for active */}

            {todoState === "active" &&
              activeTodos.map((d, i) => (
                <SingleToDo
                key={i}
                  editModeId={editModeId}
                  setTextValue={setTextValue}
                  textValue={textValue}
                  saveEditTodo={saveEditTodo}
                  editTodo={editTodo}
                  handelIsTodoCompleted={() => handelIsTodoCompleted(d)}
                  d={d}
                  deleteTodo={() => deleteTodo(d.id)}
                  isCompleted={d.isCompleted}
                  text={d.text}
                />
              ))}

            {/* "for completed " */}

            {todoState === "completed" &&
              completedTodos.map((d, i) => (
                <SingleToDo
                key={i}
                  editModeId={editModeId}
                  setTextValue={setTextValue}
                  textValue={textValue}
                  saveEditTodo={saveEditTodo}
                  editTodo={editTodo}
                  handelIsTodoCompleted={() => handelIsTodoCompleted(d)}
                  d={d}
                  deleteTodo={() => deleteTodo(d.id)}
                  isCompleted={d.isCompleted}
                  text={d.text}
                />
              ))}

            {/*Filters */}
            <div className="flex justify-between gap-2 px-6 h-[6vh] items-center dark:text-zinc-400 text-zinc-700 text-sm  font-semibold">
              <p className="text-[12px] w-fit sm:text-sm">
                {activeTodos.length}
              </p>

              <div className="flex text-[12px] sm:text-sm gap-5">
                <button
                  onClick={() => setTodoState("all")}
                  className={cn("", { "text-blue-500": todoState === "all" })}
                >
                  All
                </button>
                <button
                  onClick={() => setTodoState("active")}
                  className={cn("", {
                    "text-blue-500": todoState === "active",
                  })}
                >
                  Active
                </button>
                <button
                  onClick={() => setTodoState("completed")}
                  className={cn("", {
                    "text-blue-500": todoState === "completed",
                  })}
                >
                  Completed
                </button>
              </div>

              <button
                onClick={clearCompletedTodos}
                className="text-[12px] sm:text-sm leading-[14px] "
              >
                Clear Completed Todos
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* {/* drag and dros */}

      {/* we use dropzone library */}

      <div
    className=" fixed bottom-0 left-0 z-[999999] w-full cursor-pointer   text-white bg-zinc-200 dark:bg-zinc-800 px-4 py-6 flex items-center justify-center"
    {...getRootProps()}
  >
    <input {...getInputProps()} />
    {isDragActive ? (
      <p className="text-center text-white">Drop the files here ...</p>
    ) : (
      <div className="flex gap-2 flex-col">

      <p className="text-center sm:text-md text-sm text-zinc-400">
        Drag And Drop Some Files Here
      </p>
      
      <p className="text-center sm:text-md text-sm text-zinc-400">
      Or Click To Select Files     
       </p>

      </div>
      
    )}
  </div>
    </div>
  );
}

function BackgroundImage() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [animationParent] = useAutoAnimate();

  return (
    <div ref={animationParent} className="w-full absolute top-0 left-0 -z-10">
      {resolvedTheme === "light" ? (
        <>
          <Image
            className="w-full md:flex hidden "
            src={bgdesktopLight}
            alt="Bg light"
priority            
          />
          <Image
            className="w-full md:hidden"
            src={bgMobileLight}
            alt="Bg light"
            priority
          />
        </>
      ) : (
        <>
          <Image
            className="w-full md:flex hidden"
            src={bgdesktopDark}
            alt="Bg Dark"
            priority            

          />
          <Image
            className="w-full md:hidden "
            src={bgMobileDark}
            alt="Bg Dark"
            priority            

          />
        </>
      )}
    </div>
  );
}
