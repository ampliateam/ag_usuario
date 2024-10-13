import { Router } from 'express';
import fs from 'fs';
import path from 'path';

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

      // Cargar el archivo index.ts de la sección
      const sectionIndexPath = path.join(sectionPath, 'index.ts');
      if (fs.existsSync(sectionIndexPath)) {
        const sectionIndexRouter = require(sectionIndexPath).default;
        router.use('/', sectionIndexRouter);
      }

      // Cargar las funciones adicionales dentro de la sección
      const files = fs.readdirSync(sectionPath);
      files.forEach((file) => {
        if (file !== 'index.ts') {
          const functionPath = path.join(sectionPath, file);
          if (fs.statSync(functionPath).isFile() && functionPath.endsWith('.ts')) {
            const functionRouter = require(functionPath).default;
            const functionName = file.replace('.ts', '');
            router.use(`/${functionName}`, functionRouter);
          }
        }
      });

      // Registrar la ruta principal de la sección
      app.use(`/v1/${section}`, router);
    }
  });
};
