const Command = require('@ycfe-cli/command');
const { log } = require('@ycfe-cli/utils');

class InitCommand extends Command {
  get command() {
    return 'init [name]';
  }

  get description() {
    return '初始化项目';
  }

  get options() {
    return [
      ['-f, --force', '是否强制更新', false]
    ]
  }
  
  action([name, opts]) {
    log.verbose('init', name, opts);
  }
}

function Init(instance) {
  return new InitCommand(instance);
}

module.exports = Init;