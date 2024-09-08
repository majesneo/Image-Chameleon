import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

/** @type {import('next').NextConfig} */

const envFilePath =
  process.env.NODE_ENV === 'development' ? '.env.dev' : '.env';

const fullPath = path.resolve(process.cwd(), envFilePath);

if (fs.existsSync(fullPath)) {
  dotenv.config({ path: fullPath });
} else {
  dotenv.config();
}

const nextConfig = {
  reactStrictMode: true,
  env: {
    API_URL: process.env.API_URL
  }
};

export default nextConfig;
