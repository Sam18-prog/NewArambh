/**
 * Utility to verify WebGL (WebGL2 or WebGL1) availability in the client browser.
 * Ensures independent canvas context probes and releases GPU contexts immediately
 * to avoid context leaks or cross-context contamination.
 */

function loseContext(gl: WebGLRenderingContext | WebGL2RenderingContext | null) {
  if (!gl) return;
  try {
    const ext = gl.getExtension('WEBGL_lose_context');
    if (ext && typeof ext.loseContext === 'function') {
      ext.loseContext();
    }
  } catch {
    // Graceful no-op if context losing is unsupported
  }
}

export function checkWebGLSupport(): {
  isSupported: boolean;
  version: 'webgl2' | 'webgl' | 'none';
  error?: string;
} {
  if (typeof window === 'undefined') {
    return { isSupported: true, version: 'webgl2' };
  }

  // Check if browser has WebGL interface at all
  if (!window.WebGLRenderingContext) {
    return {
      isSupported: false,
      version: 'none',
      error: 'Browser does not support WebGL rendering interface.',
    };
  }

  try {
    // 1. Check WebGL2 on a fresh, isolated canvas
    const canvas2 = document.createElement('canvas');
    let gl2: WebGL2RenderingContext | null = null;
    try {
      gl2 = canvas2.getContext('webgl2') as WebGL2RenderingContext | null;
    } catch {
      gl2 = null;
    }

    if (gl2) {
      loseContext(gl2);
      return { isSupported: true, version: 'webgl2' };
    }

    // 2. Check WebGL1 on a separate fresh canvas (prevents context-type locking bug)
    const canvas1 = document.createElement('canvas');
    let gl1: WebGLRenderingContext | null = null;
    try {
      gl1 = (canvas1.getContext('webgl') ||
        canvas1.getContext('experimental-webgl')) as WebGLRenderingContext | null;
    } catch {
      gl1 = null;
    }

    if (gl1) {
      loseContext(gl1);
      return { isSupported: true, version: 'webgl' };
    }

    return {
      isSupported: false,
      version: 'none',
      error: 'Hardware 3D acceleration or WebGL is disabled or unsupported on this device.',
    };
  } catch (err) {
    return {
      isSupported: false,
      version: 'none',
      error: err instanceof Error ? err.message : 'Unknown WebGL initialization failure',
    };
  }
}
