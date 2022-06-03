import { defineBinarySchema, World } from './dist/ecstasy.js';

/** @param {number} count */
export default function (count) {
    const world = new World({ initialTableCapacity: count });
    const A = defineBinarySchema('float64');
    const B = defineBinarySchema('float64');
    const C = defineBinarySchema('float64');
    const D = defineBinarySchema('float64');
    const E = defineBinarySchema('float64');
    const queryAB = world.createQuery([A, B]);
    const queryCD = world.createQuery([C, D]);
    const queryCE = world.createQuery([C, E]);

    for (let i = 0; i < count; i++) {
        world.createEntity([A, B], 0, 1);
        world.createEntity([A, B, C], 0, 1, 2);
        world.createEntity([A, B, C, D], 0, 1, 2, 3);
        world.createEntity([A, B, C, E], 0, 1, 2, 4);
    }

    return () => {
        for (const e of queryAB) {
            const x = e.get(A);
            e.set(A, e.get(B));
            e.set(B, x);
        }
        for (const e of queryCD) {
            const x = e.get(C);
            e.set(C, e.get(D));
            e.set(D, x);
        }
        for (const e of queryCE) {
            const x = e.get(C);
            e.set(C, e.get(E));
            e.set(E, x);
        }
    };
};
