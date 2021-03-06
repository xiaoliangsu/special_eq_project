require('./check-versions')()

var config = require('../config')
if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV)
}

var opn = require('opn')
var path = require('path')
var express = require('express')
var webpack = require('webpack')
var proxyMiddleware = require('http-proxy-middleware')
var webpackConfig = require('./webpack.dev.conf')

// default port where dev server listens for incoming traffic
var port = process.env.PORT || config.dev.port
// automatically open browser, if not set will be false
var autoOpenBrowser = !!config.dev.autoOpenBrowser
// Define HTTP proxies to your custom API backend
// https://github.com/chimurai/http-proxy-middleware
var proxyTable = config.dev.proxyTable

var app = express()
var appData = require("../data.json");
var seller = appData.seller;  //获取数据
var goods = appData.goods;
var userInfo = appData.userInfo;
var orderInfo = appData.orderInfo;
var RegistOne = appData.RegistOne;
var RegistTwo = appData.RegistTwo;
var RegistThree = appData.RegistThree;


var apiRoutes = express.Router();
var bodyParser = require('body-parser');
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}));
// parse application/json
app.use(bodyParser.json());


apiRoutes.get("/seller", function (req, res) {
  res.json({
    errno: 0,
    data: seller

  });
});

apiRoutes.post("/login", function (req, res) {
  if (req.body.username && req.body.password) {
    console.log(req.body.username);
    res.json({
      success: true,
      username: req.body.username,
      author_key: req.body.author_key,
    });
  } else {
    res.json({
      state: 0
    });
  }
});
apiRoutes.get("/logout", function (req, res) {
  res.json({
    success: orderInfo.orders
  });
});


apiRoutes.get("/getorders", function (req, res) {
  res.json({
    success: orderInfo.orders

  });
});

apiRoutes.get("/getWaitAcccpetOrders", function (req, res) {
  res.json({
    success: orderInfo.orders,
    state: "waitAccept"

  });
});
apiRoutes.get("/getAcceptedOrders", function (req, res) {
  res.json({
    success: orderInfo.orders,
    state: "accepted"

  });
});

apiRoutes.get("/getAccReason", function (req, res) {
  res.json({
    success: orderInfo.orders,
    state: false,
    reason: "不通过"

  });
});

apiRoutes.get("/getApprovaledOrders", function (req, res) {
  res.json({
    success: orderInfo.orders,
    state: "approvaled"

  });
});

apiRoutes.get("/getWaitApprovalOrders", function (req, res) {
  res.json({
    success: orderInfo.orders,
    state: "waitApproval"

  });
});


apiRoutes.post("/submitSetInfo", function (req, res) {
  if (req.body) {
    console.log(req.body);
    res.json({
      success: req.body,
      //username:req.body.username
    });
  } else {
    res.json({
      state: 0
    });
  }
});

