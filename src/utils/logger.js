const {
  createLogger, format, transports, config,
} = require('winston');

const logger = createLogger({
  level: 'debug',
  levels: config.npm.levels,
  format: format.combine(
    format.padLevels(),
    format.colorize(),
    format.splat(),
    format.simple(),
  ),
  transports: [
    new transports.Console(),
  ],
  exceptionHandlers: [
    new transports.Console({
      format: format.errors(),
    }),
  ],
  rejectionHandlers: [new transports.Console()],
});

module.exports = {
  logger,
};
