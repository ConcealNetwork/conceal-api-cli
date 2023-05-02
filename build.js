import compress from "compressing";
import caxa from "caxa";
import os from 'os';
import fs from 'fs';

(async () => {
  fs.rmSync("./bin", { recursive: true, force: true });
  fs.mkdirSync("./bin");
  fs.copyFileSync("./config.json", "./bin/config.json");

  await caxa({
    input: ".",
    output: os.platform() === "win32" ? "./bin/conceal-cli.exe" : "./bin/conceal-cli",
    command: [
      "{{caxa}}/node_modules/.bin/node",
      "{{caxa}}/index.js"
    ],
  });

  if (os.platform() === "win32") {
    await compress.zip.compressDir("./bin", "./conceal-cli.zip");
  } else {
    await compress.tgz.compressDir("./bin", "./conceal-cli.tar.gz");
  }
})();