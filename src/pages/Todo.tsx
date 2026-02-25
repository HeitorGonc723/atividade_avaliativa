import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { taskSchema } from "../schemas/todoSchema"
import type { TaskFormData } from "../schemas/todoSchema"
import { Input } from "../components/Input"
import { Button } from "../components/Button"

type Task = {
  id: number
  title: string
  category: string
  done: boolean
}

export default function TaskMaster() {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const storedTasks = localStorage.getItem("tasks")
    return storedTasks ? JSON.parse(storedTasks) : []
  })

  const form = useForm<TaskFormData>({
    resolver: zodResolver(taskSchema),
  })

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = form

  const onSubmit = (data: TaskFormData) => {
    const task: Task = {
      id: Date.now(),
      title: data.title,
      category: data.category,
      done: false,
    }

    setTasks((prevTasks) => [...prevTasks, task])
    reset()
  }

  const removeTask = (id: number) => {
    setTasks((prevTasks) =>
      prevTasks.filter((task) => task.id !== id)
    )
  }

  const toggleDone = (id: number) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task
      )
    )
  }

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks))
  }, [tasks])

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center p-10">
      <div className="w-full max-w-2xl">
        <h1 className="text-3xl font-medium text-blue-500 mb-8">
          TaskMaster
        </h1>

        <div className="bg-white rounded-2xl shadow-md p-8">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <Input
              placeholder="Nome da tarefa"
              {...register("title")}
              error={errors.title?.message}
            />

            <select
              className="px-3 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...register("category")}
            >
              <option value="">Selecione o tipo de tarefa</option>
              <option value="Profissional">Profissional</option>
              <option value="Pessoal">Pessoal</option>
              <option value="Urgente">Urgente</option>
            </select>

            {errors.category && (
              <p className="text-red-500 text-sm">
                {errors.category.message}
              </p>
            )}

            <Button
              type="submit"
              className="w-full bg-blue-500 text-white hover:opacity-90"
            >
              Adicionar tarefa
            </Button>
          </form>

          <ul className="mt-10 flex flex-col gap-4">
            {tasks.map((task) => (
              <li
                key={task.id}
                className="flex justify-between items-center bg-gray-50 px-4 py-3 rounded-xl"
              >
                <span
                  className={`text-gray-800 ${
                    task.done ? "line-through opacity-60" : ""
                  }`}
                >
                  <strong className="font-medium">
                    {task.title}
                  </strong>{" "}
                  <span className="text-gray-500 text-sm">
                    {task.category}
                  </span>
                </span>

                <div className="flex gap-2">
                  <Button
                    onClick={() => toggleDone(task.id)}
                    className="bg-blue-500 text-white px-3 py-1"
                  >
                    ✓
                  </Button>

                  <Button
                    onClick={() => removeTask(task.id)}
                    className="bg-gray-300 text-gray-800 px-3 py-1"
                  >
                    ✕
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}