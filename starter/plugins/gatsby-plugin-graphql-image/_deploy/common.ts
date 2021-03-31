/**
 * Common
 */
import * as cp from "child_process";
import * as fs from "fs";

import { ConsoleLogger, IConsoleLoggerSettings, Logger } from "@rocketmakers/log";

import { URL } from "url";

export function readFileAsync(
  path: string | number | Buffer | URL,
  options?: {
    encoding?: null | undefined;
    flag?: string | undefined;
  },
) {
  return new Promise<Buffer>((resolve, reject) => {
    fs.readFile(path, options, (err: NodeJS.ErrnoException, data: Buffer) => {
      if (err) {
        return reject(err);
      }
      return resolve(data);
    });
  });
}

/**
 * Helper function for getting environment variables
 * @param name
 * @param required
 *
 * --------------------------------------------------------*/
export function getEnvVar(name: string, required: boolean = true) {
  const env = process.env[name];
  if (!required || !!env) {
    return env;
  }
  throw new Error(`Environment variable not found ${name}`);
}

/**
 * Create Logger
 *
 * --------------------------------------------------------*/
const settings: IConsoleLoggerSettings = {
  level: "info",
  mode: "short",
};

export const logger: Logger = ConsoleLogger.create("Armstrong", settings);

/**
 * Exec: runs shell command and returns promise
 * @param cmd
 * @param options
 * @param allow_fail
 *
 * --------------------------------------------------------*/
export async function exec(
  cmd: string,
  args: string[],
  allow_fail: boolean,
  options: { log?: boolean; cwd?: string; output: boolean; limit?: number } = {
    log: true,
    cwd: process.cwd(),
    output: false,
  },
): Promise<string> {
  function formatBuffer(input: Buffer, res: string, type: "info" | "warn") {
    const trimmedData = input.toString().trim();
    if (trimmedData !== "") {
      if (options.output === true) {
        if (!(options.limit && res.length > options.limit)) {
          res += input.toString().trim();
        }
      }
      if (options.log) {
        const allData = input
          .toString()
          .trim()
          .split("\n");
        for (const d of allData) {
          for (const fd of d.split("\r")) {
            if (fd.trim() !== "") {
              logger[type](fd.trim());
            }
          }
        }
      }
    }
    return res;
  }

  return new Promise((resolve, reject) => {
    const command = cp.spawn(cmd, args, options);
    let res: string = "";

    if (command.stdout) {
      command.stdout.on("data", function (data: Buffer) {
        res = formatBuffer(data, res, "info");
      });
    }

    if (command.stderr) {
      command.stderr.on("data", function (data) {
        res = formatBuffer(data, res, "info");
      });
    }

    command.on("error", function (err: Error) {
      if (allow_fail) {
        if (options.log === true) {
          logger.warn("---> Allowing to fail... you maniac");
        }
        resolve();
      }
      reject(err);
    });

    command.on("exit", function (code: number) {
      if (code === 0 || allow_fail) {
        if (options.log === true) {
          logger.info(`---> Child process exited with code ${code.toString()}`);
        }
        return resolve(res);
      }

      logger.error(`---> Child process error with code ${code.toString()}`);
      return reject(res);
    });
  });
}

/**
 * Get Version
 * @param environment
 *
 * --------------------------------------------------------*/
export async function getVersion(environment: string): Promise<string> {
  let version: string;

  if (environment === "production") {
    version = await getCurrentTag();
  } else if (environment === "staging") {
    const tag = await getCurrentTag();
    const sub = await getCommitsSinceTag();
    version = `${tag}-beta.${sub}`;
  } else {
    version = "0.0.0-local.0";
  }
  return version;
}

/**
 * Get Current Tag
 *
 * --------------------------------------------------------*/
async function getCurrentTag(): Promise<string> {
  try {
    const tag = await exec(
      "git",
      // git describe --abbrev=0 --tags
      ["describe", "--abbrev=0", "--tags"],
      false,
      {
        output: true,
      },
    );
    return tag.trim();
  } catch (err) {
    return "Error";
  }
}

/**
 * Get Commits
 *
 * --------------------------------------------------------*/
async function getCommitsSinceTag(): Promise<string> {
  try {
    const description = await exec(
      "git",
      ["describe", "--match", "root", "--tags"],
      false,
      {
        output: true,
      },
    );
    return description.trim().split("-")[1];
  } catch (err) {
    return "Error";
  }
}

/**
 * Build a Service
 * @param path
 * @param env
 *
 * --------------------------------------------------------*/
export async function buildService(path: string, env: string) {
  process.chdir(path);
  await exec("npm", ["i"], false);
  await exec("npm", ["run", `build-${env}`], false);
}
