import inquirer from 'inquirer';

function make({
  choices,
  defaultValue,
  message = '请选择',
  type = 'list',
  require = true,
  mask = '*',
  validate,
  pageSize,
  loop
}) {
  const options = {
    name: 'name',
    default: defaultValue,
    message,
    type,
    require,
    mask,
    validate,
    pageSize,
    loop
  }
  if (type === 'list') {
    options.choices = choices;
  }
  return inquirer.prompt(options).then(answer => answer.name);
}

const makeList = params => make({ ...params });

const makeInput = params => make({ type: 'input',...params });

export {
  makeList,
  makeInput,
}