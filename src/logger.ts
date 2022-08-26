import pino from 'pino';
import SonicBoom from 'sonic-boom';

export const logger = pino(
  {
    name: 'MonPetitPlacementSDK',
    level: 'trace',
  },
  new SonicBoom({ fd: process.stdout.fd })
);