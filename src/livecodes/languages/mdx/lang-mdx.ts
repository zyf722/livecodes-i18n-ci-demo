import type { CompilerFunction, LanguageSpecs } from '../../models';
import { parserPlugins } from '../prettier';
import { compileInCompiler } from '../../compiler';
import { escapeCode, getLanguageCustomSettings } from '../../utils';
import { vendorsBaseUrl } from '../../vendors';

export const runOutsideWorker: CompilerFunction = async (code: string, { config, worker }) =>
  new Promise(async (resolve) => {
    if (!code) return resolve('');

    const mdx = await import(vendorsBaseUrl + 'mdx/mdx.js');
    const remarkGfm = (await import(vendorsBaseUrl + 'remark-gfm/remark-gfm.js')).default;

    const compiled = (
      await mdx.compile(code, {
        remarkPlugins: [remarkGfm],
        ...getLanguageCustomSettings('mdx', config),
      })
    ).value;

    // TODO: improve this
    const removeComponentDeclaration = (str: string) =>
      str
        .replace(/, {[^}]*} = _components/g, '')
        .replace(/const {[^:]*} = props.components[^;]*;/g, '');

    const jsx = removeComponentDeclaration(compiled);
    const result = `import React from "react";
import ReactDOM from "react-dom";
${escapeCode(jsx, false)}
ReactDOM.render(<MDXContent />, document.body);
`;
    const js = await compileInCompiler(result, 'jsx', config, {}, worker);
    resolve(`<script type="module">${js}</script>`);
  });

export const mdx: LanguageSpecs = {
  name: 'mdx',
  title: 'MDX',
  parser: {
    name: 'markdown',
    pluginUrls: [parserPlugins.markdown, parserPlugins.html],
  },
  compiler: {
    factory: () => async (code) => code,
    runOutsideWorker,
    compiledCodeLanguage: 'javascript',
    imports: {
      'react/jsx-runtime': 'https://esm.sh/react/jsx-runtime',
    },
  },
  extensions: ['mdx'],
  editor: 'markup',
  editorLanguage: 'markdown',
};