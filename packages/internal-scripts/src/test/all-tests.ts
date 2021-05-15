import {isSourceMap, adjustSources} from '../utils.js';
import {test} from 'uvu';
import * as assert from 'uvu/assert';

// import fastGlob from 'fast-glob';

test('isSourceMap', async () => {
  const result = [
    isSourceMap('file.d.ts.map'),
    isSourceMap('/path/to/file.d.ts.map'),
    isSourceMap('file.d.ts'),
    isSourceMap('/path/to/file.d.ts'),
  ];
  assert.equal(result, [true, true, false, false]);
});

test('adjustSources: /development/index.d.ts.map to index.d.ts.map', async () => {
  const original = 'C:\\package\\development\\index.d.ts.map';
  const mirror = 'C:\\package\\index.d.ts.map';
  const sources = ['../src/index.ts'];
  const expectedResult = ['./src/index.ts'];
  const result = adjustSources(original, mirror, sources);
  assert.equal(result, expectedResult);
});

test('adjustSources: /development/folder/index.d.ts.map to folder/index.d.ts.map', async () => {
  const original = 'C:\\package\\development\\folder\\index.d.ts.map';
  const mirror = 'C:\\package\\folder\\index.d.ts.map';
  const sources = ['../../src/folder/index.ts'];
  const expectedResult = ['../src/folder/index.ts'];
  const result = adjustSources(original, mirror, sources);
  assert.equal(result, expectedResult);
});

test.run();
