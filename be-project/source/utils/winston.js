import { createLogger, format, transports } from 'winston';
const { combine, timestamp, label, printf } = format;

const myFormat = printf(({ level, message, label, timestamp }) => {
  return `Time: ${timestamp}; Method: ${message.method}; Payload: ${JSON.stringify(message.payload)}.`;
});

export const logger = createLogger({
  level: 'debug',
  format: combine(
    timestamp(),
    myFormat
  ),
  transports: []
})

if (process.env.NODE_ENV !== 'production') {
    logger.add(new transports.Console());
}
