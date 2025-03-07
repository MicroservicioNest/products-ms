process.loadEnvFile();

export const { NATS_SERVER: natsServer = '' } = process.env;
