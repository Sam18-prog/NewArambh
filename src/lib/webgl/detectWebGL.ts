/**
 * Utility to verify WebGL and WebGL2 availability in the client browser.
 * Enables graceful fallback to the 2D Interactive Floor Plan view.
 */
export function checkWebGLSupport(): { isSupported: boolean; version: 'webgl2' | 'webgl' | 'none'; error?: string } {
  if (typeof window === 'undefined') {
    return { isSupported: true, version: 'webgl2' };
  }

  try {
    const canvas = document.createElement('canvas');

    // 1. Check WebGL2
    const gl2 = canvas.getContext('webgl2');
    if (gl2) {
      return { isSupported: true, version: 'webgl2' };
    }

    // 2. Check WebGL 1
    const gl1 = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    if (gl1) {
      return { isSupported: true, version: 'webgl' };
    }

    return {
      isSupported: false,
      version: 'none',
      error: 'Hardware acceleration or WebGL is disabled or unsupported on this device.',
    };
  } catch (err) {
    return {
      isSupported: false,
      version: 'none',
      error: err instanceof Error ? err.message : 'Unknown WebGL initialization failure',
    };
  }
}
