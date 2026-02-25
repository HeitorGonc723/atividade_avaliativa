import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { contactSchema, type ContactFormData } from "../schemas/contactSchema"
import { Input } from "../components/Input"
import { Button } from "../components/Button"

type Contact = ContactFormData & {
  id: number
}

export default function Contacts() {
  const [contacts, setContacts] = useState<Contact[]>(() => {
    const storedContacts = localStorage.getItem("contacts")
    return storedContacts ? JSON.parse(storedContacts) : []
  })

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  })

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = form

  const onSubmit = (data: ContactFormData) => {
    const contact: Contact = {
      id: Date.now(),
      ...data,
    }

    setContacts((prevContacts) => [...prevContacts, contact])
    reset()
  }

  const removeContact = (id: number) => {
    setContacts((prevContacts) =>
      prevContacts.filter((contact) => contact.id !== id)
    )
  }

  useEffect(() => {
    localStorage.setItem("contacts", JSON.stringify(contacts))
  }, [contacts])

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center p-10">
      <div className="w-full max-w-2xl">
        <h1 className="text-3xl font-medium text-blue-500 mb-8">
          ConnectHub
        </h1>

        <div className="bg-white rounded-2xl shadow-md p-8">
          <form
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className="flex flex-col gap-4"
          >
            <Input
              placeholder="Nome completo: "
              {...register("name")}
              error={errors.name?.message}
            />

            <Input
              placeholder="Email: "
              type="email"
              {...register("email")}
              error={errors.email?.message}
            />

            <Input
              placeholder="Telefone: (ex: 32999999999)"
              {...register("phone")}
              error={errors.phone?.message}
            />

            <Button
              type="submit"
              className="w-full bg-blue-500 text-white hover:opacity-90"
            >
              Adicionar
            </Button>
          </form>

          <ul className="mt-10 flex flex-col gap-4">
            {contacts.map((contact) => (
              <li
                key={contact.id}
                className="flex justify-between items-center bg-gray-50 px-4 py-3 rounded-xl"
              >
                <div>
                  <div className="font-medium text-gray-800">
                    {contact.name}
                  </div>
                  <div className="text-sm text-gray-500">
                    {contact.email}
                  </div>
                  <div className="text-sm text-gray-500">
                    {contact.phone}
                  </div>
                </div>

                <Button
                  onClick={() => removeContact(contact.id)}
                  className="bg-blue-500 text-white px-3 py-1"
                >
                  Remover
                </Button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}