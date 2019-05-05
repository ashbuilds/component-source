
const getFileInfo = function(path, query, source){
    const filePathSChunks = path.split('/');
    const fileName = filePathSChunks[filePathSChunks.length -1];
    return  {
        name: fileName,
        ext: fileName.split('.')[1],
        filePath: path,
        source,
    }
};

const normalizeSlashInPath = function(path){
    const pathChunks = path.split('\\');
    if(pathChunks.length){
            return pathChunks.join('/');
    }
    return path;
};

module.exports = function(source, map) {
    this.cacheable && this.cacheable();
    const data = getFileInfo(this.resourcePath, this.resourceQuery, source);
    const pathChunks = this.resourcePath.split('src');
    const srcPath = `/src${pathChunks[1]}`;
    const srcNormalize = normalizeSlashInPath(srcPath);
    const b = new Buffer(JSON.stringify(data));
    const s = b.toString('base64');
    const finalData =`localStorage.setItem(\'vue_template:${srcNormalize}\',"${s}");`;
    const injectScript = source.replace('<script>',`<script>${finalData}`);
    this.callback(null, injectScript, map);
    return;
};

module.exports.seperable = true;