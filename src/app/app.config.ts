import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
//estandar para consumir servicios rest o apis del protocolo rest
import { provideHttpClient } from '@angular/common/http';


export const appConfig: ApplicationConfig = {
// la función provideHttpClient nos permite mediante inyección de dependecias utlilizar metodos o funciones del http client 
  providers: [provideRouter(routes), provideHttpClient()],
};
