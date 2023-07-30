import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { User, UserDocument } from '@user/user.schema';
import { Model } from 'mongoose';
import { getModelToken } from '@nestjs/mongoose';
import { UserService } from '@user/user.service';
import { UserModule } from '@user/user.module';
import { HashService } from '@user/password-hash.service';
import { ProductModule } from '@product/product.module';

describe('AuthService', () => {
  let service: AuthService;
  let mockUserModel: Model<UserDocument>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService, 
        UserService,
        HashService,
        {
          provide: getModelToken(User.name),
          useValue: Model
      }],
      imports: [UserModule, ProductModule]
    }).compile();

    mockUserModel = module.get<Model<UserDocument>>(getModelToken(User.name));
    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(mockUserModel).toBeDefined();
  });

  it('should return a user doc', async () => {
    const user = new User();
    const userId = "840d59f0";
    const spy = jest.spyOn(mockUserModel, 'findById')
      .mockResolvedValue(user as UserDocument)

    await mockUserModel.findById(userId);
    expect(spy).toBeCalled();
  })
});
