/**
 * @license
 * Copyright (c) 2020 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */

import fs from 'fs';
import path from 'path';

// Level is a string denoting position in the tree, e.g. '0_2_1'
// Depth for '0_2_1' is 3
export const depthForLevel = (level: string) => level ? Array.from(level.matchAll(/_/g)).length + 1 : 0;

export const levelForTemplate = (level: string, uniqueTemplates: boolean, modifier: string = '') => {
  if (uniqueTemplates) {
    return `${level}${modifier}`;
  } else {
    if (!modifier) {
      const end = level[level.length-1] || '';
      modifier = /(A|B)/.test(end) ? end : ''; // For A/B template switching
    }
    const depth = depthForLevel(level);
    const templateLevel = depth ? depth - 1 : '';
    return `${templateLevel}${modifier}`;
  }
};

// For a given level (e.g. '0_2_1'), if we're calling unique templates per
// level, the template name would be 'render0_2_1' (append the level), otherwise
// it's 'render2' (append depth-1, since top level is just render()).
// If the level ended in A/B (for dynamic template switching), add that to the
// depth when not using unique templates (e.g. '0_2_1A' -> 'render3A')
export const templateNameForLevel = (level: string, uniqueTemplates: boolean, modifier: string = '') => {
  return `render${levelForTemplate(level, uniqueTemplates, modifier)}`;
};

// Returns a new level for the given index
export const nextLevel = (level: string, n: number): string => {
  return level ? `${level}_${n}` : String(n);
};

const rendererInfoMap = new Map();
export const parseRenderer = (renderer: string) => {
  if (rendererInfoMap.has(renderer)) {
    return rendererInfoMap.get(renderer);
  }
  const parts = /([^?@]+)(?:\?([^@]+))?(?:@(.*))?/.exec(renderer);
  if (parts === null) {
    throw new Error(`Renderer '${renderer}' was invalid.`);
  }
  let packageVersions = null;
  if (parts[3]) {
    const vparts = /([^=]+)=(?:([^@]+)@(.*)|(.*\.json$))/.exec(parts[3]);
    if (vparts === null) {
      throw new Error(`Renderer version '${parts[3]}' was invalid; use form label=package@version or label=version-info.json`);
    }
    if (vparts[4]) {
      const file = path.join(process.cwd(), vparts[4]);
      packageVersions = JSON.parse(fs.readFileSync(file, 'utf-8'));
    } else {
      packageVersions = {
        label: vparts[1],
        dependencies: {
          [vparts[2]]: vparts[3]
        }
      }
    }
  }
  const info = {
    base: parts[1],
    query: parts[2],
    packageVersions
  };
  rendererInfoMap.set(renderer, info);
  return info;
};
