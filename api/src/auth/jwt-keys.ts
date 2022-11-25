import { Injectable } from "@nestjs/common";
import * as fs from "fs";
import * as path from "path";



@Injectable()
export class JwtKeyService {

  async getPrivKey (): Promise<Buffer> {
    return new Promise((resolve, reject) => {
      fs.readFile(path.join(process.cwd(), "./jwtRS256.key"), (err, data) => {
        if (err) reject(err);
        resolve(data);
      })
    });
  }

  getPubKey (): Promise<Buffer> {
    return new Promise((resolve, reject) => {
      fs.readFile(path.join(process.cwd(), "./jwtRS256.key.pub"), (err, data) => {
        if (err) reject(err);
        resolve(data);
      })
    });
  }
}