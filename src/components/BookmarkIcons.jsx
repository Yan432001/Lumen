import React from 'react';

export function BookmarkOutlined(props) {
  return (
    <span role="img" aria-label="bookmark" className="anticon anticon-bookmark" {...props}>
      <svg
        width="1em"
        height="1em"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ display: 'inline-block', verticalAlign: '-0.125em' }}
      >
        <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
      </svg>
    </span>
  );
}

export function BookmarkFilled(props) {
  return (
    <span role="img" aria-label="bookmark" className="anticon anticon-bookmark" {...props}>
      <svg
        width="1em"
        height="1em"
        viewBox="0 0 24 24"
        fill="currentColor"
        style={{ display: 'inline-block', verticalAlign: '-0.125em' }}
      >
        <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
      </svg>
    </span>
  );
}
