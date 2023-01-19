
export enum ProductSize {
    XS = "xs",
    SMALL = "s",
    MEDIUM = "m",
    LARGE = "l",
    XL = "xl", 
    XXL = "xxl"
}

export interface Product {
    id?: string;

    title: string;

    desc: string;

    image: string;

    category: string;

    size: ProductSize[];

    color: string[];
    
    price: number;

    inStock: boolean;
    
    createdAt: Date;
    
    updatedAt: Date;
}