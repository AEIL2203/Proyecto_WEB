import { mergeApplicationConfig, ApplicationConfig, PLATFORM_ID } from '@angular/core';
import { provideServerRendering, ɵSERVER_CONTEXT as SERVER_CONTEXT } from '@angular/platform-server';
import { appConfig } from './app.config';
import { StorageService } from './core/services/storage.service';

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(),
    {
      provide: StorageService,
      useFactory: () => ({
        getItem: () => null,
        setItem: () => {},
        removeItem: () => {},
        clear: () => {}
      })
    },
    { provide: SERVER_CONTEXT, useValue: 'ssr' },
    { provide: PLATFORM_ID, useValue: 'server' }
  ]
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
