
// spurce https://codesandbox.io/s/web-worker-reactjs-2sswe?file=/src/myClass.js:303-421
createObjectURL = require('../../../../../global/tools/createobjectURL.js');

const workercode = () => {
    self.onmessage = function(e) {

        if(typeof e.data !== 'number' && !isNaN(e.data)) return self.postMessage('invalid number');

        const maxNumber = e.data;

        const postRandomNumber = ()=>{
            const randomPrizesIndex = Math.floor(Math.random() * maxNumber);
            self.postMessage(randomPrizesIndex);
        };

        setInterval(()=>{
            postRandomNumber();
        }, 1000);


    };
};



module.exports = createObjectURL.default(workercode);
