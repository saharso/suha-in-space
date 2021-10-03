
// spurce https://codesandbox.io/s/web-worker-reactjs-2sswe?file=/src/myClass.js:303-421
createObjectURL = require('../../../../../global/tools/createobjectURL.ts');

const workercode = () => {
    self.onmessage = function(e) {

        if(typeof e.data !== 'number' && !isNaN(e.data)) return self.postMessage('invalid number');

        const maxNumber = e.data;

        const maxRandomTick = 4000;
        const minRandomTick = Math.floor(maxRandomTick / 4);

        let interval;

        let randomTick = maxRandomTick;

        const postRandomNumber = ()=>{
            const randomPrizesIndex = Math.floor(Math.random() * maxNumber);
            randomTick = Math.floor(minRandomTick + Math.random() * maxNumber);
            self.postMessage(randomPrizesIndex);
        };

        clearInterval(interval);

        interval = setInterval(()=>{
            postRandomNumber();
        }, randomTick);


    };
};



module.exports = createObjectURL.default(workercode);
