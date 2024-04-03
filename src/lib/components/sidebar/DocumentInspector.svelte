<script lang="ts">
  import { get } from 'svelte/store'
  import { content, display, editor } from "../../stores"

  type Title = { title: string; indentation: number, tag: 'h1'|'h2'|'h3'|'h4'|'h5'|'h6' };
  let titles: Title[] = [];

  $: {
    titles = []
    for (const line of $content.split("\n")) {
      if (line.startsWith("######")) {
        titles.push({ indentation: 6, title: line.replace("###### ", ""), tag: "h6" });
      } else if (line.startsWith("#####")) {
        titles.push({ indentation: 5, title: line.replace("##### ", ""), tag: "h5" });
      } else if (line.startsWith("####")) {
        titles.push({ indentation: 4, title: line.replace("#### ", ""), tag: "h4" });
      } else if (line.startsWith("###")) {
        titles.push({ indentation: 3, title: line.replace("### ", ""), tag: "h3" });
      } else if (line.startsWith("##")) {
        titles.push({ indentation: 2, title: line.replace("## ", ""),  tag: "h2" });
      } else if (line.startsWith("#")) {
        titles.push({ indentation: 1, title: line.replace("# ", ""), tag: "h1"});
      }
    }
  }

  const jumpToHeading = (index: number) => {
    const editorInstance = get(editor);
    const selectedTitle = titles[index];


    // find the selected title in the content
    const title = selectedTitle.title;
    Array.from(document.querySelectorAll(`${selectedTitle.tag}`)).
      filter((el) => el.textContent === title)[0].
      scrollIntoView({
        block: "center"
      });
  };
</script>

<section class="h-full flex flex-col items-start text-nowrap overflow-x-auto">
  {#each titles as title, index}
    <button class={`title title-${title.indentation}`} on:click={() => jumpToHeading(index)}>
      {title.title}
    </button>{/each}
</section>

<style>
  .title {
    @apply py-1.5 text-gray-600 hover:text-black cursor-pointer;
  }
  .title-1 {
    font-size: 21px;
    font-weight: 300;
    padding-right: 8px;
  }
  .title-2 {
    font-size: 18px;
    font-weight: 300;
    padding-right: 21px;
  }
  .title-3 {
    font-size: 16px;
    font-weight: 300;
    padding-right: 32px;
  }
  .title-4 {
    font-size: 14px;
    font-weight: 300;
    padding-right: 42px;
  }
  .title-5 {
    font-size: 12px;
    font-weight: 300;
    padding-right: 56px;
  }
  .title-6 {
    font-size: 11px;
    font-weight: 300;
    padding-right: 64px;
  }
</style>
