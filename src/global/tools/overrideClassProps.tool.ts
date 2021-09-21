export default function overrideClassPropsTool(override?){
    override && Object.keys(override).forEach((key)=>{
        this[key] = override[key];
    });

    return this;
}