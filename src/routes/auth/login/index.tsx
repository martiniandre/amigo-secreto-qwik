import { component$ } from "@builder.io/qwik";
import { type DocumentHead, Form, Link, routeAction$, z, zod$ } from "@builder.io/qwik-city";


interface IUser {
  id: string
  email: string
  name: string
  token: string
}


export const useLogin = routeAction$(
  async (actions) => {
    const response = await fetch("http://localhost:3333/auth", {
      method: "POST",
      body: JSON.stringify(actions),
      headers: {
        "Content-Type": "application/json"
      },
    })
    const data = await response.json() as IUser
    return data
  }, zod$({
    email: z.string().nonempty().min(2, { message: 'Must be at least 2 characters' }).email("This is not a valid email."),
    password: z.string().nonempty().min(2, { message: 'Must be at least 2 characters' }),
  }))


export default component$(() => {
  const action = useLogin()

  return (
    <section class="h-full flex items-center m-auto gap-4 justify-center max-w-lg">
      <Form action={action} class="flex flex-col gap-7 w-full p-8 bg-slate-800 rounded-xl">
        <h1 class="text-xl text-white mb-3">Welcome back!!</h1>
        <div>
          <input name="email" type="email" placeholder="email" class="border rounded-lg w-full border-black p-3 text-sm placeholder:text-sm focus-within:border-white focus-within:border-2" />
          {action.value?.fieldErrors?.email && action.value?.fieldErrors?.email.map((message) => <p class="text-red-700 mt-1 text-xs" key={message}>{message}</p>)}
        </div>
        <div>
          <input name="password" type="password" placeholder="password" class="border rounded-lg w-full border-black p-3 text-sm placeholder:text-sm focus-within:border-white focus-within:border-2" />
          {action.value?.fieldErrors?.password && action.value?.fieldErrors?.password.map((message) => <p class="text-red-700 mt-1 text-xs" key={message}>{message}</p>)}
        </div>
        <button type="submit" class="transition-all duration-500 rounded-lg p-3 text-sm bg-blue-700 text-white hover:bg-blue-600">login</button>
        <Link href="/auth/register" class="text-blue-400 text-sm">Doesn't have an account?</Link>
      </Form>
    </section>
  )
})

export const head: DocumentHead = {
  title: 'Login',
};
