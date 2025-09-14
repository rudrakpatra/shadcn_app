export type AnimationType =
    | "slideLeft"
    | "slideRight"
    | "slideUp"
    | "slideDown"
    | "fade"
    | "scale"
    | "scaleFade"
    | "custom";

/**
 * ViewTransitions provides semantic animation mappings for navigation transitions.
 * 
 * - `Semantic.Forward`: Represents a forward navigation action (e.g., going deeper in navigation)
 * - `Semantic.Backward`: Represents a backward navigation action (e.g., going back in navigation)
 * 
 * Usage:
 *   ViewTransitions.Semantic.Forward
 *   ViewTransitions.Semantic.Backward
 */
export const ViewTransitions = {
    Semantic: {
        // Forward navigation
        Forward: "slideLeft" as AnimationType,
        // Backward navigation
        Backward: "slideRight" as AnimationType,
    }
} as const;

export type SemanticAnimationType = typeof ViewTransitions.Semantic.Forward | typeof ViewTransitions.Semantic.Backward;
