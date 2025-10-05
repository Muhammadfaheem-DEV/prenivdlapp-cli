const axios = require('axios');
const chalk = require('chalk');
const ora = require('ora');
const inquirer = require('inquirer');
const { getApi } = require('./api');
const { downloadFile } = require('../utils/download');

async function downloadInstagram(url, basePath = 'resultdownload_preniv') {
  const spinner = ora(' Fetching Instagram media data...').start();
  
  try {
    const response = await axios.get(`${getApi.instagram}${encodeURIComponent(url)}`, {
      timeout: 30000,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Linux; Android 10; Mobile) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.210 Mobile Safari/537.36'
      }
    });
    const data = response.data;

    if (!data || !data.status) {
      spinner.fail(chalk.red(' Failed to fetch Instagram media data'));
      console.log(chalk.gray('   • The API returned an error or invalid response'));
      return;
    }
    if (!data.data || data.data.length === 0) {
      spinner.fail(chalk.red(' Invalid media data received'));
      console.log(chalk.gray('   • The media may be private or unavailable'));
      return;
    }

    spinner.succeed(chalk.green(' Instagram media data fetched successfully!'));
    console.log('');
    console.log(chalk.cyan(' Media Information:'));
    console.log(chalk.gray('   • ') + chalk.white(`Found ${data.data.length} media file(s)`));
    if (data.data.length === 1) {
      const media = data.data[0];
      const downloadSpinner = ora(' Downloading media...').start();
      const extension = media.url.includes('.mp4') ? 'mp4' : 'jpg';
      const filename = `instagram_media_${Date.now()}.${extension}`;
      await downloadFile(media.url, filename, downloadSpinner);
    } else {
      const downloadChoices = data.data.map((media, index) => ({
        name: `  Media ${index + 1} (${media.url.includes('.mp4') ? 'Video' : 'Photo'})`,
        value: { url: media.url, thumbnail: media.thumbnail, index }
      }));
      downloadChoices.push({
        name: 'Download All',
        value: 'all'
      });
      const { selectedDownload } = await inquirer.prompt([
        {
          type: 'list',
          name: 'selectedDownload',
          message: 'Select download option:',
          choices: downloadChoices
        }
      ]);
      if (selectedDownload === 'all') {
        for (let i = 0; i < data.data.length; i++) {
          const media = data.data[i];
          const downloadSpinner = ora(`  Downloading media ${i + 1}/${data.data.length}...`).start();
          const extension = media.url.includes('.mp4') ? 'mp4' : 'jpg';
          const filename = `instagram_media_${i + 1}_${Date.now()}.${extension}`;
          await downloadFile(media.url, filename, downloadSpinner, basePath);
        }
      } else {
        const downloadSpinner = ora('  Downloading selected media...').start();
        const extension = selectedDownload.url.includes('.mp4') ? 'mp4' : 'jpg';
        const filename = `instagram_media_${selectedDownload.index + 1}_${Date.now()}.${extension}`;
        await downloadFile(selectedDownload.url, filename, downloadSpinner, basePath);
      }
    }
  } catch (error) {
    spinner.fail(chalk.red(' Error fetching Instagram media'));
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

module.exports = { downloadInstagram };
