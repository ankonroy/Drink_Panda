// src/types/df-messenger.d.ts
// export {};

// import 'react';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'df-messenger': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          intent?: string;
          'chat-title'?: string;
          'agent-id'?: string;
          'language-code'?: string;
          'project-id'?: string;
          'chat-icon'?: string;
          width?: string;
          height?: string;
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          [key: string]: any;
        },
        HTMLElement
      >;
    }
  }
}
