// 对象冒充
function Animal(name, price){
    this.name = name;
    this.price = price;

    this.printName = function(){
        console.log(this.name);
    };
}

function Cat(name, price){
    this.inherit = Animal;
    this.inherit(name, price);

    // Animal.call(this, name, price);
    // Animal.apply(this, [name, price]);
}
var cat = new Cat("lily", 100);
cat.printName();
console.log(cat instanceof Animal);     // false

// 原型链实现
function Animal(name){
    this.name = name;
}

Animal.prototype.printName = function(){
    console.log(this.name);
};

function Cat(){

}

Cat.prototype = new Animal('cat');
var cat = new Cat();
cat.printName();    // cat
console.log(cat instanceof Animal);   // true
console.log(cat.constructor);         // [Function Animal]

// 构造函数不对 改变写法
function Animal(name){
    this.name = name;
}

Animal.prototype.printName = function(){
    console.log(this.name);
}

function Cat(){
}

Cat.prototype = new Animal('cat');
Cat.prototype.constructor = Cat;
var cat = new Cat();
console.log(cat.constructor);   // [Function Cat]

// 混合实现
function Animal(name){
    this.name = name;
}

Animal.prototype.printName = function(){
    console.log(this.name);
};

function Cat(name){
    Animal.call(this, name);
}
Cat.prototype = new Animal();
Cat.prototype.constructor = Cat;
var cat = new Cat('cat');
cat.printName();

// 多态
function Animal(name){
    this.name = name;
}
Animal.prototype.printName = function(){
    console.log(this.name);
};

function Cat(name){
    Animal.call(this, name);
}

Cat.prototype = new Animal();
Cat.prototype.constructor = Cat;
Cat.prototype.printName = function(){
    console.log('The name is: '+this.name);
};
var cat = new Cat('cat');
cat.printName();        // The name is: cat