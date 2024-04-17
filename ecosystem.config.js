module.exports = {
  apps: [
    {
      name: "unicorn-shop-list-api",
      script: "./bin/www",
      watch: ["./"],
      watch_delay: 400,
      ignore_watch: ["node_modules", ".git"],
      wait_ready: true,
      shutdown_with_message: true,
      watch_options: {
        followSymlinks: false,
      },
      env_development: {
        NODE_ENV: "development",
      },
      env_production: {
        NODE_ENV: "production",
      },
    },
  ],
};
