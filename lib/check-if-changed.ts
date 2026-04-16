import * as exec from "@actions/exec";

import { getInput } from "./lib/input";

const execute = async (command: string): Promise<number> => {
  let output = "";
  const options = {
    ignoreReturnCode: true,
    silent: true
  };
  await exec.exec(command, null, options);
  return output;
};

const ifFilesChanged = async (): Promise<string[]> => {
  const files = getInput("files", { required: true }).trim().split("\n");
  let changed: string[] = [];
  for (const file of files) {
    let exitCode = await execute(`git diff --exit-code ${file}`);
    if (exitCode !== 0) {
      changed.push(file);
    }
  }
  return changed;
};

export default ifFilesChanged;
