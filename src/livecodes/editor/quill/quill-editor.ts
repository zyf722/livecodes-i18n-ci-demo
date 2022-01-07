import { CustomEditor } from '../../models';

export const createQuillEditor = (baseUrl: string): CustomEditor => {
  let quillEditor: typeof import('./quill');

  const loadEditor = async () => {
    if (quillEditor) return;

    const editorContainer = document.querySelector('#markup') as HTMLElement;
    const editorElement = document.createElement('div');
    editorElement.id = 'quillEditor';
    editorElement.classList.add('custom-editor');
    editorElement.innerHTML = `<span class="loading-custom-editor">Loading rich text editor...</span>`;
    editorContainer.appendChild(editorElement);

    quillEditor = await import(baseUrl + 'quill.js');
  };

  return {
    language: 'richtext',
    show: async (show, options) => {
      if (!quillEditor && show) {
        await loadEditor();
      }
      const editorContainer = document.querySelector<HTMLElement>('#quillEditor');
      if (!show || options.editors.markup.getLanguage() !== 'richtext') {
        if (editorContainer) editorContainer.style.display = 'none';
        return;
      }
      if (editorContainer) editorContainer.style.display = 'unset';

      await quillEditor.showQuillEditor(options);
    },
    getContent: async (options) => {
      await loadEditor();
      return quillEditor.getQuillEditorContent(options);
    },
    setTheme: (theme) => {
      quillEditor?.setQuillEditorTheme(theme);
    },
  };
};
