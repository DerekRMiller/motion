import {
    SVGAttributes,
    HTMLAttributes,
    ForwardRefExoticComponent,
    PropsWithoutRef,
    RefAttributes,
    ReactType,
} from "react"
import { elements, HTMLElements, SVGElements } from "./utils/supported-elements"
import { MotionProps } from "./types"
import { createMotionComponent } from "./component"
export { MotionContext } from "./context/MotionContext"
export { MotionValuesMap } from "./utils/use-motion-values"
export { useExternalRef } from "./utils/use-external-ref"
export {
    ComponentAnimationControls,
} from "../animation/ComponentAnimationControls"
export { createMotionComponent }
export { htmlElements, svgElements } from "./utils/supported-elements"

interface HTMLAttributesWithoutMotionProps<K>
    extends Pick<
        HTMLAttributes<K>,
        Exclude<keyof HTMLAttributes<K>, keyof MotionProps>
    > {}

export interface HTMLMotionProps<K>
    extends HTMLAttributesWithoutMotionProps<K>,
        MotionProps {}

/**
 * Motion-optimised versions of React's HTML components.
 *
 * @public
 */
export type HTMLMotionComponents = {
    [K in HTMLElements]: ReactType<HTMLMotionProps<K>>
}

interface SVGAttributesWithoutMotionProps
    extends Pick<
        SVGAttributes<SVGElement>,
        Exclude<keyof SVGAttributes<SVGElement>, keyof MotionProps>
    > {}
/**
 * @public
 */
export interface SVGMotionProps
    extends SVGAttributesWithoutMotionProps,
        MotionProps {}

type ForwardRefComponent<T, P> = ForwardRefExoticComponent<
    PropsWithoutRef<P> & RefAttributes<T>
>

/**
 * Motion-optimised versions of React's SVG components.
 *
 * @public
 */
export type SVGMotionComponents = {
    [K in SVGElements]: ForwardRefComponent<SVGElement, SVGMotionProps>
}

/**
 * A factory to create motion-optimised versions of existing React DOM components.
 *
 * @public
 */
export type CustomMotionComponent = { custom: typeof createMotionComponent }

/**
 * Motion-optimised versions of React DOM components.
 *
 * ```jsx
 * <motion.div />
 * <motion.circle />
 * const Component = motion.custom(ExistingComponent)
 * ```
 *
 * @public
 */
export type MotionComponents = CustomMotionComponent &
    HTMLMotionComponents &
    SVGMotionComponents

/**
 * HTML & SVG components, optimised for use with gestures and animation. These can be used as
 * drop-in replacements for any HTML & SVG component, all CSS & SVG properties are supported.
 *
 * ```jsx
 * <motion.div animate={{ x: 100 }} />
 *
 * <motion.p animate={{ height: 200 }} />
 *
 * <svg><motion.circle r={10} animate={{ r: 20 }} /></svg>
 * ```
 *
 * @public
 */
export const motion = elements.reduce(
    (acc, element) => {
        acc[element] = createMotionComponent(element)
        return acc
    },
    {
        custom: createMotionComponent,
    }
) as MotionComponents
