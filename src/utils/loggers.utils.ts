import { createLogger, format, transports } from 'winston';
import path from 'path';

const logger = createLogger({
  format: format.combine(
    format.splat(),
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss'
    }),
    format.colorize(),
    format.printf((log) => {
      if (log.stack) return `[${log.timestamp}] [${log.level}] ${log.stack}`;
      return `[${log.timestamp}] [${log.level}] ${log.message}`;
    })
  ),
  transports: [
    new transports.Console(),
    new transports.File({
      level: 'error',
      filename: path.join(__dirname, '../../../logs/errors.log')
    })
  ]
});

export default logger;