import fs from 'node:fs/promises';import path from 'node:path';import{fileURLToPath}from'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const out=path.resolve(root,process.argv[2]||'out');
const dest=path.join(out,'licenses');await fs.mkdir(dest,{recursive:true});
await fs.cp(path.join(root,'licenses'),dest,{recursive:true});
await fs.copyFile(path.join(root,'LICENSE'),path.join(dest,'PROJECT-LICENSE.txt'));
const files=await fs.readdir(dest,{recursive:true});
const links=[];for(const name of files){if((await fs.stat(path.join(dest,name))).isFile())links.push(`<li><a href="${name.split(path.sep).map(encodeURIComponent).join('/')}">${name.replaceAll('&','&amp;').replaceAll('<','&lt;')}</a></li>`);}
await fs.writeFile(path.join(dest,'index.html'),'<!doctype html><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Third-party licenses</title><h1>项目与第三方许可</h1><p>各项组件、字体与依赖保留各自许可，根项目许可不覆盖第三方。</p><ul>'+links.join('')+'</ul>');
