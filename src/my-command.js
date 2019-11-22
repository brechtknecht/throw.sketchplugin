import BrowserWindow from 'sketch-module-web-view'
import { getWebview } from 'sketch-module-web-view/remote'
import UI from 'sketch/ui'

import config from './config'

var Artboard = require('sketch/dom').Artboard
var document = require('sketch/dom').getSelectedDocument()

const webviewIdentifier = 'confetti-boy.webview'

export default function () {
  const options = {
    identifier: webviewIdentifier,
    width: 600,
    height: 510,
    show: false
  }

  // Returns if no Layers are selected
  if(document.selectedLayers.isEmpty) {
    UI.message('No layers selected — Getchu some...');
    return;
  }

  const browserWindow = new BrowserWindow(options)

  // only show the window when the page has loaded to avoid a white flash
  browserWindow.once('ready-to-show', () => {
    browserWindow.show()
  })

  const webContents = browserWindow.webContents

  // print a message when the page loads
  webContents.on('did-finish-load', () => {
    UI.message('UI loaded!')
  })

  // add a handler for a call from web content's javascript
  webContents.on('submit', data => {
    // closes webview if data is transfered
    getWebview(webviewIdentifier).close();

    // calls the manipulation methods
    config.methods.execute(data, document);

    UI.message('Layers updated! ☄️');
  });
  
  browserWindow.loadURL(require('../resources/webview.html'))
}

// When the plugin is shutdown by Sketch (for example when the user disable the plugin)
// we need to close the webview if it's open
export function onShutdown() {
  const existingWebview = getWebview(webviewIdentifier)
  if (existingWebview) {
    existingWebview.close()
  }
}
