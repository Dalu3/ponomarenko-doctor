const fs = require("fs");
const path = require("path");
const React = require("react");
const { renderToString } = require("react-dom/server");

require("sucrase/register");

const rootDir = path.resolve(__dirname, "..");
const buildDir = path.join(rootDir, "build");
const buildIndexPath = path.join(buildDir, "index.html");
const assetManifestPath = path.join(buildDir, "asset-manifest.json");
const INLINE_IMAGE_LIMIT = 10_000;

const assetManifest = JSON.parse(fs.readFileSync(assetManifestPath, "utf8"));
const assetMimeTypes = {
    ".avif": "image/avif",
    ".bmp": "image/bmp",
    ".gif": "image/gif",
    ".jpeg": "image/jpeg",
    ".jpg": "image/jpeg",
    ".png": "image/png",
    ".svg": "image/svg+xml",
};

const canInlineAsset = (extension, filename) => {
    if (extension === ".svg") {
        return false;
    }

    return fs.statSync(filename).size <= INLINE_IMAGE_LIMIT;
};

const getManifestAssetPath = (filename) => {
    const manifestKey = `static/media/${path.basename(filename)}`;

    return assetManifest.files[manifestKey] || null;
};

require.extensions[".css"] = () => null;

Object.keys(assetMimeTypes).forEach((extension) => {
    require.extensions[extension] = (module, filename) => {
        const manifestPath = getManifestAssetPath(filename);

        if (manifestPath) {
            module.exports = manifestPath;
            return;
        }

        if (canInlineAsset(extension, filename)) {
            const fileBuffer = fs.readFileSync(filename);
            const mimeType = assetMimeTypes[extension];
            module.exports = `data:${mimeType};base64,${fileBuffer.toString("base64")}`;
            return;
        }

        module.exports = `/static/media/${path.basename(filename)}`;
    };
});

const App = require(path.join(rootDir, "src", "App")).default;

const SITE_URL = "https://anastasiiaponomarenko.com";
const EN_URL = `${SITE_URL}/en/`;

const renderApp = (locale) =>
    renderToString(
        React.createElement(
            React.StrictMode,
            null,
            React.createElement(App, { locale })
        )
    );

const injectMarkup = (html, markup) =>
    html.replace('<div id="root"></div>', `<div id="root">${markup}</div>`);

const escapeRegExp = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const setMetaContent = (html, attr, key, content) => {
    const pattern = new RegExp(
        `(<meta\\s+${attr}="${escapeRegExp(key)}"\\s+content=")[^"]*(")`
    );

    if (!pattern.test(html)) {
        throw new Error(`Prerender: meta ${attr}="${key}" not found in index.html`);
    }

    return html.replace(pattern, `$1${content}$2`);
};

const enMeta = {
    title: "Paediatrician and Family Doctor in Dnipro | Anastasiia Ponomarenko",
    description:
        "Paediatrician and family doctor in Dnipro. Appointments under an NHSU declaration at the Valeo Medical Centre (148 Robocha Street), private and online consultations, and home visits.",
    siteName: "Anastasiia Oleksandrivna Ponomarenko",
    imageAlt: "Anastasiia Ponomarenko, doctor in Dnipro",
};

const hreflangLinks =
    `<link rel="alternate" href="${SITE_URL}/" hreflang="uk-UA">` +
    `<link rel="alternate" href="${EN_URL}" hreflang="en-GB">` +
    `<link rel="alternate" href="${SITE_URL}/" hreflang="x-default">`;

const replaceHreflang = (html) => {
    const pattern = /<link rel="alternate" href="[^"]*" hreflang="uk-UA"\s*\/?>\s*<link rel="alternate" href="[^"]*" hreflang="x-default"\s*\/?>/;

    if (!pattern.test(html)) {
        throw new Error("Prerender: hreflang links not found in index.html");
    }

    return html.replace(pattern, hreflangLinks);
};

const localiseJsonLd = (html) =>
    html.replace(
        /(<script type="application\/ld\+json">)([\s\S]*?)(<\/script>)/,
        (match, open, json, close) => {
            const data = JSON.parse(json);

            data["@graph"].forEach((node) => {
                if (node["@type"] === "WebPage") {
                    node["@id"] = `${EN_URL}#webpage`;
                    node.url = EN_URL;
                    node.name = enMeta.title;
                    node.description = enMeta.description;
                    node.inLanguage = "en-GB";
                }
            });

            return `${open}${JSON.stringify(data)}${close}`;
        }
    );

const buildEnglishHtml = (html) => {
    let result = html.replace(/<html lang="uk"/, '<html lang="en-GB"');

    result = result.replace(
        /<title>[\s\S]*?<\/title>/,
        `<title>${enMeta.title}</title>`
    );
    result = setMetaContent(result, "name", "description", enMeta.description);
    result = setMetaContent(result, "name", "author", enMeta.siteName);
    result = setMetaContent(result, "property", "og:locale", "en_GB");
    result = setMetaContent(result, "property", "og:locale:alternate", "uk_UA");
    result = setMetaContent(result, "property", "og:site_name", enMeta.siteName);
    result = setMetaContent(result, "property", "og:title", enMeta.title);
    result = setMetaContent(result, "property", "og:description", enMeta.description);
    result = setMetaContent(result, "property", "og:url", EN_URL);
    result = setMetaContent(result, "property", "og:image:alt", enMeta.imageAlt);
    result = setMetaContent(result, "name", "twitter:title", enMeta.title);
    result = setMetaContent(result, "name", "twitter:description", enMeta.description);
    result = setMetaContent(result, "name", "twitter:image:alt", enMeta.imageAlt);
    result = result.replace(
        /<link rel="canonical" href="[^"]*"/,
        `<link rel="canonical" href="${EN_URL}"`
    );
    result = replaceHreflang(result);
    // Relative asset links would resolve under /en/, so make them root-relative.
    result = result
        .replace(/href="favicon\.png"/g, 'href="/favicon.png"')
        .replace(/href="manifest\.json"/g, 'href="/manifest.json"');

    return localiseJsonLd(result);
};

const buildHtml = fs.readFileSync(buildIndexPath, "utf8");

const ukrainianHtml = injectMarkup(replaceHreflang(buildHtml), renderApp("uk"));
fs.writeFileSync(buildIndexPath, ukrainianHtml);
fs.copyFileSync(buildIndexPath, path.join(buildDir, "200.html"));

const englishDir = path.join(buildDir, "en");
fs.mkdirSync(englishDir, { recursive: true });
fs.writeFileSync(
    path.join(englishDir, "index.html"),
    injectMarkup(buildEnglishHtml(buildHtml), renderApp("en"))
);

console.log("Prerendered / (uk) and /en/ (en), mirrored / to 200.html.");
