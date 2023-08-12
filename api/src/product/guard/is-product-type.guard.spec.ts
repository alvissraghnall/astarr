import { Types } from 'mongoose';
import { isProduct } from './is-product-type.guard';

describe('isProduct', () => {
  const validProduct = {
    sizes: ['m'],
    rating: 0,
    discountIsActive: false,
    _id: new Types.ObjectId('63c95a56bd14cbe9fbcbab35'),
    title: 'Mens Casual Premium Slim Fit T-Shirts ',
    desc:
      'Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing. And Solid stitched shirts with round neck made for durability and a great fit for casual fashion wear and diehard baseball fans. The Henley style round neckline includes a three-button placket.',
    image:
      'https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg',
    category: "men's clothing",
    size: ['m'],
    color: ['ash', 'purple'],
    price: 22.3,
    inStock: true,
    createdAt: new Date('2023-01-19T14:57:26.204Z'),
    updatedAt: new Date('2023-01-19T14:57:26.204Z'),
    __v: 0,
  };

  it('should return true for a valid Product object', () => {
    expect(isProduct(validProduct)).toBe(true);
  });

  it('should return false for an invalid Product object', () => {
    const invalidProduct = { title: 'Invalid Product' };
    expect(isProduct(invalidProduct)).toBe(false);
  });
});
