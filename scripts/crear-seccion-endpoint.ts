import fs from 'fs';
import path from 'path';

// Función para crear un archivo con contenido
const createFile = (filePath: string, content: string) => {
  fs.writeFileSync(filePath, content, 'utf8');
};

// Función principal para generar la estructura
const createEndpointStructure = (folderName: string) => {
  const basePath = path.join(__dirname, '..', 'src', 'presentation', 'endpoints', folderName);
  
  // Crear las rutas
  const routesPath = path.join(basePath, 'routes');
  const middlewaresPath = path.join(basePath, 'middlewares');
  const controllersPath = path.join(basePath, 'controllers');
  const dtoPath = path.join(basePath, 'dto');
  
  // Crear carpetas
  [routesPath, middlewaresPath, controllersPath, dtoPath].forEach((dir) => {
    fs.mkdirSync(dir, { recursive: true });
  });

  // Crear archivos en la carpeta routes
  createFile(path.join(routesPath, 'index.ts'), `import { Request, Response } from 'express';\n\nexport const handler = (req: Request, res: Response) => {\n  res.send('Endpoint de ${folderName}');\n};`);
  createFile(path.join(routesPath, 'prueba.route.ts'), `import { Router } from 'express';\nimport { handler } from '../controllers/prueba.controller';\n\nconst router = Router();\n\nrouter.get('/prueba', handler);\n\nexport default router;`);

  // Crear archivos en la carpeta middlewares
  createFile(path.join(middlewaresPath, 'index.ts'), `export * from './prueba.middleware';`);
  createFile(path.join(middlewaresPath, 'prueba.middleware.ts'), `export const pruebaMiddleware = (req, res, next) => {\n  console.log('Middleware de prueba');\n  next();\n};`);

  // Crear archivos en la carpeta controllers
  createFile(path.join(controllersPath, 'index.ts'), `export * from './prueba.controller';`);
  createFile(path.join(controllersPath, 'prueba.controller.ts'), `import { Request, Response } from 'express';\n\nexport const handler = (req: Request, res: Response) => {\n  res.send('Controlador de prueba');\n};`);

  // Crear archivos en la carpeta dto
  createFile(path.join(dtoPath, 'index.ts'), `export * from './prueba.dto';`);
  createFile(path.join(dtoPath, 'prueba.dto.ts'), `export interface PruebaDTO {\n  id: string;\n  nombre: string;\n};`);

  console.log(`Estructura de ${folderName} creada exitosamente en /src/presentation/endpoints/${folderName}`);
};

// Llamada a la función pasando el nombre de la carpeta
const folderName = process.argv[2]; // El nombre de la carpeta que se pasa como argumento
if (!folderName) {
  console.error('Por favor, proporciona un nombre de carpeta.');
  process.exit(1);
}

createEndpointStructure(folderName);
