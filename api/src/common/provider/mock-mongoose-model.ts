

export class MockModel <T> {

    constructor(public data?: T) {}

    save() {
        return this.data;
    }

    static findOne({ _id }) {
        // return data;
    }
}