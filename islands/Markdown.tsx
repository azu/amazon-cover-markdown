import { computed, Signal, signal } from "@preact/signals";

export type MarkdownProps = {
  amazonUrl: string;
};
const createASIN = (url: string) => {
  // https://www.amazon.co.jp/dp/4048930737/
  const ASIN = url.replace(/^.*\/dp\/(\w+).*$/, "$1");
  return ASIN;
};
const createMarkdownCode = (ASIN: string) => {
  if (!ASIN) {
    return;
  }
  return `[![Cover Image](https://images-na.ssl-images-amazon.com/images/P/${ASIN}.MZZZZZZZ)](https://www.amazon.co.jp/dp/${ASIN}/)`;
};
const Preview = (props: { ASIN: string }) => {
  if (!props.ASIN) {
    return null;
  }
  return (
    <a href={`https://www.amazon.co.jp/dp/${props.ASIN}/`}>
      <img
        src={`https://images-na.ssl-images-amazon.com/images/P/${props.ASIN}.MZZZZZZZ`}
        alt="cover image"
      />
    </a>
  );
};
const input = signal("");
export const Form = () => {
  return (
    <div>
      <form
        onSubmit={(event) => event.preventDefault()}
        class="md:flex shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500
        "
      >
        <div class="md:w-1/4">
          <label
            for="amazon-url"
            class="block font-bold md:text-right mb-1 md:mb-0 p-1 pr-4"
          >
            Amazon URL:
          </label>
        </div>
        <div class="md:w-3/4">
          <input
            type="url"
            id="amazon-url"
            class="rounded w-full text-black p-1"
            value={input.value}
            placeholder="https://www.amazon.co.jp/dp/4048930737/"
            onInput={(event) => {
              input.value = event.currentTarget.value;
            }}
          >
          </input>
        </div>
      </form>
    </div>
  );
};

export default function Markdown(props: { amazonUrl?: string }) {
  const ASIN = computed(() => createASIN(props.amazonUrl ?? input.value));
  const markdown = computed(() => {
    return createMarkdownCode(ASIN.value);
  });
  const onClick = () => {
    if (markdown.value) {
      navigator.clipboard.writeText(markdown.value);
    }
  };
  return (
    <div>
      <Form></Form>
      <div className="flex">
        <pre
          onClick={onClick}
          class="break-all whitespace-pre-line bg-gray-50 p-4"
        >      {markdown.value}
        </pre>
      </div>
      <div class="flex">
        <Preview ASIN={ASIN.value}></Preview>
      </div>
    </div>
  );
}
