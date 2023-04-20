import urlJoin from 'url-join';
import axios from 'axios';

function getNpmInfo(npmName) {
  // 淘宝源 https://registry.npm.taobao.org/
  const registry = 'https://registry.npmjs.org/';
  const url = urlJoin(registry, npmName);
  return axios.get(url);
}

export async function getLatestVersion(npmName) {
  try {
    const { data } = await getNpmInfo(npmName);
    if (!data['dist-tags']?.latest) {
      return Promise.reject(`${npmName}：没有最新版本号`);
    };
    return data['dist-tags'].latest;
  } catch(err) {
    return Promise.reject(`${npmName}：${err.response.statusText}`);
  }
}