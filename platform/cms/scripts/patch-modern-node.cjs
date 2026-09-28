const fs = require("fs");
const path = require("path");

// `jwa` currently brings in an old version of buffer-equal-constant-time.
// Node 26 removed SlowBuffer, so make the package use Buffer as its fallback.
const target = path.join(__dirname, "..", "node_modules", "buffer-equal-constant-time", "index.js");

if (fs.existsSync(target)) {
  const source = fs.readFileSync(target, "utf8");
  const fixed = source.replace(
    "var SlowBuffer = require('buffer').SlowBuffer;",
    "var SlowBuffer = require('buffer').SlowBuffer || Buffer;",
  );
  if (fixed !== source) fs.writeFileSync(target, fixed);
}
