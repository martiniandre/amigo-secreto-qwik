import { $, useSignal, useStore } from "@builder.io/qwik"

export function useModal() {
  const isOpen = useStore({
    open: false
  })

  const onClose = $(function onClose() {
    isOpen.open = false;
  });

  const onOpen = $(function onOpen() {
    isOpen.open = true;
  });

  return {
    isOpen: isOpen,
    onClose,
    onOpen
  }
}