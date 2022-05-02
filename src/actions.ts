import sdk from "@stackblitz/sdk";

import { pickFile, pickFiles } from "./pick-files";
import { testProject } from "./test-project";

const win = window as any;

export async function main(origin?: string) {
  const project = testProject();

  let openFiles: string[] = ["package.json"];

  const vm = await sdk.embedProject("embed", project, {
    origin,
    openFile: openFiles,
    showSidebar: true,
  });

  win.setTheme = async (theme: any) => {
    await vm.editor.setTheme(theme);
    console.log("setTheme done");
  };

  win.setView = async (view: "default" | "editor" | "preview") => {
    await vm.editor.setView(view);
    console.log("setView done");
  };

  win.showSidebar = async (visible: boolean) => {
    await vm.editor.showSidebar(visible);
    console.log("showSidebar done");
  };

  win.openFile = async () => {
    const files = await vm.getFsSnapshot();
    if (!files) return;
    openFiles = [pickFile(Object.keys(files))];
    await vm.editor.openFile(openFiles);
    console.log("openFile done");
  };

  win.openFiles = async () => {
    const files = await vm.getFsSnapshot();
    if (!files) return;
    openFiles = pickFiles(Object.keys(files));
    await vm.editor.openFile(openFiles);
    console.log("openFiles done");
  };

  win.setCurrentFile = async () => {
    const filePath = pickFile(openFiles.map((f) => f.split(",")).flat());
    await vm.editor.setCurrentFile(filePath);
    console.log("setCurrentFile done: " + filePath);
  };

  win.getUrl = async () => {
    const result = await vm.preview.getUrl();
    console.log("getUrl done", result);
  };

  win.setUrl = async () => {
    const files = await vm.getFsSnapshot();
    if (!files) return;
    const file = pickFile(
      Object.keys(project.files).filter((f) => f.startsWith("public/"))
    ).replace("public/", "");

    const result = await vm.preview.setUrl(`/${file}`);
    console.log("setUrl done", result);
  };
}
