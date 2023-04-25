import log from './log.js';
import isDebug from './isDebug.js';

export default function printErrorLog(e, type) {
  if (isDebug()) {
    log.error(type, e);
  } else {
    log.error(type, e.message || e);
  }
}