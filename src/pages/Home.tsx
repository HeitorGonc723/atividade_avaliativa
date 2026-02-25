import { Link } from "react-router-dom"

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="w-full max-w-5xl flex flex-col items-center">

        <div className="text-center mb-30">
          <h1 className="text-blue-600 text-7xl md:text-7xl font-bold mb-5">
            Seja bem-vindo ao UtilyManager
          </h1>

          <p className="text-blue-400 text-4xl md:text-4xl">
            Escolha uma opção
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 w-full">

          <Link
            to="/tasks"
            className="bg-white rounded-2xl shadow-md p-8 text-center hover:shadow-xl transition"
          >
            <h2 className="text-blue-500 text-3xl font-semibold mb-2">
              TaskMaster
            </h2>
            <p className="text-2xl text-blue-400">
              Adição, listagem e remoção de tarefas.
            </p>
          </Link>

          <Link
            to="/contacts"
            className="bg-white rounded-2xl shadow-md p-8 text-center hover:shadow-xl transition"
          >
            <h2 className="text-blue-500 text-3xl font-semibold mb-2">
              ConnectHub
            </h2>
            <p className="text-2xl text-blue-400">
              Cadastro de contatos.
            </p>
          </Link>

          <Link
            to="/finance"
            className="bg-white rounded-2xl shadow-md p-8 text-center hover:shadow-xl transition"
          >
            <h2 className="text-blue-500 text-3xl font-semibold mb-2">
              MoneyFlow
            </h2>
            <p className="text-2xl text-blue-400">
              Controle de Gastos.
            </p>
          </Link>

        </div>
      </div>
    </div>
  )
}