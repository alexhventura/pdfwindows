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

interface RichTextEditorProps {
  value: string;
  onChange: (html: string) => void;
  placeholder?: string;
  minHeight?: number;
  className?: string;
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
}: RichTextEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);

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
      <div className="rich-editor-toolbar" role="toolbar" aria-label="Formatting">
        <button type="button" className={toolbarBtn(false)} onClick={() => run('bold')} title="Negrito">
          <Bold size={15} />
        </button>
        <button type="button" className={toolbarBtn(false)} onClick={() => run('italic')} title="Itálico">
          <Italic size={15} />
        </button>
        <button type="button" className={toolbarBtn(false)} onClick={() => run('underline')} title="Sublinhado">
          <Underline size={15} />
        </button>
        <span className="rich-editor-divider" />
        <button type="button" className={toolbarBtn(false)} onClick={() => run('formatBlock', 'h1')} title="Título 1">
          <Heading1 size={15} />
        </button>
        <button type="button" className={toolbarBtn(false)} onClick={() => run('formatBlock', 'h2')} title="Título 2">
          <Heading2 size={15} />
        </button>
        <button type="button" className={toolbarBtn(false)} onClick={() => run('formatBlock', 'p')} title="Parágrafo">
          <Type size={15} />
        </button>
        <span className="rich-editor-divider" />
        <button type="button" className={toolbarBtn(false)} onClick={() => run('justifyLeft')} title="Esquerda">
          <AlignLeft size={15} />
        </button>
        <button type="button" className={toolbarBtn(false)} onClick={() => run('justifyCenter')} title="Centro">
          <AlignCenter size={15} />
        </button>
        <button type="button" className={toolbarBtn(false)} onClick={() => run('justifyRight')} title="Direita">
          <AlignRight size={15} />
        </button>
        <button type="button" className={toolbarBtn(false)} onClick={() => run('justifyFull')} title="Justificado">
          <AlignJustify size={15} />
        </button>
        <span className="rich-editor-divider" />
        <button type="button" className={toolbarBtn(false)} onClick={() => run('insertUnorderedList')} title="Lista">
          <List size={15} />
        </button>
        <button type="button" className={toolbarBtn(false)} onClick={() => run('insertOrderedList')} title="Lista numerada">
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
          aria-label="Tamanho da fonte"
        >
          <option value="2">Pequeno</option>
          <option value="3">Normal</option>
          <option value="4">Médio</option>
          <option value="5">Grande</option>
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
