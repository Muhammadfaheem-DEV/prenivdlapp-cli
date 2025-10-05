const { program } = require('commander');
const chalk = require('chalk');
const readline = require('readline');
const { showBanner, showPrompt, showProcessing, showHelp, showStatusFooter } = require('./utils/helpers');
const { downloadTikTok } = require('./routes/tiktok');
const { downloadFacebook } = require('./routes/facebook');
const { downloadInstagram } = require('./routes/instagram');
const { downloadTwitter } = require('./routes/twitter');
const { downloadDouyin } = require('./routes/douyin');
const { downloadSpotify } = require('./routes/spotify');

// Global variable to track current download path
let currentDownloadPath = 'resultdownload_preniv';

async function processUserInput(input) {
  const trimmedInput = input.trim();
  
  if (trimmedInput.startsWith('/')) {
    const command = trimmedInput.slice(1).toLowerCase();
    switch (command) {
      case 'help':
        showHelp();
        return true;
      case 'quit':
      case 'exit':
        console.log(chalk.gray('\n Thanks for using PRENIVDL CLI! 👋'));
        showStatusFooter();
        return false;
      case 'clear':
        console.clear();
        showBanner();
        return true;
      case 'path':
        console.log('');
        console.log(chalk.cyan(' Current download path: ') + chalk.white(currentDownloadPath));
        console.log(chalk.gray(' Use /setpath <new_path> to change download location'));
        console.log('');
        return true;
      case 'setpath':
        const parts = trimmedInput.split(' ');
        if (parts.length < 2 || parts[1].trim() === '') {
          console.log('');
          console.log(chalk.red(' Please provide a path. Usage: /setpath <directory_name>'));
          console.log('');
        } else {
          const newPath = parts.slice(1).join(' ').trim();
          currentDownloadPath = newPath;
          console.log('');
          console.log(chalk.green(` Download path set to: ${newPath}`));
          console.log('');
        }
        return true;
      default:
        console.log(chalk.red(` Unknown command: /${command}`));
        console.log(chalk.gray(' Type /help for available commands.'));
        showStatusFooter();
        return true;
    }
  }
  
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  const urls = trimmedInput.match(urlRegex);
  
  if (urls && urls.length > 0) {
    const url = urls[0];
    let platform = '';
    if (url.includes('tiktok.com')) {
      platform = 'TikTok';
      showProcessing('Fetching', ` Analyzing ${platform} video...`);
      await downloadTikTok(url, currentDownloadPath);
    } else if (url.includes('facebook.com') || url.includes('fb.watch')) {
      platform = 'Facebook';
      showProcessing('Fetching', ` Analyzing ${platform} video...`);
      await downloadFacebook(url, currentDownloadPath);
    } else if (url.includes('instagram.com')) {
      platform = 'Instagram';
      showProcessing('Fetching', ` Analyzing ${platform} media...`);
      await downloadInstagram(url, currentDownloadPath);
    } else if (url.includes('twitter.com') || url.includes('x.com')) {
      platform = 'Twitter';
      showProcessing('Fetching', ` Analyzing ${platform} video...`);
      await downloadTwitter(url, currentDownloadPath);
    } else if (url.includes('douyin.com')) {
      platform = 'Douyin';
      showProcessing('Fetching', ` Analyzing ${platform} video...`);
      await downloadDouyin(url, currentDownloadPath);
    } else if (url.includes('spotify.com')) {
      platform = 'Spotify';
      showProcessing('Fetching', ` Analyzing ${platform} track...`);
      await downloadSpotify(url, currentDownloadPath);
    } else {
      console.log('');
      console.log(chalk.red(' • Unsupported platform. Please provide TikTok, Facebook, Instagram, Twitter, Douyin, or Spotify URLs.'));
      showStatusFooter();
    }
  } else {
    console.log('');
    console.log(chalk.gray(' • Please provide a social media URL to download from.'));
    console.log(chalk.gray(' • Supported platforms: TikTok, Facebook, Instagram, Twitter, Douyin, Spotify'));
    showStatusFooter();
  }
  
  return true;
}

async function startInteractive() {
  showBanner();

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: ''
  });

  while (true) {
    try {
      showPrompt();
      
      const input = await new Promise((resolve) => {
        rl.question('  ', (answer) => {
          resolve(answer);
        });
      });

      const shouldContinue = await processUserInput(input);
      if (!shouldContinue) {
        rl.close();
        break;
      }

      console.log('');
    } catch (error) {
      console.log('');
      console.log(chalk.red(` • An error occurred: ${error.message}`));
      rl.close();
      break;
    }
  }
}

program
  .name('prnvapp')
  .description('Social Media Downloader CLI')
  .version('1.0.0')
  .option('-p, --path <directory>', 'Custom download directory (default: "resultdownload_preniv")', 'resultdownload_preniv');

program
  .command('interactive')
  .alias('i')
  .description('Start interactive mode')
  .action(startInteractive);

program
  .command('tiktok <url>')
  .description('Download from TikTok')
  .action(async (url) => {
    showBanner();
    await downloadTikTok(url, program.opts().path || currentDownloadPath);
    showStatusFooter();
  });

program
  .command('facebook <url>')
  .alias('fb')
  .description('Download from Facebook')
  .action(async (url) => {
    showBanner();
    await downloadFacebook(url, program.opts().path || currentDownloadPath);
    showStatusFooter();
  });

program
  .command('instagram <url>')
  .alias('ig')
  .description('Download from Instagram')
  .action(async (url) => {
    showBanner();
    await downloadInstagram(url, program.opts().path || currentDownloadPath);
    showStatusFooter();
  });

program
  .command('twitter <url>')
  .alias('tw')
  .description('Download from Twitter')
  .action(async (url) => {
    showBanner();
    await downloadTwitter(url, program.opts().path || currentDownloadPath);
    showStatusFooter();
  });

program
  .command('douyin <url>')
  .alias('dy')
  .description('Download from Douyin')
  .action(async (url) => {
    showBanner();
    await downloadDouyin(url, program.opts().path || currentDownloadPath);
    showStatusFooter();
  });

program
  .command('spotify <url>')
  .alias('sp')
  .description('Download from Spotify')
  .action(async (url) => {
    showBanner();
    await downloadSpotify(url, program.opts().path || currentDownloadPath);
    showStatusFooter();
  });

if (process.argv.length === 2) {
  startInteractive();
} else {
  program.parse();
}
