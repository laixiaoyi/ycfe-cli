import createInitCommand from '@ycfe-cli/init';
import createCli from './createCli.js';
import './exception.js';

export default function() {
  const program = createCli();
  createInitCommand(program);
  program.parse(process.argv);
}