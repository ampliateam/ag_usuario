## Valores del .env
```
ID_DEV_AMPLIA=NNNNNNNPP
CODIGO_USUARIO_EXTERNO=ag_usuario
CONTRASENA_USUARIO_EXTERNO=ag_usuario_123
DOCKER_CONTAINER_NAME=ag_usuario_local
DOCKER_IMAGE=ag_usuario_local
DOCKER_PORT_EXTERNO=7000
DOCKER_PORT_INTERNO=8080
ENVIRONMENT=personal
SECRET_KEY_TOKEN_CAMBIO_CONTRASENA=123456
```

## Posibles valores en los archivos: 
**Directorio:** src/global/configs/credentials/firebase/

Si el ENVIRONMENT es:
- **personal**          => firebase-admin-personal.json
- **development**       => firebase-admin-dev.json
- **testing**           => firebase-admin-test.json
- **production**        => firebase-admin-prod.json
