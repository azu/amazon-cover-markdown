import { Head } from "$fresh/runtime.ts";
import { signal } from "@preact/signals";
import Markdown from "../islands/Markdown.tsx";
export default function Home() {
  return (
    <>
      <Head>
        <title>Amazon Cover Code</title>
      </Head>
      <Markdown></Markdown>
    </>
  );
}
