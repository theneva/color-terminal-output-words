#!/usr/bin/env node
import * as crypto from 'crypto';

const input = `
gke-prod-pool-87102dd3-kjl7   Ready                         <none>   4s      v1.16.15-gke.6000
gke-prod-pool-87102dd3-y5bp   Ready                         <none>   18h     v1.15.12-gke.6002
gke-prod-pool-87102dd3-l7sr   Ready                         <none>   17h     v1.15.12-gke.6002
gke-prod-pool-87102dd3-sp57   Ready                         <none>   3m2s    v1.16.15-gke.6000
gke-prod-pool-87102dd3-z4zf   Ready                         <none>   9m33s   v1.16.15-gke.6000
gke-prod-pool-87102dd3-kxrz   Ready,SchedulingDisabled      <none>   17h     v1.15.12-gke.6002
gke-prod-pool-87102dd3-kxrz   Ready,SchedulingDisabled      <none>   17h     v1.15.12-gke.6002
gke-prod-pool-87102dd3-o6h2   Ready                         <none>   18h     v1.15.12-gke.6002
gke-prod-pool-87102dd3-o6h2   Ready                         <none>   18h     v1.15.12-gke.6002
gke-prod-pool-87102dd3-l7sr   Ready                         <none>   17h     v1.15.12-gke.6002
gke-prod-pool-87102dd3-ks2p   Ready                         <none>   13m     v1.16.15-gke.6000
gke-prod-pool-87102dd3-kjl7   Ready                         <none>   30s     v1.16.15-gke.6000
gke-prod-pool-87102dd3-y5bp   Ready                         <none>   18h     v1.15.12-gke.6002
gke-prod-pool-87102dd3-ro1v   Ready                         <none>   18h     v1.15.12-gke.6002
gke-prod-pool-87102dd3-z4zf   Ready                         <none>   10m     v1.16.15-gke.6000
gke-prod-pool-87102dd3-kxrz   Ready,SchedulingDisabled      <none>   17h     v1.15.12-gke.6002
gke-prod-pool-87102dd3-ro1v   Ready                         <none>   18h     v1.15.12-gke.6002
gke-prod-pool-87102dd3-t98g   Ready                         <none>   6m33s   v1.16.15-gke.6000
gke-prod-pool-87102dd3-kjl7   Ready                         <none>   61s     v1.16.15-gke.6000
gke-prod-pool-87102dd3-y5bp   Ready                         <none>   18h     v1.15.12-gke.6002
gke-prod-pool-87102dd3-l7sr   Ready                         <none>   17h     v1.15.12-gke.6002
gke-prod-pool-87102dd3-sp57   Ready                         <none>   4m2s    v1.16.15-gke.6000
gke-prod-pool-87102dd3-z4zf   Ready                         <none>   10m     v1.16.15-gke.6000
gke-prod-pool-87102dd3-kxrz   NotReady,SchedulingDisabled   <none>   17h     v1.15.12-gke.6002
gke-prod-pool-87102dd3-kxrz   NotReady,SchedulingDisabled   <none>   17h     v1.15.12-gke.6002
gke-prod-pool-87102dd3-kxrz   NotReady,SchedulingDisabled   <none>   17h     v1.15.12-gke.6002
gke-prod-pool-87102dd3-o6h2   Ready                         <none>   18h     v1.15.12-gke.6002
gke-prod-pool-87102dd3-o6h2   Ready                         <none>   18h     v1.15.12-gke.6002
gke-prod-pool-87102dd3-l7sr   Ready                         <none>   17h     v1.15.12-gke.6002
gke-prod-pool-87102dd3-ks2p   Ready                         <none>   14m     v1.16.15-gke.6000
gke-prod-pool-87102dd3-kjl7   Ready                         <none>   91s     v1.16.15-gke.6000
gke-prod-pool-87102dd3-y5bp   Ready                         <none>   18h     v1.15.12-gke.6002
`
  .trim()
  .split('\n');

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

function colorLine(line: string) {
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

  console.log(...outputs);
}

for (const line of input) {
  colorLine(line);
}
