import { electronAPI } from "@electron-toolkit/preload";
import { contextBridge } from "electron";

const api = {};

if (process.contextIsolated) {
	try {
		contextBridge.exposeInMainWorld("electron", electronAPI);
		contextBridge.exposeInMainWorld("api", api);
	} catch (error) {
		console.error(error);
	}
} else {
	// @ts-expect-error
	window.electron = electronAPI;
	// @ts-expect-error
	window.api = api;
}
