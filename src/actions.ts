import sdk from "@stackblitz/sdk";

import { pickFile, pickFiles } from "./pick-files";
import { testProject } from "./test-project";

const win = window as any;

export async function main(origin?: string) {
  const project = testProject();

  /* 
  sdk.openProjectId('nextjs', {
    origin,
    openFile: "test/again=again/for sure.txt,style.css",
  });
  */

  /*
  sdk.openProject(project, {
    newWindow: false,
    origin,
    openFile: pickRandomFiles(Object.keys(project.files)),
  });
  */

  const vm = await sdk.embedProject("embed", project, {
    origin,
    openFile: "package.json",
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
    await vm.editor.openFile(pickFile(Object.keys(files)));
    console.log("openFile done");
  };

  win.openFiles = async () => {
    const files = await vm.getFsSnapshot();
    if (!files) return;
    await vm.editor.openFile(pickFiles(Object.keys(files)));
    console.log("openFiles done");
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
