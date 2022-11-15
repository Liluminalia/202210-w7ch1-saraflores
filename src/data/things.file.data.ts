import fs from 'fs/promises';
import * as dotenv from 'dotenv'; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config();
import { Data, id } from './data.js';
import { Thing } from '../interfaces/things.js';

export class ThingsFileData implements Data<Thing> {
    dataFile: string;
    constructor() {
        this.dataFile = process.env.DATA_FILE || '';
    }
    async getAll(): Promise<Array<Thing>> {
        return fs
            .readFile(this.dataFile, 'utf-8')
            .then((data) => JSON.parse(data) as Array<Thing>);
    }
    async get(id: id): Promise<Thing> {
        return fs.readFile(this.dataFile, 'utf-8').then((data) => {
            const aData = JSON.parse(data) as Array<Thing>;
            const item = aData.find((item) => item.id === id);
            if (!item) throw new Error();
            return item;
        });
    }
    async post(newThing: Partial<Thing>): Promise<Thing> {
        const aData = await this.getAll();
        const finalThing = { ...(newThing as Thing), id: this.#createID() };
        aData.push(finalThing);
        await this.#writeData(aData);
        return finalThing;
    }
    async patch(id: id, updatedThing: Partial<Thing>): Promise<Thing> {
        const aData = await this.getAll();
        const index = aData.findIndex((item) => item.id === id);
        if (!index) throw new Error('not found id');

        aData[index] = { ...aData[index], ...updatedThing };
        await this.#writeData(aData);
        return aData[index];
    }
    async delete(id: id): Promise<void> {
        const aData = await this.getAll();
        const index = aData.findIndex((item) => item.id === id);
        if (!index) throw new Error('not found id');
        aData.filter((item) => item.id !== id);
        await this.#writeData(aData);
    }
    #createID() {
        return Math.trunc(Math.random() * 1_000_000_000);
    }
    #writeData(data: Array<Thing>) {
        return fs.writeFile(this.dataFile, JSON.stringify(data));
    }
}
