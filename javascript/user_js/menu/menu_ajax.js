function getMenuData(e) {
    e.preventDefault();

    const http = new XMLHttpRequest();

    http.open("GET", "/javascript/user_js/menu/menus.json", true);

    http.onload = function () {
        if (http.status === 200) {
            const menus = JSON.parse(this.responseText);

            let output = "";
            menus.forEach(function (menu) {
                output += `
                <div class="menus__card  mix ${menu.className}">
                    <div class="menus__img__container">
                        <div class="menus__img">
                            <picture>
                                <source type="image/webp" srcset="${menu.menu_img}">
                                <source type="image/jpeg" srcset="${menu.menu_img}">
                                <img loading="lazy" src="${menu.menu_img}" alt="menu-img">
                            </picture>
                        </div>
                    </div>

                    <div class="menus__title">
                        <h3 class="menus__name">${menu.menu_name}</h3>
                        <p class="menus__price">MMK ${menu.menu_price} Ks</p>
                    </div>

                    <div class="menus__raw">
                        <p class="raw1">${menu.menu_raw1}</p>
                        <span class="seperate__raw">/</span>
                        <p class="raw2">${menu.menu_raw2}</p>
                        <span class="seperate__raw">/</span>
                        <p class="raw3">${menu.menu_raw3}</p>
                    </div>

                    <p class="menus__details">
                        ${menu.menu_details}
                    </p>

                    <div class="quantity__container">
                        <p>quantity</p>
                        <div class="quantity__count">
                            <span class="minus"><i class="fa-solid fa-minus"></i></span>
                            <p>1</p>
                            <span class="plus"><i class="fa-solid fa-plus"></i></span>
                        </div>
                    </div>

                    <div class="menuBtn__container">
                        <button class="button quick__view">
                            <p>quick view</p>
                        </button>

                        <button class="button add__cart">
                            <p>add to cart</p>
                        </button>
                    </div>

                    <!-- menu details explaination -->
                    <div class="menus__explaination__container">
                        <div class="menus__explaination">
                            <i class="fa-sharp fa-solid fa-circle-xmark"></i>
                            <div class="menus__img__card">
                                <div class="menus__exp__img">
                                    <picture>
                                        <source type="image/webp" srcset="${menu.menu_img}">
                                        <source type="image/jpeg" srcset="${menu.menu_img}">
                                        <img loading="lazy" src="${menu.menu_img}" alt="menu-img">
                                    </picture>
                                </div>
                            </div>

                            <div class="menus__exp__details">
                                <div class="menus__title">
                                    <h3 class="menus__name">${menu.menu_name}</h3>
                                    <p class="menus__price">MMK ${menu.menu_price} Ks</p>
                                </div>

                                <div class="menus__raw">
                                    <p class="raw1">${menu.menu_raw1}</p>
                                    <span class="seperate__raw">/</span>
                                    <p class="raw2">${menu.menu_raw2}</p>
                                    <span class="seperate__raw">/</span>
                                    <p class="raw3">${menu.menu_raw3}</p>
                                </div>

                                <p class="menus__details">
                                    ${menu.menu_details}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div class="cart__banner">
                        <p><span class="count">1</span> new item(s) have been added to your cart</p>
                    </div>
                </div>
                `
            })

            document.querySelector(".menus__card__container").innerHTML = output;
        }

        // mixitup
        let mixerMenus = mixitup(".menus__card__container", {
            selectors: {
                target: ".menus__card"
            },
            animation: {
                duration: 300
            }
        });

        // menu order quantity
        const addToCartBtns = document.querySelectorAll(".menuBtn__container .add__cart");
        const counters = document.querySelectorAll(".quantity__count p");
        const counts = document.querySelectorAll(".cart__banner .count");
        const plusIcons = document.querySelectorAll(".quantity__count .plus");
        const minusIcons = document.querySelectorAll(".quantity__count .minus");
        const banners = document.querySelectorAll(".menus__card .cart__banner");

        addToCartBtns.forEach((button, index) => {
            button.addEventListener("click", () => {

                counts[index].innerText = parseInt(counters[index].innerText);

                counters[index].innerText = 1;
                banners[index].classList.add("active__banner");

                setTimeout(() => {
                    banners[index].classList.remove("active__banner");
                }, 5000);
            });
        });

        plusIcons.forEach((plus, index) => {
            plus.addEventListener("click", () => {
                let currentValue = parseInt(counters[index].innerText);
                if (!isNaN(currentValue) && currentValue < 15) {
                    counters[index].innerText = currentValue + 1;
                }
            });
        });

        minusIcons.forEach((minus, index) => {
            minus.addEventListener("click", () => {
                let currentValue = parseInt(counters[index].innerText);
                if (!isNaN(currentValue) && currentValue > 1) {
                    counters[index].innerText = currentValue - 1;
                }
            });
        });

        // close menu
        const viewBtn = document.querySelectorAll(".menus__card .quick__view"),
            menu_explaination_container = document.querySelectorAll(".menus__card .menus__explaination__container"),
            close_icon = document.querySelectorAll(".menus__explaination i");


        let menu_card = function (menuCLick) {
            menu_explaination_container[menuCLick].classList.add("active__menus");
        }

        viewBtn.forEach((menu, index) => {
            menu.addEventListener("click", () => {
                menu_card(index);
            })
        })

        close_icon.forEach(e => {
            e.addEventListener("click", () => {
                menu_explaination_container.forEach(menu => {
                    menu.classList.remove("active__menus");
                })
            })
        })
    }

    http.send();
}

window.addEventListener("load", getMenuData);