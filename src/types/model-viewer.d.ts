declare namespace JSX {
  interface IntrinsicElements {
    "model-viewer": React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLElement> & {
        src?: string;
        alt?: string;
        poster?: string;
        "auto-rotate"?: boolean | string;
        "camera-controls"?: boolean | string;
        "shadow-intensity"?: string;
        "shadow-softness"?: string;
        exposure?: string;
        "environment-image"?: string;
        "tone-mapping"?: string;
        loading?: string;
        reveal?: string;
        ar?: boolean | string;
        "ar-modes"?: string;
        style?: React.CSSProperties;
        className?: string;
      },
      HTMLElement
    >;
  }
}
