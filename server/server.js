/* eslint-disable no-console, no-use-before-define */
import "babel-polyfill";
import path from 'path';
import fs from 'fs';
import Express from 'express';
import React from 'react';
import {renderToString} from 'react-dom/server';
import {Provider} from 'react-redux';
import {match, RouterContext, createMemoryHistory} from "react-router";

import routes from "../src/routes";
import configureStore from "../src/store/configureStore";

import webpackConfig from '../wp_conf/webpack.config';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

const app = new Express();
const port = 3080;
const assetsPath = "";

if(process.env.NODE_ENV == "dev" || process.env.NODE_ENV == "stg"){
  // Use this middleware to set up hot module reloading via webpack.
  const compiler = webpack(webpackConfig);
  app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: webpackConfig.output.publicPath }));
  app.use(webpackHotMiddleware(compiler));
  // const assetsPath = webpackConfig.output.publicPath;
  app.use(Express.static(path.join(__dirname, "../dist")));
}else{
  app.use(Express.static(path.join(__dirname, "..", webpackConfig.output.publicPath, "dist")));
}

// This is fired every time the server side receives a request
app.use(handleRender);
function handleRender(req, res) {
  const history = createMemoryHistory();
  const store = configureStore({}, history);
  match({routes, location: req.url}, (error, redirectLocation, renderProps)=>{
    if(error){
      res.status(500).send(error.message);
    }else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search);
    }else if (renderProps) {
      let html = renderToString(
        <Provider store={store} key="provider">
          <RouterContext {...renderProps} />
        </Provider>
      );
      html = renderFullPage(html, renderProps);
      res.status(200).send(html);
    }else {
      res.status(200).send(renderPage(assetsPath+req.url.substring(1,req.url.length)+".html"));
    }
  });
}

function renderFullPage(html, initialState) {
  return `
  <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <link rel="shortcut icon" href="/favicon.ico">
        <meta name="format-detection" content="telephone=no"/>
        <link type="text/css" rel="stylesheet" href="${assetsPath}/css/antd.min.css?c=2016"></link>
        <link type="text/css" rel="stylesheet" href="${assetsPath}/css/styles.css?c=2016"></link>
        <script src="//cdnjs.gtimg.com/cdnjs/libs/jquery/2.1.1/jquery.min.js"></script>
        <title>固生堂中医-云药房</title>
      </head>
      <body>
        <div id="app">${html}</div>
        <script src="${assetsPath}/lib.js?c=2016"></script>
        <script src="${assetsPath}/app.js?c=2016"></script>
        <script type="text/javascript">
        </script>
      </body>
    </html>
  `;
}
function renderPage(filename){
  if (fs.existsSync(filename)) {
    return fs.readFileSync(filename).toString('utf8')
  }else {
    return "Server render was Not Found"
  }
}
app.listen(port, (error) => {
  if (error) {
    console.error(error)
  } else {
    console.info(`==> 🌎  Listening on port ${port}. Open up http://localhost:${port}/ in your browser.`)
  }
});
