export interface ServerConfig {
  port: number;
  nodeEnv: string;
  corsOrigin: string;
  jwtSecret: string;
}

export interface PusherConfig {
  appId: string;
  key: string;
  secret: string;
  cluster: string;
  useTLS: boolean;
}