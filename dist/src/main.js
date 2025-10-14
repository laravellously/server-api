"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const swagger_1 = require("@nestjs/swagger");
const nestjs_api_reference_1 = require("@scalar/nestjs-api-reference");
const packageJson = __importStar(require("../package.json"));
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, {
        bodyParser: false,
    });
    app.useGlobalPipes(new common_1.ValidationPipe());
    app.useGlobalInterceptors(new common_1.ClassSerializerInterceptor(app.get(core_1.Reflector)));
    app.enableCors({
        origin: "http://localhost:3000",
        credentials: true,
        methods: ['GET', 'PATCH', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'HEAD'],
        allowedHeaders: [
            'Content-Type',
            'Authorization'
        ]
    });
    app.enableShutdownHooks();
    let redirectUri;
    const documentBuilder = new swagger_1.DocumentBuilder()
        .setTitle('BluuPay API Server')
        .setDescription('The API Server for Bluupay')
        .setVersion(packageJson.version)
        .addTag('Core')
        .addTag('Auth')
        .addBearerAuth();
    const document = swagger_1.SwaggerModule.createDocument(app, documentBuilder.build());
    app.use('/reference', (0, nestjs_api_reference_1.apiReference)({
        content: document,
        pageTitle: 'BluuPay API Reference',
        persistAuth: true,
    }));
    await app.listen(process.env.PORT || 10000);
}
bootstrap().catch((error) => {
    console.error("Error starting application:", error);
    process.exit(1);
});
//# sourceMappingURL=main.js.map