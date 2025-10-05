const axios = require('axios');
const chalk = require('chalk');
const ora = require('ora');
const inquirer = require('inquirer');
const { getApi } = require('./api');
const { downloadFile } = require('../utils/download');

async function downloadDouyin(url, basePath = 'resultdownload_preniv') {
  const spinner = ora(' Fetching Douyin video data...').start();
  
  try {
    const response = await axios.get(`${getApi.douyin}${encodeURIComponent(url)}`, {
      timeout: 30000,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Linux; Android 10; Mobile) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.210 Mobile Safari/537.36'
      }
    });
    const data = response.data;

    if (!data || !data.status) {
      spinner.fail(chalk.red(' Failed to fetch Douyin video data'));
      console.log(chalk.gray('   • The API returned an error or invalid response'));
      return;
    }
    if (!data.data || !data.data.downloads || data.data.downloads.length === 0) {
      spinner.fail(chalk.red(' Invalid video data received'));
      console.log(chalk.gray('   • The video may be private or unavailable'));
      return;
    }

    spinner.succeed(chalk.green(' Douyin video data fetched successfully!'));
    console.log('');
    console.log(chalk.cyan(' Video Information:'));
    console.log(chalk.gray('   • ') + chalk.white(`Title: ${data.data.title || 'No title'}`));
    console.log('');

    const downloadChoices = data.data.downloads.map((item, index) => ({
      name: ` ${item.quality}`,
      value: { url: item.url, quality: item.quality, index }
    }));

    const { selectedDownload } = await inquirer.prompt([
      {
        type: 'list',
        name: 'selectedDownload',
        message: 'Select download quality:',
        choices: downloadChoices
      }
    ]);

    const downloadSpinner = ora(' Downloading video...').start();
    const filename = `douyin_video_${Date.now()}.mp4`;
    await downloadFile(selectedDownload.url, filename, downloadSpinner, basePath);
  } catch (error) {
    spinner.fail(chalk.red(' Error fetching Douyin video'));
    if (error.code === 'ECONNABORTED') {
      console.log(chalk.gray(' • Request timeout - please try again'));
    } else if (error.response) {
      console.log(chalk.gray(` • API Error: ${error.response.status} - ${error.response.statusText}`));
    } else if (error.request) {
      console.log(chalk.gray(' • Network error - please check your connection'));
    } else {
      console.log(chalk.gray(` • ${error.message}`));
    }
  }
}

module.exports = { downloadDouyin };
