class Section {
  constructor({items, renderer}, containerSelector){
    this._initialCards = items;
    this._renderer = renderer; //функция-колбек

    this._containerSelector = containerSelector;
  }


//принимает параметр и вставляет его в разметку
  addItem(element){
    this._containerSelector.append(element)
  }

//перебор массива
  renderItems(){
    this._initialCards.forEach(item => this._renderer(item));
  }
}
export default Section