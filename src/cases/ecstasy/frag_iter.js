import { defineBinarySchema, World } from './dist/ecstasy.js';

/** @param {number} count */
export default function (count) {
    const COMPS = 26;
    const schemas = [];
    const world = new World({ initialTableCapacity: count });

    for (let i = 0; i < COMPS; i++) {
        schemas.push(defineBinarySchema('int32'));
    }

    const Z = schemas[schemas.length - 1];
    const Data = defineBinarySchema('int32');
    const queryData = world.createQuery([Data]);
    const queryZ = world.createQuery([Z]);

    for (let i = 0; i < count; i++) {
        for (let j = 0; j < COMPS; j++) {
            world.createEntity([schemas[j], Data], i + j, i - j);
        }
    }

    return () => {
        for (const e of queryData) {
            e.set(Data, e.get(Data) * 2);
        }
        for (const e of queryZ) {
            e.set(Z, e.get(Z) * 2);
        }
    };
};
