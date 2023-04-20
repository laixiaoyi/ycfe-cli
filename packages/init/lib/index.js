import Command from '@ycfe-cli/command';
import { log } from '@ycfe-cli/utils';

import createTemplate from './createTemplate.js';

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
  
  async action([name, opts]) {
    log.verbose('init', name, opts);
    // 1.选择项目模板，生成项目信息
    const template = await createTemplate(name, opts);
    // log.verbose('template', template);
    // 2.下载项目模板至缓存目录
    // 3.安装项目模板至项目目录
  }
}

function Init(instance) {
  return new InitCommand(instance);
}

export default Init;