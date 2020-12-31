import { debug } from 'debug';

const logs = (): any => {
  const error = debug('phoner:error');
  const warn = debug('phoner:warning');
  const info = debug('phoner:info');

  info.enabled = true;
  warn.enabled = true;
  error.enabled = true;

  return { error, warn, info };
};

const log = logs();
const expand = (data: any): any => JSON.stringify(data, null, 2);

export { log, expand };
