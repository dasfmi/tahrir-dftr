<script lang="ts">
  import FileTree from "./FileTree.svelte";
  import { get } from "svelte/store";
  import DocumentInspector from "./DocumentInspector.svelte";
  import DocumentsIcon from "svelte-icons/fa/FaRegClone.svelte";
  import HelpIcon from "svelte-icons/fa/FaRegQuestionCircle.svelte";
  import LayersIcon from "svelte-icons/md/MdLayers.svelte";
  import SettingsIcon from "svelte-icons/md/MdSettings.svelte";
  import { activeSidebarView, content, editor } from "../../stores";

  let showLabels = false;
  let showInteractor = true;
  let viewTitle = "تصفح";

  const editorInstance = get(editor);

  const switchView = (viewId: string) => {
    activeSidebarView.set(viewId);
    switch (viewId) {
      case "documentInspector":
        viewTitle = "بنية المستند";
        break;
      case "documents":
        viewTitle = "تصفح";
        break;
      case "search":
        viewTitle = "البحث";
        break;
      default:
        viewTitle = "استكشف";
        break;
    }
  };

  const shrinkNavigator = () => {
    // this.showLabels = false
    // this.showInteractor = true
  };

  const extendNavigator = () => {
    // this.showInteractor = false
    // this.showLabels = true
  };

  const toggleSidebar = () => {};

  const openMarkDownCheatsheet = async () => {
    editorInstance.showMarkdownCheatSheet();
  };
</script>

<aside
  id="sidebar"
  class="flex flex-row w-[20rem] h-full max-h-full overflow-y-auto"
>
  <section
    id="navigator"
    class="bg-neutral-100 border-l border-neutral-200 text-gray-400 flex flex-col gap-3"
  >
    {#if showLabels}
      <span class="">افتح ملف</span>
    {/if}
    <button
      on:click={() => switchView("documents")}
      class={`icon ${$activeSidebarView === "documents" ? "active" : ""}`}
    >
      <div class="w-6 mx-auto"><DocumentsIcon /></div>
      {#if showLabels}
        <span class="">المستندات</span>
      {/if}
    </button>

    <button
      on:click={() => switchView("documentInspector")}
      class={`icon ${$activeSidebarView === "documentInspector" ? "active" : ""}`}
    >
      <div class="w-8"><LayersIcon /></div>
      {#if showLabels}
        <span class="">بنية المستند</span>
      {/if}
    </button>

    <span class="flex-1" />

    <!-- <button
      on:click={openMarkDownCheatsheet}
      class={`icon ${$activeSidebarView === "settings" ? "active" : ""}`}
    >
      <div class="w-8"><HelpIcon /></div>
      {#if showLabels}
        <span class="">بنية المستند</span>
      {/if}
    </button>

    <button
      on:click={() => switchView("documentInspector")}
      class={`icon ${$activeSidebarView === "settings" ? "active" : ""}`}
    >
      <div class="w-8"><SettingsIcon /></div>
      {#if showLabels}
        <span class="">بنية المستند</span>
      {/if}
    </button> -->
  </section>

  {#if showInteractor}
    <section
      id="interactor"
      class="flex flex-col w-full h-full bg-neutral-100 border-l border-neutral-200 min-w-[160px]"
    >
      <div class="p-3 text-gray-500">
        {viewTitle}
      </div>

      {#if $activeSidebarView === "documents"}
        <FileTree />
      {:else if $activeSidebarView === "documentInspector"}
        <DocumentInspector />
      {/if}
    </section>
  {/if}
</aside>

<style>
  .active {
    @apply text-neutral-600 border-r-4 border-teal-600 bg-gray-400/20;
  }

  .icon {
    @apply p-3 w-full mx-auto  text-center inline-flex gap-4 text-gray-400 transition-all ease-in-out duration-300  hover:text-teal-600;
  }
</style>
