import type { Datasource } from "./datasource";

export type ListedFile = FileSystemDirectoryHandle | FileSystemFileHandle

export default class FileSystemDataSource implements Datasource {

    async showPicker() {
        const resp = await window.showDirectoryPicker({
            mode: "readwrite",
        });

        const files: ListedFile[] = []

        console.log(await resp.values())
        for await (let entry of resp.values()) {
            // pick entry if its a markdown files
            console.log({entry})
            if (entry.name.endsWith(".md")) {
                files.push(entry);
            }
        }

        // set the first file as active
        return { kind: resp.kind, files, dir: resp }
    }

    async readFile(handle: FileSystemFileHandle) {
        const file = await handle.getFile();
        const content = await file.text();
        return content;
    }

    async writeFile(handle: FileSystemFileHandle, content: string) {
        const writable = await handle.createWritable();
        await writable.write(content);
        await writable.close();
    }
}