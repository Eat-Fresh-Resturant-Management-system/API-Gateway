import KeycloakConnect from "keycloak-connect";
import session from "express-session";
import { Express, RequestHandler } from "express"; // Import Express type instead of Application

interface Route {
    url: string;
    auth: boolean;
}

const setupAuth = (app: Express, routes: Route[]) => { // Change Application to Express
    const memoryStore = new session.MemoryStore();
    const keycloak = new KeycloakConnect({ store: memoryStore });

    app.use(session({
        secret: '<RANDOM GENERATED TOKEN>',
        resave: false,
        saveUninitialized: true,
        store: memoryStore
    }));

    app.use(keycloak.middleware());

    routes.forEach(r => {
        if (r.auth) {
            const middleware: RequestHandler = keycloak.protect() as RequestHandler;
            app.use(r.url, middleware, (req, res, next) => {
                next();
            });
        }
    });
};

export default setupAuth;
