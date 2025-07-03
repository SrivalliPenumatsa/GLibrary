import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
        config.module.rules.push({
          test: /\.pdf$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: '[path][name].[ext]',
              },
            },
            {
              loader: 'pdf-loader',
            },
          ],
        });
    
        return config;
      },
};

export default nextConfig;
