# Sia Host Manager

![siacentral+sia](https://imgur.com/MtDubn1.png)

An improved interface for Sia network hosts. Get accurate and complete statistics and 
monitor the health of your host. Replaces or runs alongside Sia-UI.

Sia Host Manager combines information from your Sia node as well as information from the blockchain to display more accurate financial and health statistics.

## Features

+ Monitors connection status
+ Add, remove and resize storage folders
+ Get detailed information about ongoing, completed, and failed storage obligations
+ Change host configuration
+ Pin configuration prices to fiat or cryptocurrencies
+ Display financials in different fiat or cryptocurrencies

## Screenshots

![alerts](https://siacentral-public.s3.us-east-2.amazonaws.com/res/alerts.png)
![dashboard](https://siacentral-public.s3.us-east-2.amazonaws.com/res/dashboard.png)
![storage](https://siacentral-public.s3.us-east-2.amazonaws.com/res/storage.png)
![contracts](https://siacentral-public.s3.us-east-2.amazonaws.com/res/contracts.png)
![config](https://siacentral-public.s3.us-east-2.amazonaws.com/res/config.png)

## Project setup

1. Install dependencies using `npm`

```
npm install
```

2. Add siad binaries for your platform to `build/bin/{os}` you can get the latest binaries from https://sia.tech/get-started

+ Linux: `build/bin/linux/siad`
+ OS X: `build/bin/mac/siad`
+ Windows: `build/bin/win/siad`


### Development

Starts the http server, hot-reloading, and electron

```
npm run serve
```

### Build and Package

Builds and packages the app for the current platform

```
npm run build
```

