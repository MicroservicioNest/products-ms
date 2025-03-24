if (!process.env.NODE_ENV) {
  process.loadEnvFile();
}

export const { NATS_SERVER: natsServer = '' } = process.env;
