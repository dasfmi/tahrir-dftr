import type { ListedFile } from "./filesystem";

export interface Datasource {
    showPicker(): Promise<{ files: ListedFile[], dir: FileSystemDirectoryHandle }>;
    readFile(handle: FileSystemFileHandle): Promise<string>;
    writeFile(handle: FileSystemFileHandle, content: string): Promise<void>;
}
