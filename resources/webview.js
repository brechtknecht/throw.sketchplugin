import config from '../src/config'

// disable the context menu (eg. the right click menu) to have a more native feel
document.addEventListener('contextmenu', (e) => {
  e.preventDefault()
})

// call the plugin from the webview
document.getElementById('submit').addEventListener('click', () =>  {
  window.postMessage('submit', config.data);
})

// Input field Trigger
document.getElementById('columns').addEventListener('input', (e) =>  {
  config.data.layout.columns = e.target.value;
})

document.getElementById('rows').addEventListener('input', (e) =>  {
  config.data.layout.rows = e.target.value;
})

// Radio Buttons Trigger
document.getElementById('opacity').addEventListener('click', () =>  {
  config.data.options.random.opacity = true;
})

document.getElementById('size').addEventListener('click', () =>  {
  config.data.options.random.size = true;
})

document.getElementById('rotation').addEventListener('click', () =>  {
  config.data.options.random.rotation = true;
})

document.getElementById('flip').addEventListener('click', () =>  {
  config.data.options.random.flip = true;
})

// call the wevbiew from the plugin
window.setRandomNumber = (randomNumber) => {
  document.getElementById('answer').innerHTML = 'Random number from the plugin: ' + randomNumber
}
