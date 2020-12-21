import { Layer } from 'sketch/dom';

export const isShape = (layer: Layer) => layer.type === 'Shape';

export const isSymbolInstance = (layer: Layer) =>
  layer.type === 'SymbolInstance';

export const isShapeOrSymbolInstance = (layer: Layer) =>
  isShape(layer) || isSymbolInstance(layer);

export const isText = (layer: Layer) => layer.type === 'Text';

export const isTextOrSymbolInstance = (layer: Layer) =>
  isText(layer) || isSymbolInstance(layer);

export const isImage = (path) => /\.png|\.jpg|\.jpeg|\.gif/gi.test(path);
