interface IPojo<T = {}> {
    [key: string]: any | T;
}

export default IPojo;