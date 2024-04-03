<script>

  import { charsCount, linesCount, wordsCount } from "../stores";

</script>

  <div
    class="flex gap-4 bg-[#f9f1d6] py-2 px-4 border-t border-gray-200 shadow text-sm text-end text-[#b2a277] items-end flex-row-reverse"
  >
    <div>عدد الأحرف: {$charsCount}</div>
    <div>عدد الكلمات: {$wordsCount}</div>
    <div>عدد السطور: {$linesCount}</div>
  </div>
