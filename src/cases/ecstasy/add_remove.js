import { not, defineBinarySchema, World } from './dist/ecstasy.js';

function exec(name, fn) {
    // name = 0;
    if (name) console.time(name);
    fn();
    if (name) console.timeEnd(name);
}

/** @param {number} count */
export default function (count) {
    const world = new World({ initialTableCapacity: count });
    const A = defineBinarySchema('int32');
    const B = defineBinarySchema('int32');
    const queryA = world.createQuery([A], not(B));
    const queryAB = world.createQuery([A, B]);

    exec(0 && 'xtc:add_remove create', () => {
        for (let i = 0; i < count; i++) {
            world.createEntity([A], i);
        }
    });

    function add() {
        for (const e of queryA) {
            world.addComponent(e.id(), B, 0);
        }
    }
    function remove() {
        for (const id of [...queryAB.ids()]) {
            world.removeComponent(id, B);
        }
    }

    exec(0 && 'xtc:add_remove add', add);
    exec(0 && 'xtc:add_remove remove', remove);

    return () => {
        add();
        remove();
    };
};
