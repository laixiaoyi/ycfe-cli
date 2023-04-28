import path from 'node:path';
import { pathExistsSync } from 'path-exists';
import fse from 'fs-extra';
import ora from 'ora';
import { execa } from 'execa';

import { printErrorLog, log } from '@ycfe-cli/utils';

// 获取缓存目录
const getCacheDir = targetPath => path.resolve(targetPath, 'node_modules');

// 判断缓存目录是否存在
const makeCacheDir = targetPath => {
  const cacheDir = getCacheDir(targetPath);
  if (!pathExistsSync(cacheDir)) {
    fse.mkdirpSync(cacheDir);
  }
}

const downLoadAddTemplate = async (targetPath, template) => {
  const { npmName, version } = template;
  const installCommand = 'npm';
  const installArgs = ['install', `${npmName}@${version}`];
  const cwd = targetPath;
  log.verbose('下载参数：', installArgs);
  log.verbose('下载目录：', cwd);
  const spinner = ora('正在下载模板...').start();
  try {
    await execa(installCommand, installArgs, { cwd });
    spinner.stop();
    log.success('模板下载成功');
  } catch (e) {
    spinner.stop();
    printErrorLog(e);
  }
}

// 下载模板
const downLoadTemplate = async selectedTemplate => {
  const { targetPath, template } = selectedTemplate;
  makeCacheDir(targetPath);
  await downLoadAddTemplate(targetPath, template);
};

export default downLoadTemplate;