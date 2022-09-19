module.exports = {
  images: {
    domains: [process.env.IMAGES_DOMAIN_1, process.env.IMAGES_DOMAIN_2, "masto.cloud.joingardens.com"],
  },
  webpack: (config, options) => {
    config.module.rules.push({
      test: /\.mjs$/,
      include: /node_modules/,
      type: 'javascript/auto'
    })

    return config
  },
}