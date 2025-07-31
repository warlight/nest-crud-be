import { INestApplication } from '@nestjs/common';

export function logRoutes(app: INestApplication) {
    const server = app.getHttpServer();
    const router = server._events.request.router; // Express router
    const routes: Object[] = [];

    router.stack.forEach((layer) => {
        if (layer.route) {
            const path: string = layer.route?.path;
            const methods: string = Object.keys(layer.route.methods).join(', ').toUpperCase();
            routes.push({ path, methods });
        }
    });

    console.table(routes);
}