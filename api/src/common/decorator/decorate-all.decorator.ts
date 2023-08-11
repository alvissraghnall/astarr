// import { applyDecorators } from "@nestjs/common";

import { Expose } from "class-transformer";

/**
 * Decorates all non-method properties of a class prototype with the specified decorator.
 * 
 * This utility function applies the given decorator to all non-method properties of
 * a class prototype. It iterates through the property names of the prototype and
 * checks if each property descriptor represents a non-method property (e.g., not a function).
 * If the conditions are met, the decorator is applied to the property.
 * 
 * @param {PropertyDecorator} decorator - The decorator function to be applied to properties.
 * @returns {(target: any) => void} A higher-order function that applies the decorator to properties.
 * 
 * @example
 * Applying a decorator to properties of a class prototype
 * 
 * `@DecorateAll(MyPropertyDecorator)
 * class MyClass {
 *     property1: any;
 *     property2: any;
 *     method1() {
 *     }
 * }`
 */
export function DecorateAll(decorator: PropertyDecorator): (target: any) => void {
    return (target: any) => {
        console.log(target, target.prototype);
        const propertyNames = Object.getOwnPropertyNames(target.prototype);
        console.log(propertyNames);
        for (const propName of propertyNames) {
            const descriptor = Object.getOwnPropertyDescriptor(target.prototype, propName);
            if (descriptor && typeof descriptor.value !== 'function') {
                decorator(target.prototype, propName);
            }
        }
    };
}

