const axios = require('axios');
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');

async function downloadFile(url, filename, spinner, basePath = 'resultdownload_preniv') {
  try {
    if (!fs.existsSync(basePath)) {
      fs.mkdirSync(basePath, { recursive: true });
    }
    const fullPath = path.join(basePath, filename);
    const response = await axios({
      method: 'GET',
      url: url,
      responseType: 'stream'
    });

    const writer = fs.createWriteStream(fullPath);
    response.data.pipe(writer);

    return new Promise((resolve, reject) => {
      writer.on('finish', () => {
        spinner.succeed(chalk.green(`Downloaded: ${fullPath}`));
        resolve(fullPath);
      });
      writer.on('error', reject);
    });
  } catch (error) {
    spinner.fail(chalk.red(`Failed to download: ${error.message}`));
    throw error;
  }
}

module.exports = { downloadFile };
