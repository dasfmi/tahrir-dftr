<script lang="ts">
  import NewFileIcon from "svelte-icons/ti/TiDocumentAdd.svelte";
  import FolderOpenIcon from "svelte-icons/ti/TiFolderOpen.svelte";

  export let onOpenClicked: () => void;
  export let onOpenNewFile: () => void;
</script>

<div id="start" class="flex flex-col bg-neutral-50 w-full px-24 py-24">
  <h1 class="text-4xl text-gray-900">دفتر - مُحرر النصوص العربي</h1>
  <p class="text-2xl mt-4 text-gray-500">اُكتب العربية بسلاسة</p>

  <div class="flex mt-12">
    <section class="w-1/2 flex flex-col gap-4">
      <h4 class="text-xl text-gray-600">إبدأ</h4>
      <button class="action" on:click={onOpenNewFile}>
        <div class="w-6"><NewFileIcon /></div>
        <span>ملف جديد</span>
      </button>

      <button class="action" on:click={onOpenClicked}>
        <div class="w-6"><FolderOpenIcon /></div>
        <span>افتح ملف</span>
      </button>
    </section>

    <section class="w-1/2 flex flex-col">
      <h1 class="text-xl text-gray-800">المميزات</h1>
      <p class="text-lg mt-4 text-gray-500">
        اُكتب العربية من اليمين لليسار دون عناء
      </p>
    </section>
  </div>
</div>

<style>
  .action {
    @apply flex gap-2 text-gray-800 items-center text-lg;
  }
</style>
