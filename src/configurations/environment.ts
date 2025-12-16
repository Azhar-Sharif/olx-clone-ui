interface IEnvironmentConfig {
  api: {
    baseUrl: string;
    timeout: number;
  };
  app: {
    name: string;
    environment: 'development' | 'production' | 'staging';
  };
}

const getEnvironmentConfig = (): IEnvironmentConfig => {
  const isDevelopment = import.meta.env.MODE === 'development';

  const config: IEnvironmentConfig = {
    api: {
      baseUrl: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api',
      timeout: parseInt(import.meta.env.VITE_API_TIMEOUT || '10000', 10),
    },
    app: {
      name: import.meta.env.VITE_APP_NAME || 'OLX Clone',
      environment: (import.meta.env.VITE_ENVIRONMENT ||
        (isDevelopment ? 'development' : 'production')) as
        | 'development'
        | 'production'
        | 'staging',
    },
  };

  return config;
};

export const environmentConfig = getEnvironmentConfig();

export const getApiConfig = () => environmentConfig.api;
export const getAppConfig = () => environmentConfig.app;
