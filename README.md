# Terminal word colorer

Assigns each word a color from a very short list of colors.

## Get started

Install (dev) dependencies:

`$ yarn`

### Format & build

`$ yarn build

This creates `./dist/` and sticks the compiled code there.

### Use it for something

It's not very useful to be honest, but it works.

For example, with `kubectl`'s `--watch` mode, which is pretty spammy:

`$ kubectl get node --watch | ./dist/index.js`
