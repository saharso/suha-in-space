export default function pipeOverrideProps(override?){
    override && Object.keys(override).forEach((key)=>{
        this[key] = override[key];
    });

    return this;
}