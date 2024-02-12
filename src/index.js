import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import '@/assets/reset.min.css'
import 'lib-flexible'

import './index.less'

// 处理最大宽度
(function () {
  const handleMaxWidth = () => {
    const html = document.documentElement,
      root = document.getElementById('root'),
      deviceWidth = html.clientWidth

    root.style.maxWidth = '750px'

    if (deviceWidth >= 750) {
      html.style.fontSize = '75px'
    }
  }

  handleMaxWidth()
})()

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
