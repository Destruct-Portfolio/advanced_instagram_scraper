---
tags: 
date: "2024-06-19"
status: draft | edit | finished
---

## How to Start Google Chrome with Persistent Settings

To keep Google Chrome running with the same settings between sessions, follow these steps:

1. **Create a Data Directory**: Choose or create a directory where Chrome will save its user data. For example, you might use `./userDataDir/`.

2. **Use the Same Directory Each Time**: When you start Chrome, make sure to specify this directory so that Chrome uses the same settings each time it runs.

3. **Starting Chrome on Different Operating Systems**:
- **Mac and Windows**: You need to specify the path to the Chrome executable. Use the following command, adjusting the path to your Chrome installation if necessary:
Mac:
```bash zsh ...
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --remote-debugging-port=9222 --no-first-run --no-default-browser-check --user-data-dir=./userDataDir/
```

windows:	
```powershell  
"C:\Program Files\Google\Chrome\Application\chrome.exe" --remote-debugging-port=9222 --no-first-run --no-default-browser-check --user-data-dir="%cd%\userDataDir\"
```


- **Linux**: Typically, you can use the same command without specifying the path to the Chrome executable:

 ```bash
      google-chrome --remote-debugging-port=9222 --no-first-run --no-default-browser-check --user-data-dir=./userDataDir/
      ```

This command starts Chrome with the specified user data directory and enables remote debugging, prevents the first-run experience, and skips the default browser check.

**Note**: Replace `./userDataDir/` with the actual path to your desired data directory.

### Docker 
 i have broken up the docker into 2 dockerfiles , the first one for the application and the second one for scraper-server

1. Front-end application 
```shell bash-linux
# Build the Docker image
docker build -t my-vite-app . 

# Run the Docker container 
docker run -p 3000:3000 my-vite-app
```

2. scraper-server 
```shell bash-linux  
# Build the Docker image
docker build -t puppeteer-server . 

# Run the Docker container 
sudo docker run -p 3002:3002 -v "$(pwd)/output:/app/output" puppeeteer-server
```


This provides clear steps for building and running Docker containers for both the front-end application and the scraper-server. 

!important: please make sure you run the browser first and then the containers after because the scraper-server will fail if it doesn't find its appropriate browser its a little downside to making the browser persist its history 


the output will be in a file named output there is already an example output there.
