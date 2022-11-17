import mongoose from 'mongoose';
import { dbConnect } from '../router/db.conect.js';
import { CoffeeRepository } from './coffee.repository.js';

const mockData = [
    {
        name: 'sdsd',
        color: 'jsd',
        taste: 'sdsdsd',
        isExtra: true,
    },
    {
        name: 'froilan',
        color: 'jsd',
        taste: 'sdfsad',
        isExtra: false,
    },
];
describe('Given CoffeeRepository', () => {
    describe('When we instantiate it', () => {
        const repository = new CoffeeRepository();
        let testIds: Array<string>;

        beforeAll(async () => {
            await dbConnect();
            await repository.getModel().deleteMany();
            await repository.getModel().insertMany(mockData);
            const data = await repository.getModel().find();
            testIds = [data[0].id, data[1].id];
        });
        afterAll(() => {
            mongoose.disconnect();
        });

        test('Then getAll should have been called', async () => {
            const result = await repository.getAll();
            expect(result[0].color).toEqual(mockData[0].color);
        });
        test('Then get should have been called', async () => {
            const result = await repository.get(1);
            expect(result.color).toEqual('jsd');
        });
        test('Then post should have been called', async () => {
            const newCoffee = {
                name: 'froi',
                color: 'asdf',
                taste: 'sdflfkfkfksad',
                isExtra: true,
            };
            const result = await repository.post(newCoffee);
            expect(result.name).toEqual(newCoffee.name);
        });
        test('Then patch should have been called', async () => {
            const result = await repository.patch(4, mockData[0]);
            expect(result).toEqual(mockData);
        });
        test('Then delete should have been called', async () => {
            const result = await repository.delete(2);
            expect(result).toEqual([]);
        });
    });
});
