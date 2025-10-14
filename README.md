### BLUUPAY ###

1. Auth: Better-Auth && API Docs (Scalar) **Done**
2. Workflow: TemporalIO && Emails **Done**
3. Optimization: Fastify + Bun *Suspended*: run with `bun --bun start:dev`
4. Database: MikroORM + Kysely? (Redis Cache)
5. Security: Throttler

### HOOKS ###

1. Create AuthSessionUser && Create User
2. Create User Workflow: 
  - Palmpay & Pouchii accounts simultaneously
3. Onboarding Workflow:
  - Create Business, Roles, Location
  - Create Plan


let metadataCacheConfig: {
  enabled: boolean;
  adapter: typeof GeneratedCacheAdapter | undefined;
  options: any;
} = {
  enabled: true,
  adapter: undefined,
  options: {},
};

if (isProd) {
  metadataCacheConfig = {
    enabled: true,
    adapter: GeneratedCacheAdapter,
    options: { data: {} },  // provides the metadata bundle directly
  };
} else {
  // In dev you can use default FileCacheAdapter (caching to temp dir)
  metadataCacheConfig = {
    enabled: true,
    adapter: undefined,  // default FileCacheAdapter
    options: { cacheDir: './temp' },
  };
}