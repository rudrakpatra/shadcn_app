export type AnimationType =
    | "slideLeft"
    | "slideRight"
    | "slideUp"
    | "slideDown"
    | "fade"
    | "scale"
    | "scaleFade"
    | "custom";

// Semantic animation types
export const ViewTransitions = {
    Semantic: {
        Forward: "slideLeft" as const,
        Backward: "slideRight" as const,
    }
} as const;

export type SemanticAnimationType = typeof ViewTransitions.Semantic.Forward | typeof ViewTransitions.Semantic.Backward;
