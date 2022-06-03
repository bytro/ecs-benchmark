import { defineBinarySchema, World } from './dist/ecstasy.js';

/** @param {number} count */
export default function (count) {
    const world = new World({ initialTableCapacity: count });
    const A = defineBinarySchema('float64');
    const B = defineBinarySchema('float64');
    const C = defineBinarySchema('float64');
    const D = defineBinarySchema('float64');
    const E = defineBinarySchema('float64');
    const queryA = world.createQuery([A]);
    const queryB = world.createQuery([B]);
    const queryC = world.createQuery([C]);
    const queryD = world.createQuery([D]);
    const queryE = world.createQuery([E]);

    for (let i = 0; i < count; i++) {
        world.createEntity([A, B, C, D, E], 1, 2, 3, 4, 5);
    }

    return () => {
        for (const e of queryA) {
            e.set(A, e.get(A) * 2);
        }
        for (const e of queryB) {
            e.set(B, e.get(B) * 2);
        }
        for (const e of queryC) {
            e.set(C, e.get(C) * 2);
        }
        for (const e of queryD) {
            e.set(D, e.get(D) * 2);
        }
        for (const e of queryE) {
            e.set(E, e.get(E) * 2);
        }
    };
};
