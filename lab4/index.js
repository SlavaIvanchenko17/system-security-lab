'use strict';

const util = require('util');
const forge = require('node-forge');
const Big = require('big.js');

const generateProbablePrime = util.promisify(forge.prime.generateProbablePrime);

const options = {
    algorithm: {
        name: 'PRIMEINC',
        workers: -1,
    },
};

class RSA {
    static async generateBigNumber (bits) {
        const number = await generateProbablePrime(bits, options);
        return new Big(number.toString());
    };

    static add(a, b) {
        return a.plus(b);
    }

    static mul(a, b) {
        return a.mul(b);
    }

    static pow(a) {
        return a.pow(2);
    }

    static mod(a, n) {
        return a.mod(n);
    }
}

//Usage
(async () => {
    try {
        const a = await RSA.generateBigNumber(2048);
        const b = await RSA.generateBigNumber(2048);

        console.log(`a => ${a}`);
        console.log(`b => ${b}`);

        console.log(`add => ${RSA.add(a, b).toString()}`);
        console.log(`mul => ${RSA.mul(a, b).toString()}`);
        console.log(`pow => ${RSA.pow(a).toString()}`);
        console.log(`mod => ${RSA.mod(a, b).toString()}`);
    } catch (err) {
        console.error(err);
    }
})();