import caxa from "caxa";

(async () => {
  await caxa({
    input: ".",
    output: "conceal-cli.exe",
    command: [
      "{{caxa}}/node_modules/.bin/node",
      "{{caxa}}/index.js"
    ],
  });
})();