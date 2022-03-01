// Observer Design Pattern Implementation In Typescript
// Run in command (require installing ts-node): npx ts-node observer.ts

interface Subject {
  registerObserver: (o: Observer) => void;
  removeObserver: (o: Observer) => void;
  notifyObserver: () => void;
}

interface Observer {
  update: (newCokePrice: number, newSnackPrice: number) => void;
}

class StoreManager implements Subject {
  observers: Observer[];
  private cokePrice!: number;
  private snackPrice!: number;

  constructor() {
    this.observers = [];
  }

  registerObserver = (o: Observer) => {
    this.observers.push(o);
  };

  removeObserver = (o: Observer) => {
    this.observers = this.observers.filter((_o: Observer) => o !== _o);
  };

  notifyObserver = () => {
    this.observers.map((o: Observer) => o.update(this.cokePrice, this.snackPrice));
  };

  pricesChange = () => {
    this.notifyObserver();
  };

  setNewPrice = (_cokePrice: number, _snackPrice: number) => {
    this.cokePrice = _cokePrice;
    this.snackPrice = _snackPrice;

    this.pricesChange();
  };
}

class Store implements Observer {
  name: string;
  cokePrice!: number;
  snackPrice!: number;
  storeManager: Subject;

  constructor(_name: string, _storeManager: Subject) {
    this.name = _name;

    this.storeManager = _storeManager;
    _storeManager.registerObserver(this);
  }

  update = (newCokePrice: number, newSnackPrice: number) => {
    this.cokePrice = newCokePrice;
    this.snackPrice = newSnackPrice;
  };

  display = () => {
    console.log(`Store ${this.name} has coke price ${this.cokePrice} and snack price ${this.snackPrice}`);
  };
}

const storeManager: StoreManager = new StoreManager();
const storeQ1: Store = new Store("Q1", storeManager);
const storeQ3: Store = new Store("Q3", storeManager);
const storeQ5: Store = new Store("Q5", storeManager);
console.log("Store manager set new prices: 5, 10");
storeManager.setNewPrice(5, 10);
storeQ1.display();
storeQ3.display();
storeQ5.display();

console.log("Remove store Q5");
storeManager.removeObserver(storeQ5);
console.log("Store manager set new prices: 20, 30");
storeManager.setNewPrice(20, 30);
storeQ1.display();
storeQ3.display();
storeQ5.display();
