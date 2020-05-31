function cards() {
    //Menu
    class MenuItem {
        constructor(img, name, description, price, parentSelector, ...classes){
            this.parent = document.querySelector(parentSelector);
            this.img = img;
            this.classes = classes;
            this.name = name;
            this.description = description;
            this.price = price;
            this.transfer = 27;
            this.changeToUAH(); 
        }

        changeToUAH() {
            this.price = this.price * this.transfer; 
        }

        render() {
            const element = document.createElement('div');
            if (this.classes.length === 0) {
                this.element = 'menu__item';
                element.classList.add(this.element);
            } else {
                this.classes.forEach(className => element.classList.add(className));
            }
            
            element.innerHTML = `
                <img src=${this.img} alt=${this.name}>
                <h3 class="menu__item-subtitle">${this.name}</h3>
                <div class="menu__item-descr">${this.description}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                </div>
            `;

            this.parent.append(element);
        }
    }

    // getResource('http://localhost:3000/menu')
    // .then(data => {
    //     data.forEach(({img, title, descr, price}) => {
    //         new MenuItem(img, title, descr, price, ".menu .container").render();
    //     });
    // });

    axios.get('http://localhost:3000/menu')
        .then(data => {
            data.data.forEach(({img, title, descr, price}) => {
                new MenuItem(img, title, descr, price, ".menu .container").render();
            });
        });
}

export default cards;