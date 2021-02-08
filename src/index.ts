#!/usr/bin/env node
import * as crypto from 'crypto';
import * as readline from 'readline';

const colorPrefixes = {
  black: '\x1b[30m',
  red: '\x1b[91m',
  gray: '\x1b[37m',
  green: '\x1b[92m',
  default: '\x1b[0m',
  yellow: '\x1b[93m',
  blue: '\x1b[94m',
  pink: '\x1b[95m',
  cyan: '\x1b[96m',
  white: '\x1b[97m',
  magenta: '\x1b[95m',
} as const;

const colorKeys = Object.keys(colorPrefixes);

function colorPrefix(word: string): string {
  const wordHash = parseInt(
    crypto.createHash('sha256').update(word).digest('hex'),
    16,
  );
  const colorIndex = wordHash % colorKeys.length;
  const colorKey = colorKeys[colorIndex];
  return colorPrefixes[colorKey];
}

function colorLine(line: string): string[] {
  const words = line.split(/(\s+)/);
  const outputs = [];

  for (const word of words) {
    // Don't bother generating a hash for whitespace
    if (word.trim().length > 0) {
      const prefix = colorPrefix(word);
      outputs.push(prefix);
    }

    outputs.push(word);
  }

  return outputs;
}

readline
  .createInterface({
    input: process.stdin,
    output: process.stdout,
  })
  .on('line', (line) => {
    console.log(...colorLine(line));
  });
