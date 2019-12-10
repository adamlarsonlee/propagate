function square(m, cell) {
  function component() {
    function getDivs(squareSize) {
      const rows = [];
      let row;
      const size = `${((1 / squareSize) * 100)}`;
      for (let x = 0; x < squareSize; x += 1) {
        row = [];
        for (let y = 0; y < squareSize; y += 1) {
          row.push(m(`.w-${size}.h-100`, m(cell, { x, y })));
        }
        rows.push(m(`.flex.w-100.h-${size}`, Array.from(row)));
      }
      return rows;
    }

    return {
      view: () => m('.w-100.h-100', getDivs(50)),
    };
  }

  return component;
}

module.exports = square;
