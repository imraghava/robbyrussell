#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const { log, success, error } = require('./utils/common');

const configs = new Map([
  [ 'bash', `${process.env.HOME}/.bashrc` ],
  [ 'zsh' , `${process.env.HOME}/.zshrc`  ],
  [ 'fish', `${process.env.HOME}/.config/fish/config.fish` ],
]);

log('Ianstalling robbyrussell theme...');

const shell  = path.basename(process.env.SHELL);
const cwd    = process.cwd();
const config = configs.get(shell);

log('Current shell:', shell);
log('Working directory:', cwd);
log('Shell\'s config stored at:', config);

try {
  log(`Appending to ${config}...`);

  fs.appendFileSync(config, `
### GENERATED BY ROBBYRUSSELL
. ${cwd}/adapters/adapter.${shell}
### GENERATED BY ROBBYRUSSELL
`, 'utf8');

  success('Done! Please, reload your terminal.');
} catch (e) {
  error('Something went wrong!');
  error('Don\'t panic! Report an issue to:');
  error('\n\thttps://github.com/denysdovhan/robbyrussell/issues/new');
  throw e;
}
