
import { get } from 'svelte/store'
import markdownit from "markdown-it";
import type { Datasource } from "../datasource/datasource"
import FileSystem from "../datasource/filesystem"
import { activeFileIndex, charsCount, content, currentDirectory, currentFiles, display, linesCount, options, wordsCount } from "../stores"

export type Tab = {
    index: number;
    title: string;
    fileIndex: number | null;
}

export default class Editor {

    currentFileHandle: FileSystemFileHandle | null = null
    tabs: Tab[] = []
    activeTabIndex: number | null = null;

    constructor(public ds: Datasource = new FileSystem()) {
        const md = markdownit('commonmark', {
            html: true,
            linkify: true,
            typographer: true,
            breaks: true,
        });

        activeFileIndex.subscribe(async (index) => {
            if (index == null) {
                // clear content
                this.currentFileHandle = null;
                content.set('')
                return
            };


            const files = get(currentFiles)
            console.log(files, index)
            const file = files[index]
            if (file && file.kind === 'file') {
                this.currentFileHandle = file
                const text = await this.ds.readFile(file)
                content.set(text)
            }
        })

        content.subscribe(async (value) => {
            // what to do when content changes
            wordsCount.set(
                value.length === 0 ? 0 : value.split(" ").length
            );
            charsCount.set(value.replace(' ', '').length);
            linesCount.set(value.length === 0 ? 0 : value.split("\n").length);
            display.set(md.render(value));

            // save file
            const opts = get(options)
            if (this.currentFileHandle && opts.autoSave) {
                ds.writeFile(this.currentFileHandle, value)
            }
        })
    }

    async showPicker() {
        const { files, dir } = await this.ds.showPicker()
        currentFiles.set([...files])
        activeFileIndex.set(0)
        // read file
        if (files.length && files[0].kind === 'file') {
            this.currentFileHandle = files[0];
            const text = await this.ds.readFile(files[0])
            content.set(text)
        }
    }

    async showMarkdownCheatSheet() {
        const f = await fetch('/markdown-cheatsheet.md')
        const text = await f.text()
        content.set(text)
        activeFileIndex.set(null)
    }

    async openNewFile() {
        // this.tabs.push({
        //     index: this.tabs.length,
        //     title: 'مستند جديد',
        //     fileIndex: null
        // })
        // const fs = new FileSystemFileHandle()
        // content.set('')
        // activeFileIndex.set(get(currentFiles).length - 1)
        // this.activeTabIndex = this.tabs.length - 1
        try {
            const file = await window.showSaveFilePicker()
            currentFiles.update(files => [...files, file])
            content.set('')
            activeFileIndex.set(get(currentFiles).length - 1)
        } catch (e) { }
    }

}
