# P3 JS/TS Client

This client allows you to interact with services using [P3](https://arweave.net/UoDCeYYmamvnc0mrElUxr5rMKUYRaujo9nmci206WjQ) on the permaweb.

Here's how to get started:

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
