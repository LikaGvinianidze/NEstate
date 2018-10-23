module.exports = {
  apps : [

    {
      name      : 'NESTATE',
      script    : 'dist/main.js',
      env: {
        COMMON_VARIABLE: 'true'
      },
      env_production : {
        NODE_ENV: 'production'
      }
    }
  ],

  deploy : {
    production : {
      user : 'neso',
      host : '46.101.217.216',
      ref  : 'origin/staging',
      repo : 'git@bitbucket.org:nesosolutions/nestate.git',
      path : '/home/neso/apps/nestate',
      'post-deploy' : 'npm install && tsc && npm run ejs && npm run assets && pm2 reload ecosystem.config.js --env production'
    }
  }
};
