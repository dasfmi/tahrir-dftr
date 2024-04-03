<script lang="ts">
  import FormatBar from "../FormatBar.svelte";
  import { transform, FormatType } from "../Transformer";
  import { get } from "svelte/store";
  import {
    activeFileIndex,
    currentFiles,
    display,
    editor,
    fontFamily,
    searchQuery,
  } from "../stores";
  import SearchBox from "../SearchBox.svelte";
  import Sidebar from "../components/sidebar/Sidebar.svelte";
  import { content } from "../stores";
  import StartScreen from "../components/StartScreen.svelte";
  import Editor from "./editor";
  import FileSystemDataSource from "../datasource/filesystem";
  import StatsBar from "../components/StatsBar.svelte";

  // const editor = new Editor(new FileSystemDataSource());
  const editorInstance = get(editor);

  // let text = "";
  let backdropText = "";
  let textarea: HTMLTextAreaElement;
  let displayArea: HTMLDivElement;

  activeFileIndex.subscribe(() => {
    // scroll back to top when user switches files
    if (textarea) {
      textarea.scrollTo(0, 0);
      textarea.focus();
    }
  });

  const onKeyDown = (e: KeyboardEvent) => {};

  const handleTransform = (action: FormatType) => {
    const { selectionStart: start, selectionEnd: end } = textarea;
    let transformedText = $content.slice(start, end);
    const { text: newText, cursorPosition } = transform(
      action,
      transformedText
    );

    content.set(
      `${$content.slice(0, start)}${newText}${$content.slice(end, $content.length)}`
    );
    textarea.focus();
    textarea.setSelectionRange(start + cursorPosition, start + cursorPosition);
  };

  searchQuery.subscribe((query) => {
    if (query) {
      backdropText = $content.replace(new RegExp(query, "g"), (match) => {
        return `<mark class="bg-yellow-200">${match}</mark>`;
      });
    } else {
      backdropText = "";
    }
  });
</script>

<section class="flex w-full h-screen overflow-clip">
  <Sidebar />
  {#if $currentFiles.length}
    <div class="flex flex-col w-full overflow-clip bg-white">
      <FormatBar format={handleTransform} />
      <div class="flex h-full">
        <div
          class="flex flex-col w-1/2 bg-white border-l border-gray-200 overflow-y-auto h-full"
        >
          <textarea
            class={`z-10  bg-transparent p-4 focus:outline-none text-lg text-gray-900 resize-none h-[100%] font-${$fontFamily} w-full`}
            autofocus
            rows="10"
            bind:this={textarea}
            bind:value={$content}
            on:keydown={onKeyDown}
            on:scroll={() => {
              displayArea.scrollTop = textarea.scrollTop;
            }}
            placeholder="ابدأ بالكتابة هنا ..."
          />
          <span class="flex-1" />
        </div>

        <div
          class={`w-1/2 bg-gray-100 p-4 flex flex-col overflow-y-auto font-${fontFamily} prose xl:prose-lg`}
          bind:this={displayArea}
          on:scroll={() => {
            textarea.scrollTop = displayArea.scrollTop;
          }}
        >
          {@html $display}
        </div>
      </div>
    </div>
  {:else}
    <StartScreen
      onOpenClicked={() => editorInstance.showPicker()}
      onOpenNewFile={() => editorInstance.openNewFile()}
    />
  {/if}
</section>

<StatsBar />
