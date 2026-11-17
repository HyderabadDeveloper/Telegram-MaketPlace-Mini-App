import React from 'react';

function inlineText(text) {
  const parts = String(text).split(/(\*\*[^*]+\*\*|`[^`]+`)/g);

  return parts.map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={index}>{part.slice(2, -2)}</strong>;
    }
    if (part.startsWith('`') && part.endsWith('`')) {
      return <code key={index}>{part.slice(1, -1)}</code>;
    }
    return part;
  });
}

// Renders API text safely. It supports paragraphs, line breaks, lists, bold text,
// and inline code without trusting or injecting upstream HTML.
export default function ExplanationText({ children }) {
  const lines = String(children || '')
    .replace(/\\n/g, '\n')
    .split(/\r?\n/);
  const blocks = [];
  let paragraph = [];
  let list = [];
  let listType = null;

  const flushParagraph = () => {
    if (paragraph.length) {
      blocks.push({ type: 'paragraph', content: paragraph });
      paragraph = [];
    }
  };

  const flushList = () => {
    if (list.length) {
      blocks.push({ type: listType, content: list });
      list = [];
      listType = null;
    }
  };

  lines.forEach((line) => {
    const unordered = line.match(/^\s*[-*]\s+(.+)$/);
    const ordered = line.match(/^\s*\d+[.)]\s+(.+)$/);

    if (unordered || ordered) {
      const nextType = unordered ? 'unordered' : 'ordered';
      if (listType && listType !== nextType) flushList();
      flushParagraph();
      listType = nextType;
      list.push((unordered || ordered)[1]);
      return;
    }

    if (!line.trim()) {
      flushParagraph();
      flushList();
      return;
    }

    flushList();
    paragraph.push(line);
  });

  flushParagraph();
  flushList();

  return (
    <div className="explanation-content">
      {blocks.map((block, index) => {
        if (block.type === 'unordered') {
          return <ul key={index}>{block.content.map((item, itemIndex) => <li key={itemIndex}>{inlineText(item)}</li>)}</ul>;
        }
        if (block.type === 'ordered') {
          return <ol key={index}>{block.content.map((item, itemIndex) => <li key={itemIndex}>{inlineText(item)}</li>)}</ol>;
        }
        return <p key={index}>{block.content.map((line, lineIndex) => <React.Fragment key={lineIndex}>{lineIndex > 0 && <br />}{inlineText(line)}</React.Fragment>)}</p>;
      })}
    </div>
  );
}
