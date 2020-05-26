export class Todo{
    constructor(value,completed, trash, id){
        this.content = value;
        this.completed = completed;
        this.trash = trash
     
        this.id = id
    }
        getValue(){
        return this.content;
    }
}