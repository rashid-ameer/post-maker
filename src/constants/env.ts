const getEnv = (key: string, defaultValue?: string) => {
  const value = process.env[key] || defaultValue;

  if (value === undefined) {
    throw new Error(`Missing environment variable ${key}`);
  }

  return value;
};

export const PORT = getEnv("PORT", "8000");
export const NODE_ENV = getEnv("NODE_ENV", "development");
export const MONGO_URI = getEnv("MONGO_URI");
