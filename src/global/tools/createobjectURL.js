export default function createObjectURL(workercode){
    let code = workercode.toString();
    code = code.substring(code.indexOf('{') + 1, code.lastIndexOf('}'));

    const blob = new Blob([code], { type: 'application/javascript' });
    const randomIndexWorker = URL.createObjectURL(blob);
    return randomIndexWorker;
}

// module.export = createObjectURL;