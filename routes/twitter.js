const axios = require('axios');
const chalk = require('chalk');
const ora = require('ora');
const { getApi } = require('./api');
const { downloadFile } = require('../utils/download');

async function downloadTwitter(url, basePath = 'resultdownload_preniv') {
  const spinner = ora(' Fetching Twitter video data...').start();

  try {
    const response = await axios.get(`${getApi.twitter}${encodeURIComponent(url)}`, {
      timeout: 30000,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Linux; Android 10; Mobile) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.210 Mobile Safari/537.36'
      }
    });
    const data = response.data;

    if (!data || !data.status) {
      spinner.fail(chalk.red(' Failed to fetch Twitter video data'));
      console.log(chalk.gray('   • The API returned an error or invalid response'));
      return;
    }
    if (!data.data || !data.data.downloadLink) {
      spinner.fail(chalk.red(' Invalid video data received'));
      console.log(chalk.gray('   • The video may be private or unavailable'));
      return;
    }

    spinner.succeed(chalk.green(' Twitter video data fetched successfully!'));
    console.log('');
    console.log(chalk.cyan(' Video Information:'));
    console.log(chalk.gray('   • ') + chalk.white(`Title: ${data.data.videoTitle || 'No title'}`));
    console.log(chalk.gray('   • ') + chalk.white(`Description: ${data.data.videoDescription || 'No description'}`));
    console.log('');

    const downloadSpinner = ora(' Downloading video...').start();
    const filename = `twitter_video_${Date.now()}.mp4`;
    await downloadFile(data.data.downloadLink, filename, downloadSpinner, basePath);
  } catch (error) {
    spinner.fail(chalk.red(' Error fetching Twitter video'));
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

module.exports = { downloadTwitter };
