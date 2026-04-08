declare namespace JSX {
  interface IntrinsicElements {
    "model-viewer": React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLElement>,
      HTMLElement
    > & {
      src?: string;
      alt?: string;
      ar?: boolean;
      "ar-modes"?: string;
      "camera-controls"?: boolean;
      "auto-rotate"?: boolean;
      poster?: string;
      shadowIntensity?: string;
      exposure?: string;
      environmentImage?: string;
      style?: React.CSSProperties;
      loading?: "eager" | "lazy";
    };
  }
}