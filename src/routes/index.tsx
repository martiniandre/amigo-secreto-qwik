import { component$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';

export default component$(() => {
  return (
    <h1>Main Page</h1>
  );
});

export const head: DocumentHead = {
  title: 'Home page',
  meta: [
    {
      name: 'description',
      content: 'Home page',
    },
  ],
};
