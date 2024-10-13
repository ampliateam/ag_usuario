import { mainApp, mainDockerPortInterno, mainDockerPortExterno } from './app';

mainApp.listen(mainDockerPortInterno, () => {
  console.log(`[server]: Server is running at http://localhost:${mainDockerPortExterno}/v1`);
});
