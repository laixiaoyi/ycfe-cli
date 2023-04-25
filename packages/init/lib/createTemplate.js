import path from 'node:path';
import { homedir } from 'node:os';
import { log, makeList, makeInput, getLatestVersion } from '@ycfe-cli/utils';

const ADD_TYPE_PROJECT = 'project';
const ADD_TYPE_PAGE = 'page';
const ADD_TEMPLATE = [
  {
    name: 'vue2项目模板',
    value: 'template-vue2',
    npmName: '@ycfe-cli/template-vue2',
    version: '1.0.0'
  }, {
    //TODO: 待添加
    name: 'vue3项目模板',
    value: 'template-vue3',
    npmName: '@ycfe-cli/template-vue3',
    version: '1.0.0'
  }
];
const ADD_TYPE = [
  {
    name: '项目',
    value: ADD_TYPE_PROJECT
  }, {
    // TODO: 待添加
    name: '页面',
    value: ADD_TYPE_PAGE
  }
];
const TEMP_HOME = '.ycfe-cli';

// 获取初始化类型
function getAddType() {
  return makeList({
    choices: ADD_TYPE,
    message: '请选择初始化类型',
    defaultValue: ADD_TYPE_PROJECT
  });
}

// 获取项目名称
function getAddName() {
  return makeInput({
    message: '请输入项目名称',
    defaultValue: '',
    validate(value) {
      if (value.length > 0) {
        return true;
      }
      return '项目名称必须输入！';
    }
  })
}

// 选择项目模板
function getAddTemplate() {
  return makeList({
    choices: ADD_TEMPLATE,
    message: '请选择项目模板',
  })
}

// 获取缓存目录
function getTargetPath() {
  return path.resolve(`${homedir()}/${TEMP_HOME}`, 'addTemplate');
}

export default async function createTemplate(name, opts) {
  const { type = null, template = null } = opts;
  let addType; // 项目类型
  let addName; // 项目名称
  let selectedTemplate; // 项目模板
  if (type) {
    addType = type;
  } else {
    addType = await getAddType();
  }
  log.verbose('初始化类型：', addType);
  if (addType !== ADD_TYPE_PROJECT) throw new Error(`创建的项目类型 ${addType} 不支持！`);
  if (name) {
    addName = name;
  } else {
    addName = await getAddName();
  }
  log.verbose('项目名称：', addName);
  if (template) {
    selectedTemplate = ADD_TEMPLATE.find(tp => tp.value === template);
    if (!selectedTemplate) {
      throw new Error(`项目模板 ${template} 不存在！`);
    }
  } else {
    const addTemplate = await getAddTemplate();
    selectedTemplate = ADD_TEMPLATE.find(item => item.value === addTemplate);
  }
  log.verbose('选择模板：', selectedTemplate);
  // 获取最新版本号模板
  const latestVersion = await getLatestVersion(selectedTemplate.npmName);
  log.verbose(`${selectedTemplate.npmName}模板最新版本号：`, latestVersion);
  selectedTemplate.version = latestVersion;
  const targetPath = getTargetPath();
  return {
    type: addType,
    name: addName,
    template: selectedTemplate,
    targetPath
  }
}