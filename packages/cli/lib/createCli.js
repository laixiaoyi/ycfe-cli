import path from 'node:path';
import { program } from 'commander';
import fse from 'fs-extra';
import { dirname } from 'dirname-filename-esm';
import semver from 'semver';
import chalk from 'chalk';
import { log } from '@ycfe-cli/utils';

const __dirname = dirname(import.meta);
const pkgPath = path.resolve(__dirname, '../package.json');
const pkg = fse.readJSONSync(pkgPath);

const LOWEST_NODE_VERSION = '14.0.0';

function checkNodeVersion() {
  if (!semver.gte(process.version, LOWEST_NODE_VERSION)) {
    throw new Error(chalk.red(`ycfe-cli 需要安装 ${LOWEST_NODE_VERSION} 以上版本的Node.js`));
  }
}

function perAction() {
  // 检查Node版本
  checkNodeVersion();
}

export default function createCli() {
  log.info('version', pkg.version);

  program
    .name(Object.keys(pkg.bin)[0])
    .usage('<command> [options]')
    .version(pkg.version)
    .option('-d, --debug', '是否开启调试模式', false)
    .hook('preAction', perAction);

  program.on('option:debug', () => {
    if (program.opts().debug) {
      log.verbose('debug', '启动调试模式!');
    }
  });
  
  program.on('command:*', obj => {
    log.error('未知的命令：' + obj[0]);
  });
  return program;

// program
//   .command('init [name]')
//   .description('init project')
//   .option('-f, --force', '是否强制更新', false)
//   .action((name, opts) => {
//     console.log('init', name, opts)
//   });
}