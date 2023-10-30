const os = require('os');

module.exports = {
    apps : [{
        name: "liars-dice-server",
        script: "dist/index.js",
        time: true,
        watch: false,
        // instances: os.cpus().length,
        instances: 1,
        exec_mode: 'fork',
        wait_ready: true,
        env_production: {
            NODE_ENV: 'production'
        }
    }],
};
 