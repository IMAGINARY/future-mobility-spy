import ready from 'document-ready';

import { ConfigMenu } from './configMenu';

async function main() {
  const configMenu = await ConfigMenu.getInstance();
  global.configMenu = configMenu;
}

ready(main);