apiRoutes.get("/getRegistOne", function (req, res) {
  res.json({
    success: RegistOne,
    pdfUrlDefault:[
      {
        'name': 'pdf1',
        'url': 'https://cdn.mozilla.net/pdfjs/tracemonkey.pdf'
      },
      {
        'name': 'pdf2',
        'url': 'https://cdn.mozilla.net/pdfjs/tracemonkey.pdf'
      }
    ],
    pdfUrl: {
      锅炉能效证明: 'https://cdn.mozilla.net/pdfjs/tracemonkey.pdf',
      水壶: 'https://cdn.mozilla.net/pdfjs/tracemonkey.pdf',
      水壶2: 'https://cdn.rawgit.com/mozilla/pdf.js/c6e8ca86/test/pdfs/calrgb.pdf',
      水壶3: 'https://cdn.rawgit.com/mozilla/pdf.js/c6e8ca86/test/pdfs/annotation-link-text-popup.pdf',
      水壶4: 'https://cdn.rawgit.com/sayanee/angularjs-pdf/68066e85/example/pdf/relativity.protected.pdf',
    },
    accReason: "不通过，因为缺少材料",
    accState: false,
    approvalReason: "审批不通过，因为不合格",
    approvalState: false,
    appComName:"申请单位－名字"


  });
  console.log(RegistOne);
});
apiRoutes.get("/getRegistTwo", function (req, res) {
  res.json({
    success: RegistTwo,
    pdfUrlDefault:[
      {
        'name': 'pdf1',
        'url': 'https://cdn.mozilla.net/pdfjs/tracemonkey.pdf'
      },
      {
        'name': 'pdf2',
        'url': 'https://cdn.mozilla.net/pdfjs/tracemonkey.pdf'
      }
    ],
    pdfUrl: {
      锅炉能效证明: 'https://cdn.mozilla.net/pdfjs/tracemonkey.pdf',
      水壶: 'https://cdn.mozilla.net/pdfjs/tracemonkey.pdf',
      水壶2: 'https://cdn.rawgit.com/mozilla/pdf.js/c6e8ca86/test/pdfs/calrgb.pdf',
      水壶3: 'https://cdn.rawgit.com/mozilla/pdf.js/c6e8ca86/test/pdfs/annotation-link-text-popup.pdf',
      水壶4: 'https://cdn.rawgit.com/sayanee/angularjs-pdf/68066e85/example/pdf/relativity.protected.pdf',
    },
    accReason: "不通过，因为缺少材料",
    accState: false,
    approvalReason: "审批不通过，因为不合格",
    approvalState: false,
    appComName:"申请单位－名字"


  });
  console.log(RegistTwo);

});
apiRoutes.get("/getRegistThree", function (req, res) {
  res.json({
    success: RegistThree,
    pdfUrlDefault:[
      {
        'name': 'pdf1',
        'url': 'https://cdn.mozilla.net/pdfjs/tracemonkey.pdf'
      },
      {
        'name': 'pdf2',
        'url': 'https://cdn.mozilla.net/pdfjs/tracemonkey.pdf'
      }
    ],
    pdfUrl: {
      锅炉能效证明: 'https://cdn.mozilla.net/pdfjs/tracemonkey.pdf',
      水壶: 'https://cdn.mozilla.net/pdfjs/tracemonkey.pdf',
      水壶2: 'https://cdn.rawgit.com/mozilla/pdf.js/c6e8ca86/test/pdfs/calrgb.pdf',
      水壶3: 'https://cdn.rawgit.com/mozilla/pdf.js/c6e8ca86/test/pdfs/annotation-link-text-popup.pdf',
      水壶4: 'https://cdn.rawgit.com/sayanee/angularjs-pdf/68066e85/example/pdf/relativity.protected.pdf',
    },
    accReason: "不通过，因为缺少材料",
    accState: false,
    approvalReason: "审批不通过，因为不合格",
    approvalState: false,
    appComName:"申请单位－名字"


  });
  console.log(RegistThree);
});

apiRoutes.get("/userInfo", function (req, res) {
  res.json({
    errno: 0,
    data: userInfo

  });
});


apiRoutes.get("/goods", function (req, res) {
  res.json({
    errno: 0,
    data: goods
  });
});

apiRoutes.get("/ratings", function (req, res) {
  res.json({
    errno: 0,
    data: ratings

  });
});

app.use("/api", apiRoutes);

var compiler = webpack(webpackConfig)

var devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output.publicPath,
  quiet: true
})

var hotMiddleware = require('webpack-hot-middleware')(compiler, {
  log: () => {
  }
})
// force page reload when html-webpack-plugin template changes
compiler.plugin('compilation', function (compilation) {
  compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
    hotMiddleware.publish({action: 'reload'})
    cb()
  })
})

// proxy api requests
Object.keys(proxyTable).forEach(function (context) {
  var options = proxyTable[context]
  if (typeof options === 'string') {
    options = {target: options}
  }
  app.use(proxyMiddleware(options.filter || context, options))
})

// handle fallback for HTML5 history API
app.use(require('connect-history-api-fallback')())

// serve webpack bundle output
app.use(devMiddleware)

// enable hot-reload and state-preserving
// compilation error display
app.use(hotMiddleware)

// serve pure static assets
var staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory)
app.use(staticPath, express.static('./static'))

var uri = 'http://localhost:' + port

var _resolve
var readyPromise = new Promise(resolve => {
  _resolve = resolve
})

console.log('> Starting dev server...')
devMiddleware.waitUntilValid(() => {
  console.log('> Listening at ' + uri + '\n')
  // when env is testing, don't need open it
  if (autoOpenBrowser && process.env.NODE_ENV !== 'testing') {
    opn(uri)
  }
  _resolve()
})

var server = app.listen(port)

module.exports = {
  ready: readyPromise,
  close: () => {
    server.close()
  }
}
