import { defineBinarySchema, World } from './dist/ecstasy.js';

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
    const queryA = world.createQuery([A]);
    const queryB = world.createQuery([B]);
    const layout = [B];

    exec('xtc:entity_cycle create', () => {
        for (let i = 0; i < count; i++) {
            world.createEntity([A], i);
        }
    });

    function create2() {
        for (const e of queryA) {
            world.createEntity(layout, e.get(A));
        }
    }
    function destroy() {
        for (const id of [...queryB.ids()]) {
            world.destroyEntity(id);
        }
    }

    exec('xtc:entity_cycle create2', create2);
    exec('xtc:entity_cycle destroy', destroy);

    return () => {
        create2();
        destroy();
    };
};
