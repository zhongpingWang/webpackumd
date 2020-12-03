import B from "./a"

var A = {
    show(a:string){
        console.log(a);
    }
}

export const Libs = {

    show(){
        B.show("dsfsdf");
        A.show("123");
    }
}

