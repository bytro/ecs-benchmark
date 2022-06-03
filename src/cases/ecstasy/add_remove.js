import { defineBinarySchema, ProtoWorld as World } from './dist/ecstasy.js';

/** @typedef {import('./dist/ecstasy').Id} Id */

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

    /** @type {Id[]} */
    const entities = [];
    const queryA = entities;
    const queryB = entities;

    exec(0 && 'xtc:add_remove create', () => {
        for (let i = 0; i < count; i++) {
            entities.push(world.createEntity([A], i));
        }
    });

    // const count2 = 1_000_000;
    // const world2 = new World({ initialTableCapacity: count2 });
    // const entities2 = [];
    // const queryA2 = entities2;
    // const queryB2 = entities2;
    // exec('T xtc:add_remove create', () => {
    //     for (let i = 0; i < count2; i++) {
    //         entities2.push(world2.createEntity([A], i));
    //     }
    // });
    // exec('T xtc:add_remove add', () => {
    //     for (let i = queryA2.length - 1; i >= 0; --i) {
    //         const id = queryA2[i];
    //         world2.addComponent(id, B, 0);
    //     }
    // });
    // exec('T xtc:add_remove remove', () => {
    //     for (const id of queryB2) {
    //         world2.removeComponent(id, B);
    //     }
    // });

    // console.log(world2.store.stat.map(x => (x * 1000).toFixed(3)).join(', '));

    function add() {
        // for (const id of queryA) {
        for (let i = queryA.length - 1; i >= 0; --i) {
            const id = queryA[i];
            world.addComponent(id, B, 0);
        }
    }
    function remove() {
        for (const id of queryB) {
        // for (let i = queryB.length - 1; i >= 0; --i) {
        //     const id = queryB[i];
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
