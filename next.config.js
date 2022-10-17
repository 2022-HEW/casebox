/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
}

module.exports = nextConfig


module.exports = {
  env: {
    MYSQL_HOST: "127.0.0.1",
    MYSQL_DATABASE: "dnpk_dnpk_oes",
    MYSQL_USER: "root",
    MYSQL_PASSWORD: "",
  },
  // webpack: {
  //   target: "node"
  // },
  webpack: {
    target: "node"
    },
}