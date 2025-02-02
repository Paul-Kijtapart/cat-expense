class Category {
    static Food = new Category('Food');
    static Furniture = new Category('Furniture');
    static Accessory = new Category('Accessory');

    constructor(name) {
        this.name = name;
    }

    toString() {
        return `Category.${this.name}`;
    }
}

class Expense {
    constructor(item, category, amount) {
        this.item = item; // "Whiskers  Cat food"
        this.category = category; // "Food"
        this.amount = amount; // 10
    }
}

export {
    Expense,
    Category
};