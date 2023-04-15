const { program } = require('commander');
const semver = require('semver');
const chalk = require('chalk');
const createInitCommand = require('@ycfe-cli/init');
const { log, isDebug } = require('@ycfe-cli/utils');
const pkg = require('../package.json');

const LOWEST_NODE_VERSION = '17.0.0';

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

module.exports = function(args) {
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