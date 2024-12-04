import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'Quick',
  webDir: 'www',
  bundledWebRuntime: false,
  plugins: {
    CapacitorSQLite: {
      androidIsEncrypted: false,
      iosIsEncrypted: false,
      iosDatabaseLocation: 'default'
    }
  }
};

export default config;