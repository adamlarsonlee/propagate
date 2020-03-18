function cell(m, eventEmitter) {
  function component() {
    let x;
    let y;
    let background = 'white';
    let flickering = false;
    const flickerDuration = 50;

    const backgrounds = [
      'black',
      'red',
      'yellow',
      'pink',
      'green',
      'blue',
      'orange',
      'gray',
      'purple',
      'rainbow',
    ];

    function flicker(color) {
      if (flickering) { return false; }
      flickering = true;
      if (color === 'rainbow') {
        background = backgrounds[Math.floor(Math.random() * backgrounds.length)];
      } else {
        background = color;
      }
      setTimeout(() => {
        background = 'white';
        flickering = false;
      }, flickerDuration);
      return true;
    }

    function emit(epicenter, color) {
      eventEmitter.emit(`propagate-${x}-${y}`, {
        epicenter,
        edge: { x, y },
        color,
      });
    }

    function getCell() {
      return m(`.w-100.h-100.pointer.bg-${background}`, {
        onclick: () => {
          const color = backgrounds[Math.floor(Math.random() * backgrounds.length)];
          flicker(color);
          setTimeout(() => emit({ x, y }, color), flickerDuration);
        },
      }, '');
    }

    function is(point) {
      return x === point.x && y === point.y;
    }

    function edgeIsAdjacent(edge) {
      return Math.abs(x - edge.x) + Math.abs(y - edge.y) <= 1;
    }

    function between(epicenter, edge) {
      return Math.abs(edge.x - epicenter.x) + Math.abs(edge.y - epicenter.y) >= Math.abs(x - epicenter.x) + Math.abs(y - epicenter.y);
    }

    function registerAdjacentEvents() {
      for (let adjacentX = -1; adjacentX < 2; adjacentX += 1) {
        for (let adjacentY = -1; adjacentY < 2; adjacentY += 1) {
          if (adjacentX !== 0 || adjacentY !== 0) {
            eventEmitter.on(`propagate-${x - adjacentX}-${y - adjacentY}`, ({ epicenter, edge, color }) => {
              if (edgeIsAdjacent(edge) && !between(epicenter, edge) && !is(edge) && !is(epicenter)) {
                if (flicker(color)) {
                  setTimeout(() => emit(epicenter, color), flickerDuration);
                }
              }
            });
          }
        }
      }
    }

    return {
      oninit: ({ attrs }) => {
        x = attrs.x;
        y = attrs.y;
        registerAdjacentEvents();
      },
      view: () => getCell(),
    };
  }

  return component;
}

module.exports = (container) => {
  container.service('cell', cell, 'm', 'eventEmitter');
};
