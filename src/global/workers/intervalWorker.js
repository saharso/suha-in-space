createObjectURL = require('../tools/createobjectURL.ts');

const intervalWorker = ()=>{
    self.onmessage = function(e) {

        if(typeof e.data !== 'number' && !isNaN(e.data)) return self.postMessage('invalid number');
        console.log('from worker');
        const intervalTicks = e.data;

        setInterval(()=>{
            self.postMessage(true);
        }, intervalTicks);
    };
};

module.exports = createObjectURL.default(intervalWorker);