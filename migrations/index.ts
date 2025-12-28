import * as migration_20251123_134529 from './20251123_134529';

export const migrations = [
  {
    up: migration_20251123_134529.up,
    down: migration_20251123_134529.down,
    name: '20251123_134529'
  },
];
