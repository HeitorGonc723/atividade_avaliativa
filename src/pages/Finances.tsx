import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { financeSchema } from "../schemas/financeSchema"
import type { financeFormData } from "../schemas/financeSchema"

type Finance = {
  id: number
  description: string
  amount: number
  type: "income" | "expense"
  date: string
}

export default function Finances() {
  const [items, setItems] = useState<Finance[]>(() => {
    const storedItems = localStorage.getItem("finances")
    return storedItems ? JSON.parse(storedItems) : []
  })

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<financeFormData>({
    resolver: zodResolver(financeSchema),
  })

  const onSubmit = (data: financeFormData) => {
    const item: Finance = {
      id: Date.now(),
      description: data.description,
      amount: Number(data.amount),
      type: data.type,
      date: data.date,
    }

    setItems((prevItems) => [...prevItems, item])
    reset()
  }

  const removeItem = (id: number) => {
    setItems((prevItems) =>
      prevItems.filter((item) => item.id !== id)
    )
  }

  useEffect(() => {
    localStorage.setItem("finances", JSON.stringify(items))
  }, [items])

  const balance = items.reduce((total, item) => {
    return item.type === "income"
      ? total + item.amount
      : total - item.amount
  }, 0)

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center p-10">
      <div className="w-full max-w-2xl">
        <h1 className="text-3xl font-medium text-blue-500 mb-2 text-center">
          MoneyFlow
        </h1>

        <p className="text-center text-lg font-semibold text-blue-500 mb-8">
          Valor total no caixa: R$ {balance}
        </p>

        <div className="bg-white rounded-2xl shadow-md p-8">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <input
              type="text"
              placeholder="Descrição"
              {...register("description")}
              className="border rounded-lg p-3"
            />
            {errors.description && (
              <p className="text-red-500 text-sm">
                {errors.description.message}
              </p>
            )}

            <input
              type="text"
              placeholder="Valor"
              {...register("amount")}
              className="border rounded-lg p-3"
            />
            {errors.amount && (
              <p className="text-red-500 text-sm">
                {errors.amount.message}
              </p>
            )}

            <select
              {...register("type")}
              className="border rounded-lg p-3"
            >
              <option value="">Tipo</option>
              <option value="income">Entrada</option>
              <option value="expense">Saída</option>
            </select>
            {errors.type && (
              <p className="text-red-500 text-sm">
                {errors.type.message}
              </p>
            )}

            <input
              type="date"
              {...register("date")}
              className="border rounded-lg p-3"
            />
            {errors.date && (
              <p className="text-red-500 text-sm">
                {errors.date.message}
              </p>
            )}

            <button
              type="submit"
              className="w-full bg-blue-500 text-white rounded-lg p-3 hover:opacity-90"
            >
              Adicionar
            </button>
          </form>

          <ul className="mt-10 flex flex-col gap-4">
            {items.map((item) => (
              <li
                key={item.id}
                className="flex justify-between items-center bg-gray-50 px-4 py-3 rounded-xl"
              >
                <div>
                  <p className="font-medium text-gray-800">
                    {item.description}
                  </p>
                  <p className="text-sm text-gray-500">
                    {item.type === "income" ? "Entrada" : "Saída"} • R$ {item.amount} • {item.date}
                  </p>
                </div>

                <button
                  onClick={() => removeItem(item.id)}
                  className="bg-blue-500 text-white px-3 py-1 rounded-lg"
                >
                  Remover
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}