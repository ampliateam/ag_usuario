import { envs } from '@global/configs/envs';
import { Router } from 'express';
import fs from 'fs';
import path from 'path';

const isPersonal = envs.environment === 'personal'; // Detecta si es entorno de desarrollo
const fileExtension = isPersonal ? '.ts' : '.js'; // Usar .ts en desarrollo y .js en producción

/** 
 * Solo es de un solo nivel, ejemplo:
 * /routes
 *   /seccion1
 *     index.ts
 *     funcion.ts
 *   /seccion2
 *     index.ts
 *     funcion.ts
 *   ...
 *   /seccionN
 *     index.ts
 *     funcion.ts
 */
export const cargarEndpoints = (app: any, routesPath: string) => {
  const sections = fs.readdirSync(routesPath);

  sections.forEach((section) => {
    const sectionPath = path.join(routesPath, section);
    if (fs.statSync(sectionPath).isDirectory()) {
      const router = Router();

      // Cargar el archivo index.ts o index.js dependiendo del entorno
      const sectionIndexPath = path.join(sectionPath, `index${fileExtension}`);
      if (fs.existsSync(sectionIndexPath)) {
        const sectionIndexRouter = require(sectionIndexPath).default;
        router.use('/', sectionIndexRouter);
      }

      // Cargar las funciones adicionales dentro de la sección
      const files = fs.readdirSync(sectionPath);
      files.forEach((file) => {
        if (file !== `index${fileExtension}`) {
          const functionPath = path.join(sectionPath, file);
          if (fs.statSync(functionPath).isFile() && functionPath.endsWith(fileExtension)) {
            const functionRouter = require(functionPath).default;
            const functionName = file.replace(fileExtension, '');
            router.use(`/${functionName}`, functionRouter);
          }
        }
      });

      // Registrar la ruta principal de la sección
      app.use(`/v1/${section}`, router);
    }
  });
};
