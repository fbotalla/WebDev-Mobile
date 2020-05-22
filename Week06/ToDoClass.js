export class Todo{
    constructor(value, date){
        this.content = value;
        this.completed = false;
        this.id = date
    }
    
    getValue(){
        return this.content;
    }
   
}