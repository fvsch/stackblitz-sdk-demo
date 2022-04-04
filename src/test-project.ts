import type { Project } from "@stackblitz/sdk";

function html(title: string) {
  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width" />
    <link rel="stylesheet" href="/style.css" />
  </head>
  <body>
    <h1>${title}</h1>
  </body>
</html>`;
}

export function testProject() {
  const project: Project = {
    title: "My project",
    description: "",
    template: "node",
    files: {
      "package.json": JSON.stringify(
        {
          name: "node-demo",
          scripts: {
            start: "serve public",
          },
          dependencies: {
            serve: "13.0.2",
          },
        },
        null,
        2
      ),
      "public/index.html": html("Hey friends"),
      "public/style.css": "body { margin: 0; padding: 2em; font-family: sans-serif; color: #420; background-color: #fed; }",
    },
  };

  for (let i = Math.floor(Math.random() * 50); i > 0; i--) {
    const num = String(i).padStart(2, "0");
    project.files[`public/${num}.html`] = html(`Random file #${num}`);
  }

  return project;
}
