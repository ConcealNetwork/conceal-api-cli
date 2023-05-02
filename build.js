import caxa from "caxa";
import Os from 'os';

(async () => {
  await caxa({
    input: ".",
    output: Os.platform() === "win32" ? "conceal-cli.exe" : "conceal-cli",
    command: [
      "{{caxa}}/node_modules/.bin/node",
      "{{caxa}}/index.js"
    ],
  });
})();