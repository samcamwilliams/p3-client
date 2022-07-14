# Arg8-JS

```ts
const arg8 = new Arg8(wallet);

const balance = await arg8.getBalance();
console.log(await balance.text());

// "ehpRUY79EO_p0PZuNuZI2BAnVnSAC2fNgrsLyGp5JjI" contains 'Hello world'
const data = await arg8.getTxData(
  'ehpRUY79EO_p0PZuNuZI2BAnVnSAC2fNgrsLyGp5JjI',
);
console.log(await r.text());

const tx = await arg8.getTx('ehpRUY79EO_p0PZuNuZI2BAnVnSAC2fNgrsLyGp5JjI');
console.log(await tx.json());
```
