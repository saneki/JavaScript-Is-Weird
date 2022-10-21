const zero = '+[]';
const one = '+!![]';

const number = (n: number): string => {
  if (n === 0) return zero;
  return Array.from({length: n}, () => one).join(' + ');
}

// C

const fromString = (s: string): string =>s.split('').map(x => {
  if (!map.has(x)) {
    const charCode = x.charCodeAt(0);
    return `([]+[])[${fromString('constructor')}][${fromString('fromCharCode')}](${number(charCode)})`;
  }
  return map.get(x);
}).join('+');

const backslash = `(/\\\\/+[])[${number(1)}]`

const map = new Map<string, string>([
  ['a', `(+{}+[])[${number(1)}]`],
  ['b', `({}+[])[${number(2)}]`],
  ['o', `({}+[])[${number(1)}]`],
  ['e', `({}+[])[${number(4)}]`],
  ['c', `({}+[])[${number(5)}]`],
  ['t', `({}+[])[${number(6)}]`],
  [' ', `({}+[])[${number(7)}]`],
  ['f', `(![]+[])[${number(0)}]`],
  ['s', `(![]+[])[${number(3)}]`],
  ['r', `(!![]+[])[${number(1)}]`],
  ['u', `(!![]+[])[${number(2)}]`],
  ['i', `((+!![]/+[])+[])[${number(3)}]`],
  ['n', `((+!![]/+[])+[])[${number(4)}]`],
  ['\\', backslash],
])

map.set('S', `([]+([]+[])[${fromString('constructor')}])[${number(9)}]`)
map.set('g', `([]+([]+[])[${fromString('constructor')}])[${number(14)}]`)
map.set('p', `([]+(/-/)[${fromString('constructor')}])[${number(14)}]`)
map.set('d', `(${number(13)})[${fromString('toString')}](${number(14)})`)
map.set('h', `(${number(17)})[${fromString('toString')}](${number(18)})`)
map.set('m', `(${number(22)})[${fromString('toString')}](${number(23)})`)
map.set('C', `((()=>{})[${fromString('constructor')}](${fromString('return escape')})()(${backslash}))[${number(2)}]`)

const compile = (code: string): string => `(()=>{})[${fromString('constructor')}](${fromString(code)})()`;

console.log(compile('console.log("Hello world!");'));
