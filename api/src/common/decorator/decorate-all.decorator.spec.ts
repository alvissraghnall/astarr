import { DecorateAll } from './decorate-all.decorator';
import { Expose } from 'class-transformer';

describe('DecorateAll Decorator', () => {
  @DecorateAll(Expose)
  class TestClass {
    property1: any;
    property2: any;

    method1() {
      // ...
    }
  }

  it('should apply decorator to properties', () => {
    const instance = new TestClass();

    const descriptor1 = Object.getOwnPropertyDescriptor(
      instance,
      'property1'
    ) as PropertyDescriptor;

    const descriptor2 = Object.getOwnPropertyDescriptor(
      instance,
      'property2'
    ) as PropertyDescriptor;

    expect(typeof descriptor1.value).toBe('undefined');
    expect(typeof descriptor2.value).toBe('undefined');
    expect(instance['property1']).toBe(undefined);
    expect(instance['property2']).toBe(undefined);
  });

  it('should not apply decorator to methods', () => {
    const instance = new TestClass();

    const descriptor = Object.getOwnPropertyDescriptor(
      instance,
      'method1'
    ) as PropertyDescriptor;

    expect(typeof descriptor.value).toBe('function');
  });
});
