import { Application } from "express";
import { createProxyMiddleware } from "http-proxy-middleware";

interface Route {
    url: string;
    proxy: {
        target: string;
        changeOrigin: boolean;
        pathRewrite: { [key: string]: string };
    };
}

const setupProxies = (app: Application, routes: Route[]) => {
    routes.forEach(r => {
        app.use(r.url, createProxyMiddleware(r.proxy));
    });
};

export default setupProxies;
