const { override, setWebpackTarget } = require('customize-cra');  

module.exports = override(  
  setWebpackTarget('node')  // target Node.js  
);  


// add this to package.json if using customize-cra
  "scripts": {  
  "start": "react-app-rewired start",  
  "build": "react-app-rewired build",  
  "test": "react-app-rewired test",  
  "eject": "react-scripts eject"  
}  