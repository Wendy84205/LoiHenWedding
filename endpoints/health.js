import {
  allowMethod,
  getCommerceConfigurationStatus,
  getServiceClient,
  probeCommerceRuntime,
} from '../server/commerce.js';

export default async function handler(req, res) {
  if (!allowMethod(req, res, ['GET'])) return;
  const configuration = getCommerceConfigurationStatus();
  let runtime = { checked: false, database: false, schema: false, storage: false, auth: false };
  if (configuration.backendConfigured) {
    try {
      runtime = await probeCommerceRuntime(getServiceClient());
    } catch {
      runtime = { checked: true, database: false, schema: false, storage: false, auth: false };
    }
  }
  const runtimeReady = runtime.checked && runtime.database && runtime.schema && runtime.storage && runtime.auth;
  const ready = configuration.productionConfigured && runtimeReady;
  const missing = [
    ...configuration.missing,
    ...(runtime.checked ? Object.entries(runtime)
      .filter(([name, value]) => name !== 'checked' && !value)
      .map(([name]) => `runtime.${name}`) : ['runtime.notChecked']),
  ];
  res.status(200).json({
    ok: true,
    status: ready ? 'ready' : configuration.backendConfigured ? 'degraded' : 'unconfigured',
    ready,
    commerceConfigured: configuration.backendConfigured,
    productionConfigured: configuration.productionConfigured,
    checks: { environment: configuration.checks, runtime },
    missing,
    timestamp: new Date().toISOString(),
  });
}
