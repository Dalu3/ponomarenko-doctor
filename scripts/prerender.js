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
const appMarkup = renderToString(
    React.createElement(
        React.StrictMode,
        null,
        React.createElement(App)
    )
);

const buildHtml = fs.readFileSync(buildIndexPath, "utf8");
const prerenderedHtml = buildHtml.replace(
    '<div id="root"></div>',
    `<div id="root">${appMarkup}</div>`
);

fs.writeFileSync(buildIndexPath, prerenderedHtml);
fs.copyFileSync(buildIndexPath, path.join(buildDir, "200.html"));

console.log("Prerendered initial HTML for / and mirrored it to 200.html.");
