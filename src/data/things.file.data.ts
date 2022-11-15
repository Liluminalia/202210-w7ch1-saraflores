import fs from 'fs/promises';
import * as dotenv from 'dotenv'; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config();
import { Data, id } from './data.js';
import { Thing, Things } from '../interfaces/things.js';

export class ThingsFileData implements Data<Thing> {
    dataFile: string;
    constructor() {
        this.dataFile = process.env.DATA_FILE || '';
    }
    async getAll(): Promise<Array<Thing>> {
        return fs.readFile(this.dataFile, 'utf-8').then((data) => {
            const arraySafe = JSON.parse(data) as Things;
            return arraySafe.things;
        });
    }
    async get(id: id): Promise<Thing> {
        return fs.readFile(this.dataFile, 'utf-8').then((data) => {
            const aData = JSON.parse(data) as Things;
            const item = aData.things.find((item) => item.id === id);
            if (!item) throw new Error();
            return item;
        });
    }
    async post(newThing: Partial<Thing>): Promise<Thing> {
        const aData = await this.getAll();
        const finalThing = { ...(newThing as Thing), id: this.#createID() };
        aData.push(finalThing);
        await this.#writeData({ things: aData });
        return finalThing;
    }
    async patch(id: id, updatedThing: Partial<Thing>): Promise<Thing> {
        const aData = await this.getAll();
        const index = aData.findIndex((item) => item.id === id);
        if (!index) throw new Error('not found id');

        aData[index] = { ...aData[index], ...updatedThing };
        await this.#writeData({ things: aData });
        return aData[index];
    }
    async delete(id: id): Promise<void> {
        const aData = await this.getAll();
        const index = aData.findIndex((item) => item.id === id);
        if (!index) throw new Error('not found id');
        aData.filter((item) => item.id !== id);
        await this.#writeData({ things: aData });
    }
    #createID() {
        return Math.trunc(Math.random() * 1_000_000_000);
    }
    #writeData(data: Things) {
        return fs.writeFile(this.dataFile, JSON.stringify(data));
    }
}
