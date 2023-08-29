import { Injectable } from '@nestjs/common';
// import { v4 as uuid } from 'uuid'; 
import { Types } from 'mongoose';

@Injectable()
export class MockMongooseService<T> {
  private data: T[] = [];

  constructor(obj: T & { [x: string]: unknown }) {
    
  }

  create (item: T): T {
    const newItem = { ...item, _id: new Types.ObjectId() };
    
    this.data.push(newItem);
    return newItem;
  }

  save(item: T & { _id?: Types.ObjectId }): T {
    if (item._id) {
      const index = this.data.findIndex(existingItem => (existingItem as any)._id === item._id);
      if (index !== -1) {
        this.data[index] = item;
        return this.data[index];
      }
    }
    return this.create(item);
  }

  findAll(): T[] {
    return this.data;
  }

  findById(id: Types.ObjectId): T {
    return this.data.find(item => (item as T & { _id?: Types.ObjectId })._id.equals(id));
  }

  findByIdAndUpdate(id: string, updates: Partial<T>): T {
    const index = this.data.findIndex(item => (item as any)._id === id);
    if (index === -1) {
      return null;
    }
    this.data[index] = { ...this.data[index], ...updates };
    return this.data[index];
  }

  findByIdAndDelete(id: string): boolean {
    const index = this.data.findIndex(item => (item as any)._id === id);
    if (index === -1) {
      return false;
    }
    this.data.splice(index, 1);
    return true;
  }
}
