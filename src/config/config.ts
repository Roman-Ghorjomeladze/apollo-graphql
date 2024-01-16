import dotenv from 'dotenv-safe';

class _Config {
  private JWT_SECRET: string;

  constructor() {
    dotenv.config();
    this.JWT_SECRET = process.env.JWT_SECRET as string;
  }

  getJWTSecret() {
    return this.JWT_SECRET;
  }
}

export const Config = new _Config();
