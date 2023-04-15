#!/usr/bin/env node

import importLocal from 'import-local';
import { log } from '@ycfe-cli/utils';
import { filename } from 'dirname-filename-esm';
import entry from '../lib/index.js';

const __filename = filename(import.meta);

if (importLocal(__filename)) {
  log.info('cli', '使用本地 ycfe-cli 版本');
} else  {
  entry();
}