import type { PropFunction } from "@builder.io/qwik";
import { $ } from "@builder.io/qwik";
import { component$ } from "@builder.io/qwik";
import { useModal } from "~/hooks/useModal";

interface ICodeModal {
  onClose$: PropFunction<() => void>
  isOpen?: boolean
  code: string | undefined
}

export default component$<ICodeModal>(({ onClose$, isOpen = false, code }) => {
  if (!isOpen) return null

  const handleClose = $(function handleClose() {
    onClose$?.();
  })

  return (
    <div class="fixed inset-0  backdrop-blur-sm w-full z-1 h-full flex items-center justify-center" >
      <div class="relative bg-white rounded-lg w-3/6 h-1/2 shadow max-w-md dark:bg-gray-700">
        <div class="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
            Code
          </h3>
          <button onClick$={handleClose} type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="defaultModal">
            <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
            <span class="sr-only">Close modal</span>
          </button>
        </div>
        <div class="p-6 space-y-6">
          <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
            {code}
          </p>
        </div>
      </div>
    </div>
  )
})
