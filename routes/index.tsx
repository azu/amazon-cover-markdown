import { Head } from "$fresh/runtime.ts";
import { signal } from "@preact/signals";
import { Handlers, PageProps } from "$fresh/server.ts";
import Markdown from "../islands/Markdown.tsx";
interface Data {
  amazon?: string;
}
export const handler: Handlers<Data> = {
  GET(req, ctx) {
    const url = new URL(req.url);
    const amazon = url.searchParams.get("amazon") ?? undefined;
    return ctx.render({ amazon });
  },
};

export default function Home({ data }: PageProps<Data>) {
  return (
    <>
      <Head>
        <title>Amazon Cover Code</title>
      </Head>
      <div class="flex flex-col h-screen justify-between">
        <main class="mb-auto flex-grow">
          <Markdown amazonUrl={data.amazon}></Markdown>
        </main>
        <footer class="bg-gray-200 p-2 text-center text-xs">
          <a href="https://github.com/azu/amazon-cover-markdown">Source Code</a>
        </footer>
      </div>
    </>
  );
}
