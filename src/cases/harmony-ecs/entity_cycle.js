import { Entity, Format, Query, Schema, World } from "harmony-ecs";

function exec(name, fn) {
  name = 0;
  if (name) console.time(name);
  fn();
  if (name) console.timeEnd(name);
}

export default (count) => {
  const world = World.make(count);
  const A = Schema.makeBinary(world, Format.float64);
  const B = Schema.makeBinary(world, Format.float64);
  const qa = Query.make(world, [A]);
  const qb = Query.make(world, [B]);
  const type = [B];

  exec('harmony:entity_cycle create', () => {
    for (let i = 0; i < count; i++) {
      Entity.make(world, [A], [i]);
    }
  });

  function create2() {
    for (let i = 0; i < qa.length; i++) {
      const [e, [a]] = qa[i];
      for (let j = 0; j < e.length; j++) {
        Entity.make(world, type, [a[j]]);
      }
    }
  }
  function destroy() {
    for (let i = 0; i < qb.length; i++) {
      const [e] = qb[i];
      for (let j = e.length - 1; j >= 0; j--) {
        Entity.destroy(world, e[j], B);
      }
    }
  }

  exec('harmony:entity_cycle create2', create2);
  exec('harmony:entity_cycle destroy', destroy);

  return () => {
      create2();
      destroy();
  };
};
