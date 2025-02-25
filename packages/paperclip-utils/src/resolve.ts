import * as path from "path";
import * as url from "url";
import { stripFileProtocol } from "./utils";
import { PC_CONFIG_FILE_NAME } from "./constants";
import { PaperclipConfig } from "./config";

export const resolveImportUri = fs => (
  fromPath: string,
  toPath: string,
  resolveOutput?: boolean
) => {
  const filePath = resolveImportFile(fs)(fromPath, toPath, resolveOutput);
  return filePath;
};

export const resolveImportFile = fs => (
  fromPath: string,
  toPath: string,
  resolveOutput?: boolean
) => {
  try {
    if (/\w+:\/\//.test(toPath)) {
      return toPath;
    }

    if (toPath.charAt(0) !== ".") {
      const uri = resolveModule(fs)(fromPath, toPath, resolveOutput);
      if (!uri) {
        throw new Error(`module ${toPath} not found`);
      }
      return uri;
    }

    return url.resolve(fromPath, toPath);
  } catch (e) {
    return null;
  }
};

const readJSONSync = fs => (uri: string) =>
  JSON.parse(fs.readFileSync(uri, "utf8"));

const resolveModule = fs => (
  fromPath: string,
  moduleRelativePath: string,
  resolveOutput: boolean
) => {
  const configUrl = findPCConfigUrl(fs)(fromPath);
  if (!configUrl) return null;

  const uri = new URL(configUrl) as any;

  // need to parse each time in case config changed.
  const config: PaperclipConfig = readJSONSync(fs)(uri);
  const configPathDir = path.dirname(stripFileProtocol(configUrl));

  const moduleFileUrl = url.pathToFileURL(
    path.normalize(
      path.join(configPathDir, config.sourceDirectory, moduleRelativePath)
    )
  );

  // FIRST look for modules in the sourceDirectory
  if (fs.existsSync(moduleFileUrl)) {
    // Need to follow symlinks
    return url.pathToFileURL(fs.realpathSync(moduleFileUrl)).href;
  }

  // No bueno? Move onto the module directories then

  if (config.moduleDirectories) {
    const firstSlashIndex = moduleRelativePath.indexOf("/");
    const moduleName = moduleRelativePath.substr(0, firstSlashIndex);
    const srcPath = moduleRelativePath.substr(firstSlashIndex);
    for (let i = 0, { length } = config.moduleDirectories; i < length; i++) {
      const moduleDir = config.moduleDirectories[i];
      const moduleDirectory = path.join(
        resolveModuleDirectory(fs)(configPathDir, moduleDir),
        moduleName
      );
      const modulePath = path.join(moduleDirectory, srcPath);
      const moduleConfigUrl = findPCConfigUrl(fs)(modulePath);

      if (fs.existsSync(modulePath)) {
        const moduleConfig: PaperclipConfig = readJSONSync(fs)(
          new URL(moduleConfigUrl) as any
        );
        const sourceDir = path.join(
          path.dirname(url.fileURLToPath(moduleConfigUrl)),
          moduleConfig.sourceDirectory
        );
        const outputDir = path.join(
          path.dirname(url.fileURLToPath(moduleConfigUrl)),
          moduleConfig.outputDirectory || moduleConfig.sourceDirectory
        );
        const actualPath = resolveOutput
          ? modulePath.replace(sourceDir, outputDir)
          : fs.realpathSync(modulePath);

        return url.pathToFileURL(actualPath).href;
      }
    }
  }

  return null;
};

const resolveModuleDirectory = fs => (cwd: string, moduleDir: string) => {
  const c0 = moduleDir.charAt(0);
  if (c0 === "/" || c0 === ".") {
    return path.join(cwd, moduleDir);
  }
  let cdir = cwd;

  do {
    const maybeDir = path.join(cdir, moduleDir);
    if (fs.existsSync(maybeDir)) {
      return maybeDir;
    }
    cdir = path.dirname(cdir);
  } while (isntRoot(cdir));
};

export const findPCConfigUrl = fs => (fromUri: string): string | null => {
  let cdir: string = stripFileProtocol(fromUri);

  // can't cache in case PC config was moved.
  do {
    const configUrl = url.pathToFileURL(path.join(cdir, PC_CONFIG_FILE_NAME));
    if (fs.existsSync(configUrl)) {
      return configUrl.href;
    }
    cdir = path.dirname(cdir);
  } while (isntRoot(cdir));
  return null;
};

const isntRoot = (cdir: string) =>
  cdir !== "/" && cdir !== "." && !/^\w+:\\$/.test(cdir);
