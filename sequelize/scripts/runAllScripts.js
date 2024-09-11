import { exec } from 'child_process';
import { promisify } from 'util';

const execPromise = promisify(exec);

const runScript = async (script) => {
  try {
    const { stdout, stderr } = await execPromise(script);
    if (stderr) {
      console.error(`Error: ${stderr}`);
    } else {
      console.log(stdout);
    }
  } catch (error) {
    console.error(`Failed to execute ${script}:`, error);
  }
};

const runAll = async () => {
  await runScript('node sequelize/scripts/createSchema.js');
  await runScript('node sequelize/scripts/createDatabase.js');
  await runScript('node sequelize/scripts/createShelfTable.js');
  await runScript('node sequelize/scripts/createItemTable.js');
  await runScript('node sequelize/scripts/createInventoryTypeTable.js');
  await runScript('node sequelize/scripts/createInventoryItemTypesTable.js');
};

runAll();
