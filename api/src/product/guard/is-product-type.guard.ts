import { Product } from "@product/product.schema";


/**
 * Type guard to check if an object matches the structure of the Product class.
 * @param object The object to be checked.
 * @returns true if the object matches the Product class structure, false otherwise.
 */
export function isProduct(object: any): object is Product {
    if (
        object?.title !== undefined &&
        typeof object.title === 'string' &&
        object?.desc !== undefined &&
        typeof object.desc === 'string' &&
        object?.image !== undefined &&
        typeof object.image === 'string' &&
        object?.category !== undefined &&
        typeof object.category === 'string' &&
        object?.sizes !== undefined &&
        Array.isArray(object.sizes) &&
        object?.colors !== undefined &&
        Array.isArray(object.colors) &&
        object?.price !== undefined &&
        typeof object.price === 'number' &&
        object?.rating !== undefined &&
        typeof object.rating === 'number' &&
        (object.discountPercentage === undefined ||
            (typeof object.discountPercentage === 'number' &&
                object.discountPercentage >= 0 &&
                object.discountPercentage <= 100)) &&
        object?.discountIsActive !== undefined &&
        typeof object.discountIsActive === 'boolean' &&
        object?.inStock !== undefined &&
        typeof object.inStock === 'boolean'
    ) {
        return true;
    } else {
        // Log which property is causing the validation to fail
        // console.error('Validation failed for property:', getPropertyCausingValidationFailure(object));
        return false;
    }
}

function getPropertyCausingValidationFailure(object: any): string {
    const propertiesToCheck = [
      'title', 'desc', 'image', 'category', 'sizes', 'colors',
      'price', 'rating', 'discountPercentage', 'discountIsActive',
      'inStock'
    ];
  
    for (const property of propertiesToCheck) {
      if (object[property] === undefined) {
        return property;
      }
    }
  
    return 'unknown';
}