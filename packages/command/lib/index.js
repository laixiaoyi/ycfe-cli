class Command {
  constructor(instance) {
    if (!instance) {
      throw new Error('command类的instance参数不能为空!');
    }
    this.program = instance;
    const cmd = this.program.command(this.command);
    cmd.description(this.description);
    cmd.hook('preAction', () => {
      this.preAction();
    });
    cmd.hook('postAction', () => {
      this.postAction();
    });
    if (this.options?.length > 0) {
      this.options.forEach(option => {
        cmd.option(...option);
      })
    }
    cmd.action((...params) => {
      this.action(params);
    });
  }

  get command() {
    throw new Error('command必须实现');
  }

  get description() {
    throw new Error('description必须实现');
  }

  get options() {
    return [];
  }

  get action() {
    throw new Error('action必须实现');
  }

  preAction() {
    // empty
  }

  postAction() {
    // empty
  }
}

export default  Command;