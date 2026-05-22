import { readFileSync, writeFileSync } from 'fs';

const manifest = JSON.parse(readFileSync('manifest.json', 'utf8'));
const versions = JSON.parse(readFileSync('versions.json', 'utf8'));

const now = new Date();
const pad = (n, w = 2) => String(n).padStart(w, '0');
const version = `${now.getFullYear()}${pad(now.getMonth() + 1)}${pad(now.getDate())}.${pad(now.getHours())}${pad(now.getMinutes())}${pad(now.getSeconds())}`;

manifest.version = version;
writeFileSync('manifest.json', JSON.stringify(manifest, null, 2) + '\n');

// versions.json only needs the latest version pointing to minAppVersion
versions[version] = manifest.minAppVersion;
writeFileSync('versions.json', JSON.stringify(versions, null, 2) + '\n');

console.log(`Version bumped to ${version}`);
