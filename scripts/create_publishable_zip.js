'use strict';

const fs = require('fs');
const archiver = require('archiver');
const webpack = require('webpack');
const pkgDir = require('pkg-dir');

const webpackConfig = require('../webpack.js');

async function buildWebpack() {
	return new Promise((resolve, reject) => {
		webpack(webpackConfig, (err) => {
			if (err) {
				reject(err);
				return;
			}
			resolve();
		})
	});
}

async function archive() {
	const output = fs.createWriteStream(__dirname + '/spoke_chrome_extension.zip');
	const archive = archiver('zip', {
	  zlib: { level: 9 } 
	});
	 
	output.on('close', function() {
	  console.log(archive.pointer() + ' total bytes');
	  console.log('Finished zipping extension');
	});
	 
	archive.on('error', function(err) {
	  console.error(err);
	  throw err;
	});
	 
	archive.pipe(output);
	 
	const manifest = __dirname + '/../manifest.json';
	archive.append(fs.createReadStream(manifest), { name: 'manifest.json' });
	 
	archive.directory('dist/', 'dist');
	archive.directory('lib/images', 'lib/images');
	 
	archive.glob('lib/**/*.html');
	archive.glob('lib/**/*.ng');
	archive.glob('lib/**/*.css');
	 
	archive.finalize();
}

async function main() {
	const rootDir = await pkgDir(__dirname);
	process.chdir(rootDir);
	await buildWebpack();
	await archive();
}

main();
