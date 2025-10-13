import { ClassSerializerInterceptor, ValidationPipe, VersioningType } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { apiReference } from '@scalar/nestjs-api-reference';
import * as packageJson from '../package.json';
import { AppModule } from './app.module';

// const scopes: string[] = ['openid', 'profile', 'email', 'offline_access'];

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bodyParser: false,
  });

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1'
  });
  app.enableCors({
    origin: [
      'http://localhost:3000',  // your Next.js dev URL
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    // credentials: true,
    // methods: ['GET', 'PATCH', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'HEAD'],
    allowedHeaders: [
      'Content-Type',
      'Authorization',
      'X-Requested-With',
      'Accept',
    ],
    credentials: true,
  });
  app.enableShutdownHooks();

  // const config: ConfigService = app.get(ConfigService);

  // const port: number = config.getOrThrow<number>('APP_PORT');
  // const clientId: string = config.getOrThrow<string>('OPENAPI_CLIENT_ID');
  // const clientSecret: string = config.getOrThrow<string>(
  //   'OPENAPI_CLIENT_SECRET',
  // );
  // const authority: string = config.getOrThrow<string>('IDP_AUTHORITY');

  let redirectUri: string;

  const documentBuilder = new DocumentBuilder()
    .setTitle('BluuPay API Server')
    .setDescription('The API Server for Bluupay')
    // .setTermsOfService('http://swagger.io/terms/')
    // .setExternalDoc('Find out more about Swagger', 'http://swagger.io/')
    // .setContact('Contact the developer', '', 'mail@example.com')
    // .setLicense('Apache 2.0', 'http://www.apache.org/licenses/LICENSE-2.0.html')
    .setVersion(packageJson.version)
    .addTag('Core')
    .addTag('Auth')
    .addBearerAuth()
    // .addSecurity('zitadel-jwt', {
    //   type: 'openIdConnect',
    //   openIdConnectUrl: `${authority}/.well-known/openid-configuration`,
    //   name: 'Zitadel',
    // })

  // if (config.get<string>('NODE_ENV') !== 'production') {
  //   documentBuilder.addServer(`http://localhost:${port}`);
  //   redirectUri = `http://localhost:${port}`;
  // } else {
  //   redirectUri = 'YOUR PROD URL HERE';
  //   throw new Error('SET YOUR PROD URL HERE AND REMOVE THIS THROW');
  // }

  const document = SwaggerModule.createDocument(app, documentBuilder.build())

  app.use(
    '/reference',
    apiReference({
      content: document,
      pageTitle: 'BluuPay API Reference',
      persistAuth: true,
      // withFastify: true,
      // authentication: {
      //   preferredSecurityScheme: 'oauth2',
      //   securitySchemes: {
      //     oauth2: {
      //       flows: {
      //         authorizationCode: {
      //           // Provide a token that is used instead of calling the auth provider
      //           token: 'auth code token',
      //           // Prefill client id or secret
      //           'x-scalar-client-id': clientId,
      //           clientSecret,
      //           // Overwrite values from the OpenAPI document
      //           authorizationUrl: 'https://accounts.bluupay.co/oauth2/authorize',
      //           tokenUrl: 'https://accounts.bluupay.co/oauth2/token',
      //           'x-scalar-redirect-uri': 'https://your-app.com/callback',
      //           // Use PKCE for additional security: 'SHA-256', 'plain', or 'no'
      //           'x-usePkce': 'SHA-256',
      //           // Preselected scopes
      //           selectedScopes: scopes,
      //           // Set additional query parameters for the Authorization request
      //           // 'x-scalar-security-query': {
      //           //   prompt: 'consent',
      //           //   audience: 'scalar'
      //           // },
      //           // Set additional body parameters for the Token request
      //           // 'x-scalar-security-body': {
      //           //   audience: 'scalar'
      //           // },
      //           // Custom token name for non-standard OAuth2 responses (default: 'access_token')
      //           // 'x-tokenName': 'custom_access_token',
      //           // Specify where OAuth2 credentials should be sent: 'header' or 'body'
      //           'x-scalar-credentials-location': 'header'
      //         },
      //         // clientCredentials: {
      //         //   token: 'client credentials token',
      //         //   'x-scalar-client-id': 'your-client-id',
      //         //   clientSecret: 'your-client-secret',
      //         //   tokenUrl: 'https://auth.example.com/oauth2/token',
      //         //   // Preselected scopes
      //         //   selectedScopes: ['profile', 'api:read'],
      //         //   // Custom token name for non-standard OAuth2 responses (default: 'access_token')
      //         //   'x-tokenName': 'custom_access_token',
      //         //   // Specify where OAuth2 credentials should be sent: 'header' or 'body'
      //         //   'x-scalar-credentials-location': 'body'
      //         // },
      //         // implicit: {
      //         //   token: 'implicit flow token',
      //         //   'x-scalar-client-id': 'your-client-id',
      //         //   authorizationUrl: 'https://auth.example.com/oauth2/authorize',
      //         //   'x-scalar-redirect-uri': 'https://your-app.com/callback',
      //         //   // Preselected scopes
      //         //   selectedScopes: ['openid', 'profile'],
      //         //   // Custom token name for non-standard OAuth2 responses (default: 'access_token')
      //         //   'x-tokenName': 'custom_access_token'
      //         // },
      //         // password: {
      //         //   token: 'password flow token',
      //         //   'x-scalar-client-id': 'your-client-id',
      //         //   clientSecret: 'your-client-secret',
      //         //   tokenUrl: 'https://auth.example.com/oauth2/token',
      //         //   username: 'default-username',
      //         //   password: 'default-password',
      //         //   selectedScopes: ['profile', 'email'],
      //         //   // Custom token name for non-standard OAuth2 responses (default: 'access_token')
      //         //   'x-tokenName': 'custom_access_token',
      //         //   // Specify where OAuth2 credentials should be sent: 'header' or 'body'
      //         //   'x-scalar-credentials-location': 'header'
      //         // },
      //       },
      //       // Set default scopes for all flows
      //       'x-default-scopes': scopes
      //     }
      //   }
      // }
    }),
  );

  await app.listen(process.env.PORT ?? 3333);
}

bootstrap().catch((error) => {
  console.error("Error starting application:", error);
  process.exit(1);
});
