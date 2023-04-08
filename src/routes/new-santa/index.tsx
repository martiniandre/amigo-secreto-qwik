import { component$, useTask$ } from "@builder.io/qwik";
import { type DocumentHead, Form, routeAction$, z, zod$ } from "@builder.io/qwik-city";
import CodeModal from "~/components/CodeModal";
import { useModal } from "~/hooks/useModal";


interface IUser {
  id: string
  maxPrizeValue: number
  name: string
  poolDate: Date
  code: string
}


export const useNewSanta = routeAction$(
  async (actions) => {
    const response = await fetch("http://localhost:3333/pool", {
      method: "POST",
      body: JSON.stringify(actions),
      headers: {
        "Content-Type": "application/json",
        "Authorization": "23dfd703-1c6c-42db-9b84-8ee8e2911eaf"
      },
    })
    const data = await response.json() as IUser
    return data
  }, zod$({
    name: z.string().nonempty().min(2, { message: 'Must be at least 2 characters' }),
    maxPrizeValue: z.string().regex(/^\d+$/, "Insert a valid amount").transform((number) => Number(number)),
    poolDate: z.coerce.date(),
  }))


export default component$(() => {
  const action = useNewSanta()
  const { onOpen, onClose, isOpen } = useModal()

  useTask$(async ({ track }) => {
    const data = track(() => action.value);
    if (!data || data?.failed) return
    onOpen()
  });

  return (
    <>
      <section class="h-full flex items-center m-auto gap-4 justify-center max-w-lg">
        <Form action={action} class="flex flex-col gap-7 w-full max-w-lg p-8 bg-slate-800 rounded-xl">
          <h1 class="text-xl text-white mb-3">Create Santa</h1>
          <div>
            <input name="name" type="text" placeholder="name" class="border rounded-lg w-full border-black p-3 text-sm placeholder:text-sm focus-within:border-white focus-within:border-2" />
            {action.value?.fieldErrors?.name && action.value?.fieldErrors?.name.map((message) => <p class="text-red-700 mt-1 text-xs" key={message}>{message}</p>)}
          </div>
          <div>
            <input name="maxPrizeValue" type="number" placeholder="max prize value" class="border rounded-lg w-full border-black p-3 text-sm placeholder:text-sm focus-within:border-white focus-within:border-2" />
            {action.value?.fieldErrors?.maxPrizeValue && action.value?.fieldErrors?.maxPrizeValue.map((message) => <p class="text-red-700 mt-1 text-xs" key={message}>{message}</p>)}
          </div>
          <div>
            <input name="poolDate" type="date" placeholder="poolDate" class="border rounded-lg w-full border-black p-3 text-sm placeholder:text-sm focus-within:border-white focus-within:border-2" />
            {action.value?.fieldErrors?.poolDate && action.value?.fieldErrors?.poolDate.map((message) => <p class="text-red-700 mt-1 text-xs" key={message}>{message}</p>)}
          </div>
          <button type="submit" class="transition-all duration-500 rounded-lg p-3 text-sm bg-blue-700 text-white hover:bg-blue-600">create</button>
        </Form>
      </section>
      <CodeModal onClose$={onClose} isOpen={isOpen.open} code={action.value?.code} />
    </>
  )
})

export const head: DocumentHead = {
  title: 'New Santa',
};
