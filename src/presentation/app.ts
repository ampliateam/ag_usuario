import express from 'express';
import cors from 'cors';
import path from 'path';
import 'reflect-metadata';

import { envs } from '@global/configs/envs';
import '@presentation/_configs/__global';
import {
  verificarSiCorreConDocker,
  validarEnvs,
  cargarEndpoints
} from '@presentation/_helpers';
import {
  inicializacion,
  mwManejadorDeError
} from '@presentation/_middlewares';

// Validacion de envs
validarEnvs();

// Verifica si corre con docker (la verificacion es ideal para entorno 'dev')
let dockerPortInterno = envs.dockerPortInterno;
if (envs.environment === 'personal') {
  const correConDocker = verificarSiCorreConDocker();
  console.info('Esta corriendo con docker:', correConDocker);

  if (correConDocker) dockerPortInterno = envs.dockerPortInterno;
  else dockerPortInterno = envs.dockerPortExterno;
}

// Inicializacion de middlewares
const app = express();
const origin = '*';
app.use(cors({
  credentials: true,
  origin,
  methods: ['GET','POST','DELETE','PUT','UPDATE','PATCH'],
  allowedHeaders: ['Authorization', 'x-auth-token', 'Content-Type']
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(inicializacion);

// Cargar dinámicamente las rutas
const routesPath = path.join(__dirname, 'routes');
cargarEndpoints(app, routesPath);

// Manejo de errores
app.use(mwManejadorDeError);

export const mainApp = app;
export const mainDockerPortInterno = dockerPortInterno;
export const mainDockerPortExterno = envs.dockerPortExterno;
