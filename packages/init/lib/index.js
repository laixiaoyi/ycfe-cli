import Command from '@ycfe-cli/command';
import { log } from '@ycfe-cli/utils';

import createTemplate from './createTemplate.js';
import downLoadTemplate from './downLoadTemplate.js';
import installTemplate from './installTemplate.js';
/**
 * 示例
 * fe-cli init
 * fe-cli init projectName -t project -tp template-vue2 -f
 */
class InitCommand extends Command {
  get command() {
    return 'init [name]';
  }

  get description() {
    return '初始化项目';
  }

  get options() {
    return [
      ['-f, --force', '是否强制更新', false],
      ['-t, --type <type>', '项目类型(值：project | page)'],
      ['-tp, --template <template>', '模板名称']
    ]
  }
  
  async action([name, opts]) {
    log.verbose('init参数：', name, opts);
    // 1.选择项目模板，生成项目信息
    const selectedTemplate = await createTemplate(name, opts);
    log.verbose('选中模板：', selectedTemplate);
    // 2.下载项目模板至缓存目录
    await downLoadTemplate(selectedTemplate);
    // 3.安装项目模板至项目目录
    installTemplate(selectedTemplate, opts);
  }
}

function Init(instance) {
  return new InitCommand(instance);
}

export default Init;