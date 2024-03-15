<script lang="ts">
  import markdownit from "markdown-it";
  import { afterUpdate, beforeUpdate } from "svelte";
  import FormatBar from "./FormatBar.svelte";
  import { transform, FormatType } from "./Transformer";
  const md = markdownit({
    html: true,
    linkify: true,
    typographer: true,
  });

  let text = "";
  let textarea: HTMLTextAreaElement;
  let display = "";
  let selectionStart = 0;
  let selectionEnd = 0;
  let charsCount = 0;
  let wordsCount = 0;
  let linesCount = 0;

  $: {
    wordsCount = text.length === 0 ? 0 : text.split(" ").length;
    charsCount = text.length;
    linesCount = text.length === 0 ? 0 : text.split("\n").length;
    display = md.render(text);
  }

  beforeUpdate(() => {
    if (textarea) {
      ({ selectionStart, selectionEnd } = textarea);
    }
  });

  afterUpdate(() => {
    textarea.setSelectionRange(selectionStart, selectionEnd);
    textarea.focus();
  });

  const format = (action: FormatType) => {
    const { selectionStart: start, selectionEnd: end } = textarea;
    let transformedText = text.slice(start, end);
    const {text: newText, delta, cursorPosition} = transform(action, transformedText);

    text = `${text.slice(0, start)}${newText}${text.slice(end, text.length)}`;
    textarea.focus();
    textarea.setSelectionRange(start+cursorPosition, start+cursorPosition);
  };
</script>

<div class="flex h-screen w-screen overflow-y-auto">
  <div class="w-1/2 bg-gray-50 border-l border-gray-200 overflow-y-auto">
    <div class="fixed w-1/2">
        <FormatBar format={format} />
    </div>
    <textarea
      class="w-full bg-gray-50 p-4 focus:outline-none text-lg resize-none h-[100%] mt-14"
      autofocus
      rows="10"
      bind:this={textarea}
      bind:value={text}
      placeholder="إبدأ بالكتابة الآن ..."
    />
  </div>
  <div class="w-1/2 bg-white p-4 flex flex-col overflow-y-auto">
    <div class="fixed w-1/2 pl-8">
    <div
      class="flex gap-4 bg-[#f9f1d6] rounded-lg py-2 px-4 border-gray-100 shadow text-sm text-[#b2a277]"
    >
      <div>عدد الأحرف: {charsCount}</div>
      <div>عدد الكلمات: {wordsCount}</div>
      <div>عدد السطور: {linesCount}</div>
    </div>
    </div>
    <div class="py-2 prose-lg mt-12">
      {@html display}
    </div>
  </div>
</div>
