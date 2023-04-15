import path from 'node:path';
import { program } from 'commander';
import semver from 'semver';
import chalk from 'chalk';
import fse from 'fs-extra';
import { dirname } from 'dirname-filename-esm';
import createInitCommand from '@ycfe-cli/init';
import { isDebug } from '@ycfe-cli/utils';

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

process.on('uncaughtException', e => {
  if (isDebug()) {
    console.log(e);
  } else {
    console.log(e.message);
  }
});

export default function() {
  program
    .name(Object.keys(pkg.bin)[0])
    .usage('<command> [options]')
    .version(pkg.version)
    .option('-d, --debug', '是否开启调试模式', false)
    .hook('preAction', perAction);

  // program
  //   .command('init [name]')
  //   .description('init project')
  //   .option('-f, --force', '是否强制更新', false)
  //   .action((name, opts) => {
  //     console.log('init', name, opts)
  //   });
  createInitCommand(program);

  program.parse(process.argv);
}