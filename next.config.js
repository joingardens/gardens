module.exports = {
  images: {
    domains: [process.env.IMAGES_DOMAIN_1, process.env.IMAGES_DOMAIN_2],
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