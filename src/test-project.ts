import type { Project } from "@stackblitz/sdk";

export function testProject() {
  const project: Project = {
    title: "My project",
    description: "",
    template: "html",
    files: {
      "index.html": `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="style.css" />
  </head>
  <body>
    <h1>Hey friends</h1>
  </body>
</html>`,
      "package.json": '{\n"name":"cool-stuff"\n}',
      "style.css": "body { color: orangered; }",
      "test/bar.json": "{}",
      "test/foo.txt": "Hey there",
    },
  };

  for (let i = Math.floor(Math.random() * 50); i > 0; i--) {
    const num = String(i).padStart(2, "0");
    project.files[`rand/${num}.txt`] = `File ${num}`;
  }

  return project;
}
