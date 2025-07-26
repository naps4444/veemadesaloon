// types/jsx.d.ts
export {};

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'dotlottie-wc': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      > & {
        src?: string;
        autoplay?: boolean;
        loop?: boolean;
        speed?: string | number;
        style?: React.CSSProperties;
      };
    }
  }
}
