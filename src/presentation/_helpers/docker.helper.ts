export const verificarSiCorreConDocker = (): boolean => {
  try {
    const content = require('fs').readFileSync('/proc/1/cgroup', 'utf-8');
    return content.includes('docker');
  } catch (error) {
    return false;
  }
};
