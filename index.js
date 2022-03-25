import _ from "lodash";
import fs from "fs";
import process from "process";

console.log("---------------------------");
console.log("LONG TIME AGO - FOLDER SYNC");
console.log("---------------------------");

const CONFIG_FILE =
  process.argv.length > 2 && process.argv[2]
    ? process.argv[2]
    : "./.folder-sync-config.js";

// Load the config
let config = {};
try {
  config = (await import(CONFIG_FILE)).default;
  //   console.log(config);
} catch (ex) {
  console.log(`Error reading ${CONFIG_FILE} file`, ex);
  process.exit(-1);
}

// Check the files then setup the waiting
executeCheck(config);

// Main logic loop
function executeCheck(config) {
  console.log(`TIME: ${new Date().toISOString()}`);
  const { originFolder, destinationFolder, frequency, countToCopy } = config;

  // Query origin folder and sort desc by modified date
  const oFiles = fs.readdirSync(originFolder).map((f) => {
    const { mtime } = fs.statSync(`${originFolder}/${f}`);
    return {
      name: f,
      fullPath: `${originFolder}/${f}`,
      mtime,
    };
  });
  const sortedOFiles = _.orderBy(oFiles, "mtime", "desc");

  // Check the designated number of files and copy if missing
  const filesToCheck = Math.min(sortedOFiles.length, countToCopy);
  let copiedFiles = 0;
  for (let i = 0; i < filesToCheck; i++) {
    const destFile = `${destinationFolder}/${sortedOFiles[i].name}`;

    // Does the file exist locally?  If it does, ignore it.
    if (fs.existsSync(destFile)) {
      continue;
    }

    // If we are here, file does not exist locally and we should download it
    console.log(`File ${destFile} does not exist, copying it to ${destFile}`);
    fs.copyFileSync(sortedOFiles[i].fullPath, destFile);
    copiedFiles++;
  }

  if (copiedFiles === 0) {
    console.log("No new files to download");
  }

  // Schedule the next check
  console.log(`Scheduling next check in ${frequency} seconds\n`);
  setTimeout(() => executeCheck(config), frequency * 1000);
}
