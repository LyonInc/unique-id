# unique-id
Generates unique id

## How does it work

Internally, it uses a `pseudo-encrypt` function based on a similar name from the Postgre Wiki. This encryption (not hashing) function generates a unique 32-bit signed integer from a given 32-bit integer. Since the function is an encryption, we can also infer that the `pseudoEncrypt(pseudoEncrypt(x)) = x;`.

Secondly, the resulting integer is used as a basis for generating a unique code. The integer is converted to the base-N sequence of characters constructed by the alphabet definition.

Users may define their own alphabet sequence, or their own sauce (a permutation formula being used inside `pseudo-encrypt` that produces a value between 0 and 1), to produce a completely different sequence of ids.

## Usage

This package exports a default class named "UniqueIdGenerator". This class creates an instance for generating unique ids.

The constructor for UniqueIdGenerator may receive two parameters:
- `alphabet` - the base of character encryption. The default sequence is `abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789`.
- `sauce` - a permutation formula used for the `pseudo-encrypt` algorithm. The default is 
`((1366 * r1 + 150889) % 714025) / 714025.0)` where `r1` is a 16-bit value.

Once an instance is constructed, the `next` method can be used to generate a unique string. This method receives a number that is used by the `pseudo-encrypt` function.

## Reference

- Stack Overflow: https://stackoverflow.com/a/12590064