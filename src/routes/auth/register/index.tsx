import { component$ } from "@builder.io/qwik";
import { type DocumentHead, Form, Link, routeAction$, z, zod$ } from "@builder.io/qwik-city";


interface IData {
  name: string
  id: string
  email: string
}


export const useRegister = routeAction$(
  async (actions) => {
    const response = await fetch("http://localhost:3333/users/register", {
      method: "POST",
      body: JSON.stringify(actions),
      headers: {
        "Content-Type": "application/json"
      },
    })

    const data = await response.json() as IData
    return data
  }, zod$({
    name: z.string().nonempty().min(2, { message: 'Must be at least 2 characters' }),
    email: z.string().nonempty().min(2, { message: 'Must be at least 2 characters' }).email("This is not a valid email."),
    password: z.string().nonempty().min(2, { message: 'Must be at least 2 characters' }),
  }))


export default component$(() => {
  const action = useRegister()

  return (
    <section class="h-full flex items-center m-auto gap-4 justify-center max-w-lg">
      <Form action={action} class="flex flex-col gap-7 w-full p-8 bg-slate-800 rounded-xl">
        <h1 class="text-xl text-white mb-3">Welcome!!</h1>
        <div class="">
          <input name="name" placeholder="name" class="border rounded-lg w-full border-black p-3 text-sm placeholder:text-sm focus-within:border-white focus-within:border-2" />
          {action.value?.fieldErrors?.name && action.value?.fieldErrors?.name.map((message) => <p class="text-red-700 mt-1" key={message}>{message}</p>)}

        </div>
        <div class="">
          <input name="email" type="email" placeholder="email" class="border rounded-lg w-full border-black p-3 text-sm placeholder:text-sm focus-within:border-white focus-within:border-2" />
          {action.value?.fieldErrors?.email && action.value?.fieldErrors?.email.map((message) => <p class="text-red-700 mt-1" key={message}>{message}</p>)}
        </div>
        <div class="">
          <input name="password" type="password" placeholder="password" class="border rounded-lg w-full border-black p-3 text-sm placeholder:text-sm focus-within:border-white focus-within:border-2" />
          {action.value?.fieldErrors?.password && action.value?.fieldErrors?.password.map((message) => <p class="text-red-700 mt-1" key={message}>{message}</p>)}
        </div>
        <button type="submit" class="transition-all duration-500 rounded-lg p-3 text-sm bg-blue-700 text-white hover:bg-blue-600">Register</button>
        <Link href="/auth/login" class="text-blue-400 text-sm">Already have an account?</Link>
      </Form>
    </section >
  )
})

export const head: DocumentHead = {
  title: 'Register',
};
