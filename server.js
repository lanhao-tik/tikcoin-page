let koa = require("koa");
let staticKoa = require("koa-static");
let app = new koa();

app.use(async (ctx, next) => {
    let start = new Date;
    await next();
    let ms = new Date - start;
    ctx.set('X-Response-Time', ms + 'ms');
});

app.use(async (ctx, next) => {
    let start = new Date;
    await next();
    let ms = new Date - start;
    console.log("%s %s - %sms", ctx.method, ctx.url, ms);
});

app.use(staticKoa("./dist"));

/* 
let httpProxy = require("http-proxy");
let proxy = httpProxy.createProxyServer({});
let config = require("./config/config.json");
app.use(async function (ctx, next) {
    ctx.respond = false;
    proxy.web(ctx.req, ctx.res, { target: config.API });
}); */

const http = require("http");

http.createServer(app.callback()).listen(3000);