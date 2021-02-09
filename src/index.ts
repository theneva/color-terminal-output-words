#!/usr/bin/env node
import * as crypto from 'crypto';
import * as readline from 'readline';

const resetPrefix = '\x1b[0m';

const colorPrefixes = {
  black: '\x1b[30m',
  red: '\x1b[91m',
  gray: '\x1b[37m',
  green: '\x1b[92m',
  yellow: '\x1b[93m',
  blue: '\x1b[94m',
  pink: '\x1b[95m',
  // cyan: '\x1b[96m',
  white: '\x1b[97m',
  magenta: '\x1b[95m',
} as const;

const colorKeys = Object.keys(colorPrefixes);

const colorIndexByWordHash = new Map<number, number>();

function colorPrefixFromIndex(index: number) {
  return colorPrefixes[colorKeys[index]];
}

let nextColorIndex = 0;
function colorPrefix(word: string): string {
  const wordHash = parseInt(
    crypto.createHash('sha256').update(word).digest('hex'),
    16,
  );

  if (colorIndexByWordHash.has(wordHash)) {
    return colorPrefixFromIndex(colorIndexByWordHash.get(wordHash));
  }

  const colorIndex = nextColorIndex;
  nextColorIndex = (nextColorIndex + 1) % colorKeys.length;
  colorIndexByWordHash.set(wordHash, colorIndex);
  return colorPrefixFromIndex(colorIndex);
}

function colorLine(line: string): string[] {
  const words = line.split(/(\s+)/);
  const outputs = [];

  for (const word of words) {
    // Don't bother generating a hash for whitespace
    const shouldColorWord = word.trim().length > 0;
    if (shouldColorWord) {
      const prefix = colorPrefix(word);
      outputs.push(prefix);
    }

    outputs.push(word);

    // Reset color so we don't screw up terminal colors after exiting
    if (shouldColorWord) {
      outputs.push(resetPrefix);
    }
  }

  return outputs;
}

readline
  .createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false,
  })
  .on('line', (line) => {
    const segments = colorLine(line);
    for (const segment of segments) {
      process.stdout.write(segment);
    }
    console.log();
  });
