import urlJoin from 'url-join';
import axios from 'axios';
import ora from 'ora';

const getNpmInfo = npmName => {
  // 淘宝源 https://registry.npm.taobao.org/
  const registry = 'https://registry.npmjs.org/';
  const url = urlJoin(registry, npmName);
  return axios.get(url);
};

// 获取最新版本号
const getLatestVersion = async npmName => {
  const spinner = ora('正在获取模板最新版本号...').start();
  try {
    const { data } = await getNpmInfo(npmName);
    spinner.stop();
    if (!data['dist-tags']?.latest) {
      return Promise.reject(new Error(`${npmName}：没有最新版本号`));
    };
    return data['dist-tags'].latest;
  } catch(err) {
    spinner.stop();
    return Promise.reject(new Error(`${npmName}：${err.response?.statusText || err}`));
  }
}

export default getLatestVersion;