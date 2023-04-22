import path from 'node:path';
import { pathExistsSync } from 'path-exists';
import fse from 'fs-extra';
import ora from 'ora';
import { execa } from 'execa';

import { printErrorLog, log } from '@ycfe-cli/utils';

function getCacheDir(targetPath) {
  return path.resolve(targetPath, 'node_modules');
}

function makeCacheDir(targetPath) {
  const cacheDir = getCacheDir(targetPath);
  if (!pathExistsSync(cacheDir)) {
    fse.mkdirpSync(cacheDir);
  }
}

async function downLoadAddTemplate(targetPath, template) {
  const { npmName, version } = template;
  const installCommand = 'npm';
  const installArgs = ['install', `${npmName}@${version}`];
  const cwd = targetPath;
  log.verbose('安装参数：', installArgs);
  log.verbose('安装目录：', cwd);
  await execa(installCommand, installArgs, { cwd });
}

export default async function downLoadTemplate(selectedTemplate) {
  const { targetPath, template } = selectedTemplate;
  makeCacheDir(targetPath);
  const spinner = ora('正在下载模板...').start();
  try {
    await downLoadAddTemplate(targetPath, template);
    spinner.stop();
    log.success('模板下载成功');
  } catch (e) {
    spinner.stop();
    printErrorLog(e);
  }
}