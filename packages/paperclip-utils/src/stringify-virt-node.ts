import { stringifyCSSSheet } from "./stringify-sheet";
import { VirtualNode } from "./virt";

export const stringifyVirtualNode = (node: VirtualNode) => {
  switch (node.kind) {
    case "Fragment":
      return stringifyChildren(node);
    case "Element": {
      let buffer = `<${node.tagName}`;
      for (const key in node.attributes) {
        const value = node.attributes[key];
        if (value) {
          buffer += ` ${key}="${value}"`;
        } else {
          buffer += ` ${key}`;
        }
      }
      buffer += `>${stringifyChildren(node)}</${node.tagName}>`;
      return buffer;
    }
    case "StyleElement": {
      return `<style>${stringifyCSSSheet(node.sheet, null)}</style>`;
    }
    case "Text": {
      return node.value;
    }
    default: {
      throw new Error(`can't handle ${node.kind}`);
    }
  }
};

const stringifyChildren = node =>
  node.children.map(stringifyVirtualNode).join("");
