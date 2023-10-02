"use client";

import { useAppContext } from "../context/appState";
import { SubmitHandler, useForm } from "react-hook-form";

type Field = {
  type: string;
  name: string;
  placeholder: string;
  label: string;
  require: boolean;
}

const fields: Field[] = [{
  type: "text",
  name: "name",
  placeholder: "Name",
  label: "Name",
  require: true,
},
{
  type: "phone",
  name: "phone",
  placeholder: "Phone",
  label: "Phone",
  require: true
},
{
  type: "email",
  name: "email",
  placeholder: "Email",
  label: "Email",
  require: true,
},
{
  type: "text",
  name: "agentName",
  placeholder: "Agent Name",
  label: "Agent Name",
  require: false,
},
{
  type: "phone",
  name: "agentPhone",
  placeholder: "Agent Phone",
  label: "Agent Phone",
  require: false
},
{
  type: "email",
  name: "agentEmail",
  placeholder: "Agent Email",
  label: "Agent Email",
  require: false,
}]

export default function UserForm() {
  const { context, update } = useAppContext();

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>()

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log("form data", data)
    update({
      ...context,
      ...data
    })

    return
  }

  console.log(watch("example"))

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {fields.map((field: Field, index: number) => {
        return (<label className='block' key={`field_${index}`}>
          <span className='block text-sm font-medium text-slate-700'>{field.label}</span>
          <input
            {...register(field.name, { required: field.require, placeholder: field.placeholder, type: field.type })}
            type={field.type}
            required={field.require}
            className='mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
      focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
      disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
      invalid:border-pink-500 invalid:text-pink-600
      focus:invalid:border-pink-500 focus:invalid:ring-pink-500'
          />
        </label>)
      })}

      <label className='block w-full text-sm text-slate-500'><button type='submit'>Next</button></label>
    </form>
  )
}  
