# p3-client

```ts
const p3 = new P3(wallet);

const balance = await p3.getBalance();
console.log(await balance.text());

await deposit(quantity: 10000, target: "");

// "ehpRUY79EO_p0PZuNuZI2BAnVnSAC2fNgrsLyGp5JjI" contains 'Hello world'
const data = await p3.getTxData(
  'ehpRUY79EO_p0PZuNuZI2BAnVnSAC2fNgrsLyGp5JjI',
);
console.log(await r.text());

const tx = await p3.getTx('ehpRUY79EO_p0PZuNuZI2BAnVnSAC2fNgrsLyGp5JjI');
console.log(await tx.json());
```
