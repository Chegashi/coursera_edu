// Task 1: Code a Person class
class Person{
    constructor(name = "Tom", age = 20, energy = 100)
    {
        this.name = name;
        this.age = age;
        this.energy = energy;
    }
    sleep() {
        this.energy += 10;
    }
    doSomethingFun() {
        this.energy -= 10;
    }
}

// Task 2: Code a Worker class
class Worker extends Person {
    constructor(name = "Tom", age = 20, energy = 100, xp = 0, hourlyWage = 10) {
        super(name, age, energy);
        this.xp = xp;
        this.hourlyWage = hourlyWage;
    }
    goToWork() {
        this.xp += 10;
    }
}

// Task 3: Code an intern object, run methods
function intern() {
    let __intern = new Worker();
    __intern.name = 'Bob';
    __intern.age = 21;
    __intern.energy = 110;
    __intern.xp = 0;
    __intern.hourlyWage = 10;
    __intern.goToWork();
    return __intern;
}

// Task 4: Code a manager object, methods
function manager() {
    var new_Worker = new Worker();
    new_Worker.name = 'Alice';
    new_Worker.age = 30;
    new_Worker.energy = 120;
    new_Worker.xp = 100;
    new_Worker.hourlyWage = 30;
    new_Worker.doSomethingFun();
    return new_Worker;
}

// print(intern())
let p = new Person("k");
console.log(intern())
console.log(manager())