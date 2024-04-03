import { writable, readable } from "svelte/store";
import type { ListedFile } from "./datasource/filesystem";
import Editor from "./editor/editor";



export const fontFamily = writable("amiri");
export const searchQuery = writable("");

export const content = writable("");
export const display = writable("");

export const activeSidebarView = writable('documents')

export const currentDirectory = writable("")
export const currentFiles = writable<ListedFile[]>([])
export const activeFileIndex = writable<number|null>(null)

// stats
export const wordsCount = writable(0)
export const charsCount = writable(0)
export const linesCount = writable(0)


export const options = writable({
    autoSave: true
})

export const editor = readable(new Editor())
