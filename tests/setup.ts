import '@testing-library/jest-dom';

if (typeof globalThis !== 'undefined') {
  (globalThis as unknown as { ResizeObserver: unknown }).ResizeObserver = class ResizeObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
  };
}

if (typeof HTMLCanvasElement !== 'undefined') {
  HTMLCanvasElement.prototype.getContext = (() => {
    return {
      clearRect: () => {},
      beginPath: () => {},
      arc: () => {},
      stroke: () => {},
      fill: () => {},
      moveTo: () => {},
      lineTo: () => {},
      setTransform: () => {},
      strokeStyle: '',
      fillStyle: '',
      lineWidth: 1,
    };
  }) as unknown as typeof HTMLCanvasElement.prototype.getContext;
}
