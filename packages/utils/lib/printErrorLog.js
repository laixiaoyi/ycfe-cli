import log from './log.js';
import isDebug from './isDebug.js';

// 打印错误日志
const printErrorLog = (e, type) => {
  if (isDebug()) {
    log.error(type, e);
  } else {
    log.error(type, e.message || e);
  }
}
export default printErrorLog;