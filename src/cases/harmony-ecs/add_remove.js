import { Entity, Format, Query, Schema, World } from "harmony-ecs";

function exec(name, fn) {
  // name = 0;
  if (name) console.time(name);
  fn();
  if (name) console.timeEnd(name);
}

export default (count) => {
  const world = World.make(count);
  const A = Schema.makeBinary(world, Format.int32);
  const B = Schema.makeBinary(world, Format.int32);
  const qa = Query.make(world, [A], Query.not([B]));
  const qab = Query.make(world, [A, B]);

  exec(0 && 'harmony:add_remove create', () => {
    for (let i = 0; i < count; i++) {
      Entity.make(world, [A]);
    }
  });

  // const count2 = 1_000_000;
  // const world2 = World.make(count2);
  // const A2 = Schema.makeBinary(world2, Format.int32);
  // const B2 = Schema.makeBinary(world2, Format.int32);
  // const qa2 = Query.make(world2, [A2], Query.not([B2]));
  // const qab2 = Query.make(world2, [A2, B2]);
  // exec('T harmony:add_remove create', () => {
  //   for (let i = 0; i < count2; i++) {
  //     Entity.make(world2, [A2]);
  //   }
  // });
  // exec('T harmony:add_remove add', () => {
  //   for (let i = 0; i < qa2.length; i++) {
  //     const [e] = qa2[i];
  //     for (let j = e.length - 1; j >= 0; j--) {
  //       Entity.set(world2, e[j], [B2]);
  //     }
  //   }
  // });
  // exec('T harmony:add_remove remove', () => {
  //   for (let i = 0; i < qab2.length; i++) {
  //     const [e] = qab2[i];
  //     for (let j = e.length - 1; j >= 0; j--) {
  //       Entity.unset(world2, e[j], [B2]);
  //     }
  //   }
  // });

  function add() {
    for (let i = 0; i < qa.length; i++) {
      const [e] = qa[i];
      for (let j = e.length - 1; j >= 0; j--) {
        Entity.set(world, e[j], [B]);
      }
    }
  }
  function remove() {
    for (let i = 0; i < qab.length; i++) {
      const [e] = qab[i];
      for (let j = e.length - 1; j >= 0; j--) {
        Entity.unset(world, e[j], [B]);
      }
    }
  }

  exec(0 && 'harmony:add_remove add', add);
  exec(0 && 'harmony:add_remove remove', remove);

  return () => {
      add();
      remove();
  };
};
