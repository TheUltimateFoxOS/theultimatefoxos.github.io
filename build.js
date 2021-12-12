const fs = require('fs');
let sitemap = [];

function buildFolder(folder) {
	fs.readdirSync(folder).forEach(file => {
		const full_path = folder + '/' + file;
		console.log("Processing: " + full_path);

		if (fs.lstatSync(full_path).isDirectory()) {
			fs.mkdirSync('out/' + file);
			buildFolder(full_path);
		} else {
			buildFile(full_path);
		}
	});
}

function buildFile(file) {
	if (file.endsWith(".html") || file.endsWith(".js") || file.endsWith(".css")) {
		var contents = fs.readFileSync(file, 'utf8');
		fs.readdirSync('content').forEach(file => {
			if (file.endsWith(".html")) {
				var cont_file = file.substring(0, file.length - 5);
				var token = "{{content." + cont_file + "}}";
				contents = contents.split(token).join(fs.readFileSync('content/' + file, 'utf8'));
			}
		});

		addToSitemap(file);
		fs.writeFileSync('out/' + file.substring(4), contents);
	} else {
		fs.copyFileSync(file, 'out/' + file.substring(4));
	}
}

function addToSitemap(file) {
	if (file.endsWith("googleb196aa64fd5d60bb.html")) {
		return;
	}

	var url = "https://theultimatefoxos.dev/" + file;
	if (url.endsWith("index.html")) {
		url = url.substring(0, url.length - 10);
	}

	sitemap.push(url);
}

function sitemapToXML() {
	let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
	xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

	sitemap.forEach(url => {
		xml += '	<url>\n';
		xml += '		<loc>' + url + '</loc>\n';
		xml += '	</url>\n';
	});
	
	xml += '</urlset>';

	return xml;
}

try {
	fs.rmSync('out', { recursive: true });
} catch (err) {}
fs.mkdirSync('out');

buildFolder('src');

fs.writeFileSync('out/sitemap.xml', sitemapToXML(), 'utf8');