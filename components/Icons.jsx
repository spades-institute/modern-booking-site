const base = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.4,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};

export function Scissors(props) {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" {...base} {...props}>
      <circle cx="6" cy="6" r="2.6" />
      <circle cx="6" cy="18" r="2.6" />
      <line x1="8.2" y1="7.8" x2="20" y2="18" />
      <line x1="8.2" y1="16.2" x2="20" y2="6" />
    </svg>
  );
}

export function Home(props) {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" {...base} {...props}>
      <path d="M4 11.2 12 4l8 7.2" />
      <path d="M6 10v9h12v-9" />
      <path d="M10 19v-5h4v5" />
    </svg>
  );
}

export function Store(props) {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" {...base} {...props}>
      <path d="M4 9.5 5.2 4h13.6L20 9.5" />
      <path d="M4 9.5a2.4 2.4 0 0 0 4.6 1 2.4 2.4 0 0 0 4.6 0 2.4 2.4 0 0 0 4.6 0 2.4 2.4 0 0 0 4.6-1" />
      <path d="M5.5 11v9h13v-9" />
    </svg>
  );
}

export function Clock(props) {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" {...base} {...props}>
      <circle cx="12" cy="12" r="8.4" />
      <path d="M12 7.6V12l3 2" />
    </svg>
  );
}

export function Phone(props) {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" {...base} {...props}>
      <path d="M6 3.5h3l1.4 4-2 1.6a12 12 0 0 0 5.5 5.5l1.6-2 4 1.4v3a1.6 1.6 0 0 1-1.7 1.6A16.5 16.5 0 0 1 4.4 5.2 1.6 1.6 0 0 1 6 3.5Z" />
    </svg>
  );
}

export function Mail(props) {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" {...base} {...props}>
      <rect x="3.5" y="5.5" width="17" height="13" rx="1.4" />
      <path d="m4.5 6.5 7.5 6 7.5-6" />
    </svg>
  );
}

export function Pin(props) {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" {...base} {...props}>
      <path d="M12 21s7-6.3 7-11.6A7 7 0 0 0 5 9.4C5 14.7 12 21 12 21Z" />
      <circle cx="12" cy="9.4" r="2.4" />
    </svg>
  );
}

export function Check(props) {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" {...base} {...props}>
      <path d="m4.5 12.5 5 5 10-11" />
    </svg>
  );
}

export function Chevron(props) {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" {...base} {...props}>
      <path d="m7 9.5 5 5 5-5" />
    </svg>
  );
}

export function Menu(props) {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" {...base} {...props}>
      <line x1="4" y1="7" x2="20" y2="7" />
      <line x1="4" y1="12" x2="20" y2="12" />
      <line x1="4" y1="17" x2="20" y2="17" />
    </svg>
  );
}

export function Close(props) {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" {...base} {...props}>
      <line x1="5" y1="5" x2="19" y2="19" />
      <line x1="19" y1="5" x2="5" y2="19" />
    </svg>
  );
}

export function Star(props) {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" {...base} fill="currentColor" stroke="none" {...props}>
      <path d="M12 3.5 14.4 9l6 .6-4.5 3.9L17.2 19 12 15.8 6.8 19l1.3-5.5L3.6 9.6l6-.6Z" />
    </svg>
  );
}
