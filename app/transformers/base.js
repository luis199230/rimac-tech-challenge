import ExceptionError from "../exceptions/common.js";

class Transformer {
    constructor(params){
        this.item = {};
        this.params = params;
    }
    toString(){
        if(typeof this.params === 'undefined')
            throw new ExceptionError('resource_error', 'Not found');

        if (this.params.length > 1) {
            return this.params.map(item => {
                this.setItem(item);
                return this.getItem();
            });
        }else{
            this.setItem(this.params);
            return this.getItem();
        }
    }
    getItem(){
        return this.item;
    }
    setItem(item){
        this.item = item;
    }
}

export default Transformer;