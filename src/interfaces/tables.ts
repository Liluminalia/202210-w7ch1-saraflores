export type ProtoTable = {
    name: string;
    price: number;
    color: string;
    status: boolean;
};
export type Tables = {
    tables: Array<Table>;
};

export type Table = {
    id: number;
    name: string;
    color: string;
    price: number;
    status: boolean;
};

export class TableModel {
    status: boolean;
    constructor(
        public name: string,
        public color: string,
        public price: number
    ) {
        this.status = false;
    }
}
