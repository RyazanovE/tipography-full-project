import { faker } from '@faker-js/faker';
import { User } from 'src/user/entities/user.entity';
import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';


export class MainSeeder implements Seeder {
  public async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<any> {    
    console.log('seeding users...');
    const userFactory = factoryManager.get(User);
    const users = await userFactory.saveMany(10);
  }
}
