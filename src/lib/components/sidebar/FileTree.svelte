<script lang="ts">
  import { activeFileIndex, content, currentFiles } from "../../stores";
  import FileIcon from "svelte-icons/fa/FaFile.svelte";

  const handleFileSelected = async (index: number) => {
    activeFileIndex.set(index);
    const f = await ($currentFiles[index] as FileSystemFileHandle).getFile();

    content.set(await f.text());
  };
</script>

<div
  class="flex flex-col gap-2 items-start list-none h-full overflow-auto text-nowrap"
>
  {#each $currentFiles as file, index}
    <div
      class={`items-start text-start hover:bg-gray-400/20 hover:text-gray-950 w-full ${$activeFileIndex === index ? "bg-gray-200" : ""} `}
    >
      <button
        class="inline-flex px-4 py-1 w-full text-start items-center text-sm"
        on:click={() => handleFileSelected(index)}
      >
        <span class="w-4 text-red-400"><FileIcon /></span>
        {file.name}
      </button>
    </div>
  {/each}
</div>
