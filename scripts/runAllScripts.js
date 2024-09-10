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
  await runScript('node scripts/createSchema.js');
  await runScript('node scripts/createDatabase.js');
  await runScript('node scripts/createShelfTable.js');
  await runScript('node scripts/createItemTable.js');
};

runAll();
