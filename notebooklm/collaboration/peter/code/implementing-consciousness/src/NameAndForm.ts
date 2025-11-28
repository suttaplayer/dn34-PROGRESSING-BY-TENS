import { INameAndForm } from './interfaces';

export class NameAndForm implements INameAndForm {
    public attention: number;

    constructor(attention: number) {
        this.attention = attention;
        console.log(`Name-and-Form established with attention level: ${this.attention}`);
    }
}
