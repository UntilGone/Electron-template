
const { app, BrowserWindow } = require('electron');
const { initDebugger } = require('./utils/debugger');
const url = require('url') ;
const path = require('path');

let mainWindow;

// const installExtensions = async () => {
//   console.log('Running in development');
//   const { default: installExtension, REACT_DEVELOPER_TOOLS, REDUX_DEVTOOLS } = require('electron-devtools-installer');
//   [REACT_DEVELOPER_TOOLS, REDUX_DEVTOOLS].forEach(extension => {
//     installExtension(extension)
//       .then((name:string) => console.log(`Added Extension: ${name}`))
//       .catch((err:any) => console.log('An error occurred: ', err));
//   });
// };

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('ready', async () => {
  mainWindow = new BrowserWindow({
    show: false,
    width: 1024,
    height: 728
  });
  if (process.env.NODE_ENV === 'development') {
    initDebugger();
    // await installExtensions();
    // 开发环境下的时候加载的是远程地址
    mainWindow.loadURL('http://localhost:8080');
  } else {
    // 生产环境下加载的是本地文件
    mainWindow.loadURL(url.format({
      pathname: path.join(__dirname, '../../build/index.html'),
      protocol: 'file:',
      slashes: true
    }));
  }
 
  mainWindow.on('ready-to-show', () => {
    mainWindow.show();
  })

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  // Remove this if your app does not use auto updates
  // eslint-disable-next-line
  // new AppUpdater();
});
