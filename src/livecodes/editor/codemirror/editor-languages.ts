import { LanguageSupport, StreamLanguage, StreamParser } from '@codemirror/language';

import type { Language } from '../../models';

const legacy = (parser: StreamParser<unknown>) =>
  new LanguageSupport(StreamLanguage.define(parser));

const hashedUrls = {
  core: './{{hash:codemirror-core.js}}',
  json: './{{hash:codemirror-lang-json.js}}',
  markdown: './{{hash:codemirror-lang-markdown.js}}',
  python: './{{hash:codemirror-lang-python.js}}',
  php: './{{hash:codemirror-lang-php.js}}',
  cpp: './{{hash:codemirror-lang-cpp.js}}',
  sql: './{{hash:codemirror-lang-sql.js}}',
  wast: './{{hash:codemirror-lang-wast.js}}',
  scss: './{{hash:codemirror-lang-scss.js}}',
  coffeescript: './{{hash:codemirror-lang-coffeescript.js}}',
  livescript: './{{hash:codemirror-lang-livescript.js}}',
  ruby: './{{hash:codemirror-lang-ruby.js}}',
  go: './{{hash:codemirror-lang-go.js}}',
  perl: './{{hash:codemirror-lang-perl.js}}',
  lua: './{{hash:codemirror-lang-lua.js}}',
  julia: './{{hash:codemirror-lang-julia.js}}',
  scheme: './{{hash:codemirror-lang-scheme.js}}',
  tcl: './{{hash:codemirror-lang-tcl.js}}',
  less: './{{hash:codemirror-lang-less.js}}',
  stylus: './{{hash:codemirror-lang-stylus.js}}',
};

export const editorLanguages: Partial<{ [key in Language]: () => Promise<LanguageSupport> }> = {
  html: async () => (await import(hashedUrls.core)).html(),
  css: async () => (await import(hashedUrls.core)).css(),
  javascript: async () => (await import(hashedUrls.core)).javascript(),
  typescript: async () => (await import(hashedUrls.core)).javascript({ typescript: true }),
  jsx: async () => (await import(hashedUrls.core)).javascript({ jsx: true }),
  tsx: async () => (await import(hashedUrls.core)).javascript({ jsx: true, typescript: true }),
  json: async () => (await import(hashedUrls.json)).json(),
  markdown: async () => (await import(hashedUrls.markdown)).markdown(),
  python: async () => (await import(hashedUrls.python)).python(),
  php: async () => (await import(hashedUrls.php)).php(),
  cpp: async () => (await import(hashedUrls.cpp)).cpp(),
  sql: async () => (await import(hashedUrls.sql)).sql(),
  wat: async () => (await import(hashedUrls.wast)).wast(),
  scss: async () => legacy((await import(hashedUrls.scss)).sCSS),
  coffeescript: async () => legacy((await import(hashedUrls.coffeescript)).coffeeScript),
  livescript: async () => legacy((await import(hashedUrls.livescript)).liveScript),
  ruby: async () => legacy((await import(hashedUrls.ruby)).ruby),
  go: async () => legacy((await import(hashedUrls.go)).go),
  perl: async () => legacy((await import(hashedUrls.perl)).perl),
  lua: async () => legacy((await import(hashedUrls.lua)).lua),
  julia: async () => legacy((await import(hashedUrls.julia)).julia),
  scheme: async () => legacy((await import(hashedUrls.scheme)).scheme),
  tcl: async () => legacy((await import(hashedUrls.tcl)).tcl),
  less: async () => legacy((await import(hashedUrls.less)).less),
  stylus: async () => legacy((await import(hashedUrls.stylus)).stylus),
};
