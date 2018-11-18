import sanitizeHtml from 'sanitize-html';

const allowedTags = [
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'blockquote',
  'p',
  'a',
  'ul',
  'ol',
  'li',
  'b',
  'i',
  'strong',
  'em',
  'br',
  'caption',
  'img',
];

const allowedAttributes = {
  a: ['href'],
  img: ['src'],
};

// A very picky HTML sanitizer
export default function(dirty) {
  return sanitizeHtml(dirty, {
    allowedTags,
    allowedAttributes,
  });
}
