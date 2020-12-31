import * as serial from 'short-uuid';
import { IPhone } from '../api/phones/types';
import { getMetadata } from './getMetadata';

const types = [
    'Samsung',
    'Apple',
    'Huawei',
    'Nokia',
    'Sony',
    'HTC',
    'Motorola',
    'Lenovo',
];

const colors = [
    'black',
    'white',
    'red',
    'pink',
    'grey',
    'yellow',
    'purple',
    'blue',
    'green',
];

function phoneSeeder(qty: number): IPhone[] {
    const fillers: IPhone[] = [];
    for (let i = 0; i < qty; i += 1) {
        const data = {
            type: types[Math.floor(Math.random() * types.length)],
            color: colors[Math.floor(Math.random() * types.length)],
            serial: serial.generate(),
        };

        const entry = {
            ...data,
            metadata: getMetadata(data),
        };

        fillers.push(entry);
    }

    return fillers;
}

export { phoneSeeder };
