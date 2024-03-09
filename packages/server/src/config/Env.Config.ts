import { ConfigModuleOptions } from '@nestjs/config';

export const ENV_CONFIG: ConfigModuleOptions = {
    envFilePath: ['.env', '.env.local'],
};
