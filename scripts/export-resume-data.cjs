const fs = require('fs');
const path = require('path');
const vm = require('vm');
const parser = require('@babel/parser');
const generate = require('@babel/generator').default;
const ast = parser.parse(fs.readFileSync('src/redesign/data.js', 'utf8'), { sourceType: 'module' });
const wanted = new Set(['email', 'profile', 'socials', 'experience', 'resume', 'testimonials']);
const result = {};
for (const statement of ast.program.body) {
  if (statement.type !== 'ExportNamedDeclaration' || statement.declaration?.type !== 'VariableDeclaration') continue;
  for (const item of statement.declaration.declarations) {
    if (!wanted.has(item.id.name)) continue;
    // Portrait imports are not part of the printable references.
    const context = { husam: '', johnny: '' };
    result[item.id.name] = vm.runInNewContext(`(${generate(item.init).code})`, context);
  }
}
fs.mkdirSync('tmp/pdfs', { recursive: true });
fs.writeFileSync(path.join('tmp/pdfs', 'resume-data.json'), JSON.stringify(result, null, 2));
console.log('Exported resume content from the website source.');
