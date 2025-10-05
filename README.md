# Social Media Downloader CLI (PRENIVDL)

A powerful command-line interface for downloading videos and media from TikTok, Facebook, Instagram, Twitter, Douyin, and Spotify. Designed with beautiful ASCII art and interactive prompts.

## Features

- **TikTok Downloader** - Download videos with metadata and multiple quality options
- **Facebook Downloader** - Download videos in multiple qualities (HD/SD) and formats (MP4/MP3)
- **Instagram Downloader** - Download photos and videos from posts and stories
- **Twitter Downloader** - Download videos from Twitter/X posts
- **Douyin Downloader** - Download videos from Douyin (Chinese TikTok) with multiple quality options
- **Spotify Downloader** - Download tracks (MP3) and cover images from Spotify
- **Beautiful CLI Interface** - Colorful output with ASCII art banner
- **Interactive Mode** - User-friendly prompts and selections
- **Fast Downloads** - Efficient downloading with progress indicators

## Installation

### Linux (Ubuntu/Debian)
```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js and npm
sudo apt install nodejs npm git -y

# Verify installation
node --version
npm --version

# Clone and install
git clone https://github.com/arsya371/prenivdlapp-cli.git
cd prenivdlapp-cli
npm install
```

### macOS
```bash
# Install Homebrew (if not already installed)
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Install Node.js
brew install node git

# Verify installation
node --version
npm --version

# Clone and install
git clone https://github.com/arsya371/prenivdlapp-cli.git
cd prenivdlapp-cli
npm install
```

### Windows
```bash
# Download Node.js from nodejs.org
# Install Git from git-scm.com
# Open Command Prompt or PowerShell

# Clone and install
git clone https://github.com/arsya371/prenivdlapp-cli.git
cd prenivdlapp-cli
npm install
```

### Termux (Android)
```bash
# Update packages
pkg update && pkg upgrade

# Install dependencies
pkg install nodejs git

# Clone and install
git clone https://github.com/arsya371/prenivdlapp-cli.git
cd prenivdlapp-cli
npm install
```

## Usage

### Interactive Mode (Recommended)

Simply run the application without any arguments to start interactive mode:

```bash
# Linux/macOS/Termux:
node index.js

# Or use the shell script:
./smdl.sh

# Windows:
node index.js

# Or use the batch file:
smdl.bat
```

### Interactive Commands

Once in interactive mode, you can use these commands:

- **`/help`** - Show available commands
- **`/clear`** - Clear the screen
- **`/quit`** - Exit the application
- **`/path`** - Show current download directory
- **`/setpath <directory>`** - Set custom download directory

Example:
```
> /setpath my_downloads
> /path
Current download path: my_downloads
```

### Download Organization

Downloaded files are organized by platform with timestamps:

- **TikTok**: `tiktok_video_[timestamp].mp4`
- **Facebook**: `facebook_[quality]_[timestamp].[format]`
- **Instagram**: `instagram_media_[number]_[timestamp].[extension]`
- **Twitter**: `twitter_video_[timestamp].mp4`
- **Douyin**: `douyin_video_[timestamp].mp4`
- **Spotify**: `spotify_audio_[timestamp].mp3` or `spotify_image_[timestamp].jpg`

All files are saved to the specified directory (default: `resultdownload_preniv`).

### Cross-Platform Compatibility

This CLI works on:
- [x] **Windows** (10, 11)
- [x] **Linux** (Ubuntu, Debian, CentOS, etc.)
- [x] **macOS** (Monterey, Ventura, Sonoma)
- [x] **Termux** (Android)
- [x] **WSL** (Windows Subsystem for Linux)

## Features by Platform

### TikTok
- Video metadata (title, description, creator)
- Multiple video quality options
- **Smart API fallback**: Automatically tries v2 API first, falls back to v1 if needed
- Supports both v2 (newer, simpler) and v1 (detailed stats) API formats

### Facebook
- Multiple quality options (HD/SD)
- Multiple formats (MP4 video, MP3 audio, JPG photos)
- Video thumbnails
- Title information

### Instagram
- Single and multiple media support
- Photos and videos
- Batch download option for multiple media
- Thumbnail previews

### Twitter
- Video downloads from Twitter/X posts
- Video metadata (title, description)
- Direct MP4 downloads

### Douyin
- Video downloads from Douyin (Chinese TikTok)
- Multiple quality options (Version 1, Version 2)
- Video metadata and thumbnails

### Spotify
- Track downloads (MP3 format)
- Cover image downloads (JPG format)
- Track metadata (title, artist, description)

## Dependencies
- `axios` - HTTP client for API requests
- `chalk` - Terminal string styling
- `commander` - Command-line interface framework
- `inquirer` - Interactive command line prompts
- `ora` - Elegant terminal spinners
- `figlet` - ASCII art text generator

## Error Handling

The CLI includes comprehensive error handling for:

- Invalid URLs
- Network connectivity issues
- API failures
- File download errors
- User input validation

## Tips

1. **URL Validation**: Make sure to paste complete, valid URLs
2. **Network**: Ensure stable internet connection for downloads
3. **Storage**: Check available disk space before downloading
4. **Quality**: Higher quality files take longer to download

## License

MIT License - feel free to use and modify as needed.

> [!CAUTION]
> **Do not sell this software.** This project is free and open-source. Selling or commercializing this software violates the spirit of the project and is strictly prohibited.

## Contributing

Feel free to submit issues and enhancement requests!

---

> [!NOTE]
> This tool is for educational purposes. Please respect the terms of service of the respective social media platforms and only download content you have permission to download.
