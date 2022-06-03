import { defineBinarySchema, ProtoWorld as World } from './dist/ecstasy.js';

/** @typedef {import('./dist/ecstasy').Id} Id */

function exec(name, fn) {
    name = 0;
    if (name) console.time(name);
    fn();
    if (name) console.timeEnd(name);
}

/** @param {number} count */
export default function (count) {
    const world = new World({ initialTableCapacity: count });

    const A = defineBinarySchema('float64');
    const B = defineBinarySchema('float64');
    const layout = [B];

    /** @type {Id[]} */
    const entities = [];
    const queryA = entities;
    /** @type {Id[]} */
    const queryB = [];

    exec('xtc:entity_cycle create', () => {
        for (let i = 0; i < count; i++) {
            entities.push(world.createEntity([A], i));
        }
    });

    function create2() {
        for (const id of queryA) {
            const value = world.getComponent(id, A);
            queryB.push(world.createEntity(layout, value));
        }
    }
    function destroy() {
        for (const id of queryB) {
            world.destroyEntity(id);
        }
        queryB.length = 0;
    }

    exec('xtc:entity_cycle create2', create2);
    exec('xtc:entity_cycle destroy', destroy);

    return () => {
        create2();
        destroy();
    };
};
