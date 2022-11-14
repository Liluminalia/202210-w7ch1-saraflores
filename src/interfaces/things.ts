export type ProtoThing = {
    name: string;
    age: number;
    status: boolean;
};

export type Thing = {
    id: number;
    name: string;
    age: number;
    status: boolean;
};

export class ThingModel {
    status: boolean;
    constructor(public title: string, public responsible: string) {
        this.status = false;
    }
}
