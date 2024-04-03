<script lang="ts">
  import { fontFamily } from "./stores";

  const changeFontFamily = (e: Event) => {
    const select = e.target as HTMLSelectElement;
    const value = select.value;
    fontFamily.set(value);
  };
</script>

<select on:change={changeFontFamily} class="rounded-lg border bg-gray-100 focus:outline-none">
  <option value="amiri">أميري</option>
  <option value="ibm-plex-sans-arabic">IBM Plex Sans Arabic</option>
  <option value="rubik">Rubik</option>
  <option value="vazirmatn">Vazirmatn</option>
</select>
