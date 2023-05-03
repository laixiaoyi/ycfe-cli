import path from 'node:path';
import fse from 'fs-extra';
import { pathExistsSync } from 'path-exists';
import ora from 'ora';
import ejs from 'ejs';
import { globSync } from 'glob';
import { log } from '@ycfe-cli/utils';

// 获取缓存路径
const getCacheFilePath = (targetPath, template) => path.resolve(targetPath, 'node_modules', template.npmName, 'template');

// 拷贝文件
const copyFile = (targetPath, template, installDir) => {
  const originFile = getCacheFilePath(targetPath, template);
  const fileList = fse.readdirSync(originFile);
  const spinner = ora('正在拷贝模板文件...').start();
  fileList.forEach(fileName => {
    fse.copySync(`${originFile}/${fileName}`, `${installDir}/${fileName}`);
  });
  spinner.stop();
  log.success('模板拷贝成功');
}

// ejs动态渲染
const ejsRender = (installDir, template, name) => {
  log.verbose('ejs渲染参数：', {
    '路径': installDir,
    '模板数据': template,
    '项目名称': name
  });
  const { ignore = [] } = template;
  const ejsData = {
    data: {
      name, // 项目名称
    }
  }
  const files = globSync('**', { 
    cwd: installDir, 
    nodir: true, 
    ignore : [
      ...ignore,
      '**/node_modules/**'
    ] 
  });
  files.forEach(file => {
    const filePath = path.join(installDir, file);
    log.verbose('ejs渲染文件路径', filePath);
    ejs.renderFile(filePath, ejsData, (err, result) => {
      if (err) throw new Error(`ejs渲染失败：${err}`);
      fse.writeFileSync(filePath, result);
    })
  })
}

// 安装模板
const installTemplate = (selectedTemplate, opts) => {
  const { force = false } = opts;
  const { targetPath, name, template } = selectedTemplate;
  const rootDir = process.cwd();
  fse.ensureDirSync(targetPath);
  const installDir = path.resolve(`${rootDir}/${name}`);
  if (pathExistsSync(installDir)) {
    if (!force) {
      log.error(`当前目录下已存在 ${installDir} 文件夹`);
      return;
    } else {
      fse.removeSync(installDir);
      fse.ensureDirSync(installDir);
    }
  } else {
    fse.ensureDirSync(installDir);
  }
  copyFile(targetPath, template, installDir);
  ejsRender(installDir, template, name);
}

export default installTemplate;