# Combustion

## Introduction

Combustion is a sleek, modern web interface for [Transmission](https://transmissionbt.com)

### __Note__
Because Combustion is based on the project ['React-transmission'](https://github.com/fcsonline/react-transmission) and the toolkit ['React-toolbox'](https://github.com/react-toolbox/react-toolbox) which are not seems to be maintained anymore, I provide this updated version of the original project ([sources](https://github.com/Secretmapper/combustion)) that brings dark theme, some small redesign and fixes.


### __Changelog__
- Add theme manager and a dark theme from [Dark-Combustion](https://github.com/SebDanielsson/dark-combustion).
- Implement missing Blocklist setting feature.
- Add new 'sort direction' option.
- Fix missing Favicon.
- Fix default download dir path not showing when add torrent dialog renders.
- Various small improvements:
  - Redesign Files tabs with background and icons.
  - Add context icons to dialogs. 

## Installation

Latest Releases are available at: `https://github.com/pakaoraki/combustion/archive/release.zip`

### Install by changing Default Web Theme

Simply move the files from the release archives (unzipped) to Transmission's web theme folder:

Linux: `~/.local/share/transmission/web/` (Kodi: `/usr/share/transmission/web/`)

OSX: `/Applications/Transmission.app/Contents/Resources/web/`

### Install through Docker

```bash
sudo docker build -t combustion .
sudo docker run -d --restart=always -p 80:80 --link some-transmission container combustion
```

### Install by pointing transmission to a custom directory

Transmission can allow you to point to a different web theme using the environment variable `TRANSMISSION_WEB_HOME`.

Move the files from the released archives (unzipped) to a folder (i.e. `~/.combustion/combustion-release`). Then point the environment variable to that location (`export TRANSMISSION_WEB_HOME="$HOME/.combustion/combustion-release"`)

Example script when using the transmission daemon:

```
Prepare the paths
mkdir ~/.combustion && cd ~/.combustion

Download and unzip the new theme into path ~/.combustion:
rm -f release.zip && wget https://github.com/Secretmapper/combustion/archive/release.zip && unzip release.zip;

Edit environment with "vi ~/.profile" and add/replace as below:
export TRANSMISSION_WEB_HOME="$HOME/.combustion/combustion-release"

Edit crontab with "crontab -e" and replace as below:
@reboot export TRANSMISSION_WEB_HOME="$HOME/.combustion/combustion-release" && /usr/local/bin/transmission-daemon

Stop then restart the daemon:
export TRANSMISSION_WEB_HOME="$HOME/.combustion/combustion-release" && transmission-stop && transmission-daemon;
```

## Build

1. Install yarn utility ([docs](https://yarnpkg.com/getting-started/install)).
2. Install modules and dependencies

```yarn install```

3. Start build

```yarn build```

Or

```
mkdir ../combustion-release
./publish.sh
```

Test before build:

```yarn start```

## Technology

- [Webpack](https://webpack.github.io/)
- [React](https://facebook.github.io/react/)
- [Mobx](https://mobxjs.github.io/mobx/)
- [CSS modules](https://github.com/css-modules/css-modules)


## Special Thanks

This project is built from the excellent transmission web interface reimplementation [react-transmission](https://github.com/fcsonline/react-transmission)

Version 7.0 contributions:
- __Kochinc__ for implementing missing blocklist feature ([source](https://github.com/kochinc/combustion/commit/898516a7fffced74a9b2fe9d5c19665d897591e4)).
- __juan__ for fixing issues ([Favicon](https://github.com/juanrarodriguez18/combustion/commit/3f0278684cd0bc3a4c2589d5fe30ee347bc067c5), [Torrent path dir](https://github.com/juanrarodriguez18/combustion/commit/a774f778764eb5cb9e5fd7e3353963bee68ba58f))
- __Pierowheelz__ for implementing 'sort direction' feature ([source](https://github.com/Pierowheelz/combustion/commits/master)).


## License

MIT
