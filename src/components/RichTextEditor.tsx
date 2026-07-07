import { useEffect, useRef, useCallback } from 'react';
import {
  AlignCenter,
  AlignJustify,
  AlignLeft,
  AlignRight,
  Bold,
  Italic,
  List,
  ListOrdered,
  Underline,
  Heading1,
  Heading2,
  Type,
} from 'lucide-react';
import type { LanguageType } from '../types';
import { richEditorLabels } from '../i18n/richEditorLabels';

interface RichTextEditorProps {
  value: string;
  onChange: (html: string) => void;
  placeholder?: string;
  minHeight?: number;
  className?: string;
  lang?: LanguageType;
}

type Cmd =
  | 'bold'
  | 'italic'
  | 'underline'
  | 'justifyLeft'
  | 'justifyCenter'
  | 'justifyRight'
  | 'justifyFull'
  | 'insertUnorderedList'
  | 'insertOrderedList'
  | 'formatBlock';

function exec(cmd: string, value?: string) {
  document.execCommand(cmd, false, value);
}

export function RichTextEditor({
  value,
  onChange,
  placeholder,
  minHeight = 140,
  className = '',
  lang = 'en',
}: RichTextEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const labels = richEditorLabels[lang];

  const sync = useCallback(() => {
    onChange(editorRef.current?.innerHTML ?? '');
  }, [onChange]);

  useEffect(() => {
    const el = editorRef.current;
    if (!el) return;
    if (el.innerHTML !== value) {
      el.innerHTML = value || '';
    }
  }, [value]);

  const run = (cmd: Cmd, val?: string) => {
    editorRef.current?.focus();
    if (cmd === 'formatBlock' && val) {
      exec('formatBlock', val);
    } else {
      exec(cmd);
    }
    sync();
  };

  const toolbarBtn = (active: boolean) =>
    `rich-editor-btn ${active ? 'rich-editor-btn-active' : ''}`;

  return (
    <div className={`rich-editor ${className}`}>
      <div className="rich-editor-toolbar" role="toolbar" aria-label={labels.toolbar}>
        <button type="button" className={toolbarBtn(false)} onClick={() => run('bold')} title={labels.bold}>
          <Bold size={15} />
        </button>
        <button type="button" className={toolbarBtn(false)} onClick={() => run('italic')} title={labels.italic}>
          <Italic size={15} />
        </button>
        <button type="button" className={toolbarBtn(false)} onClick={() => run('underline')} title={labels.underline}>
          <Underline size={15} />
        </button>
        <span className="rich-editor-divider" />
        <button type="button" className={toolbarBtn(false)} onClick={() => run('formatBlock', 'h1')} title={labels.heading1}>
          <Heading1 size={15} />
        </button>
        <button type="button" className={toolbarBtn(false)} onClick={() => run('formatBlock', 'h2')} title={labels.heading2}>
          <Heading2 size={15} />
        </button>
        <button type="button" className={toolbarBtn(false)} onClick={() => run('formatBlock', 'p')} title={labels.paragraph}>
          <Type size={15} />
        </button>
        <span className="rich-editor-divider" />
        <button type="button" className={toolbarBtn(false)} onClick={() => run('justifyLeft')} title={labels.alignLeft}>
          <AlignLeft size={15} />
        </button>
        <button type="button" className={toolbarBtn(false)} onClick={() => run('justifyCenter')} title={labels.alignCenter}>
          <AlignCenter size={15} />
        </button>
        <button type="button" className={toolbarBtn(false)} onClick={() => run('justifyRight')} title={labels.alignRight}>
          <AlignRight size={15} />
        </button>
        <button type="button" className={toolbarBtn(false)} onClick={() => run('justifyFull')} title={labels.alignJustify}>
          <AlignJustify size={15} />
        </button>
        <span className="rich-editor-divider" />
        <button type="button" className={toolbarBtn(false)} onClick={() => run('insertUnorderedList')} title={labels.bulletList}>
          <List size={15} />
        </button>
        <button type="button" className={toolbarBtn(false)} onClick={() => run('insertOrderedList')} title={labels.numberedList}>
          <ListOrdered size={15} />
        </button>
        <select
          className="rich-editor-size"
          defaultValue="3"
          onChange={(e) => {
            editorRef.current?.focus();
            exec('fontSize', e.target.value);
            sync();
          }}
          aria-label={labels.fontSize}
        >
          <option value="2">{labels.sizeSmall}</option>
          <option value="3">{labels.sizeNormal}</option>
          <option value="4">{labels.sizeMedium}</option>
          <option value="5">{labels.sizeLarge}</option>
        </select>
      </div>
      <div
        ref={editorRef}
        className="rich-editor-body"
        style={{ minHeight }}
        contentEditable
        role="textbox"
        aria-multiline
        data-placeholder={placeholder}
        onInput={sync}
        onBlur={sync}
        suppressContentEditableWarning
      />
    </div>
  );
}
