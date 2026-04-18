import * as exec from "@actions/exec";

import { getInput } from "./input";

const execute = async (command: string): Promise<number> => {
  const options = {
    ignoreReturnCode: true,
    silent: true
  };
  return await exec.exec(command, null, options);
};

const ifFilesChanged = async (): Promise<string> => {
  const files = getInput("files", { required: false }).trim().split("\n");
  let changed: string[] = [];
  for (const file of files) {
    let exitCode = await execute(`git diff --exit-code ${file}`);
    if (exitCode !== 0) {
      changed.push(file);
    }
  }
  return changed.join("\n");
};

export default ifFilesChanged;
