<script lang="ts">
  import { searchQuery } from "./stores";
</script>

<input
  class="border rounded-lg px-4 py-1 bg-gray-100 focus:outline-none"
  placeholder="البحث"
  on:change={(e) => searchQuery.set(e.currentTarget.value)}
/>
