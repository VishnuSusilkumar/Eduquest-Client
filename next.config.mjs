/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  images: {
    domains: [
      "lh3.googleusercontent.com",
      "avatars.githubusercontent.com",
      "firebasestorage.googleapis.com",
      "eduquest-elearning.s3.ap-south-1.amazonaws.com",
    ],
  },
};

export default nextConfig;
