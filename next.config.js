 
/** @type {import('next').NextConfig} */
const { withNextVideo } = require('next-video/process');
 
const nextConfig = {
  images: {
    domains: ["utfs.io"],
  },
}; 
 
module.exports = withNextVideo(nextConfig);