import { log, makeList } from '@ycfe-cli/utils';

const ADD_TYPE_PROJECT = 'project';
const ADD_TYPE_PAGE = 'page';
const ADD_TEMPLATE = [
  {
    name: 'vue2项目模板',
    npmName: '@ycfe-cli/template-vue2',
    version: '1.0.0'
  }
];
const ADD_TYPE = [
  {
    name: '项目',
    value: ADD_TYPE_PROJECT
  }, {
    name: '页面',
    value: ADD_TYPE_PAGE
  }
];

// 获取创建类型
function getAddType() {
  return makeList({
    choices: ADD_TYPE,
    message: '清选择初始化类型',
    defaultValue: ADD_TYPE_PROJECT
  });
}

export default async function createTemplate(name, opts) {
  const addType = await getAddType();
  log.verbose('addType', addType);
}