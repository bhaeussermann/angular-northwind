export class Employee {
    constructor(
        public id: number = 0, 
        public firstName: string = "", 
        public lastName: string = "", 
        public title: string = "",
        public birthDate: Date = null) { }
}
