<script lang="ts">
  import { FormatType } from "./Transformer";
  import DropDown from "svelte-icons/md/MdArrowDropDown.svelte";
  import CodeIcon from "svelte-icons/md/MdCode.svelte";
  import ImageIcon from "svelte-icons/md/MdImage.svelte";
  import LinkIcon from "svelte-icons/md/MdLink.svelte";
  import QuoteIcon from "svelte-icons/md/MdFormatQuote.svelte";
  import FontSelector from "./FontSelector.svelte";
  import SearchBox from "./SearchBox.svelte";

  export let format: (action: FormatType) => void;
</script>

<div
  class="row border border-gray-300 bg-gray-200 mx-auto w-full px-4 py-2 flex gap-4 text-gray-500 shadow text-sm"
>
  <div class="flex gap-2 items-center">
    <button on:click={() => format(FormatType.h1)}>عنوان 1</button>
    <div class="w-6">
      <DropDown />
    </div>
  </div>
  <div class="text-gray-300">|</div>
  <button on:click={() => format(FormatType.bold)}><strong>عريض</strong></button
  >
  <button on:click={() => format(FormatType.italic)}><i>مائل</i></button>
  <button on:click={() => format(FormatType.stroke)}><del>مشطوب</del></button>
  <div class="text-gray-300">|</div>
  <button on:click={() => format(FormatType.link)} class="w-6"
    ><LinkIcon /></button
  >
  <button on:click={() => format(FormatType.image)} class="w-6"
    ><ImageIcon /></button
  >
  <button on:click={() => format(FormatType.code)} class="w-6"
    ><CodeIcon /></button
  >
  <button on:click={() => format(FormatType.quote)} class="w-6"
    ><QuoteIcon /></button
  >
  <span class="flex-1" />
  <FontSelector />
</div>

<style>
  .icon {
    @apply w-4;
  }
</style>
