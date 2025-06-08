class Pagination {
    #pagination = document.querySelector(".pagination");

    init() {
        this.#addListener();
    }

    #addListener() {
        this.#pagination.addEventListener("click", (event) => {
            const target = event.target;
            if (target.closest(".page-item")) {
                this.#handlerPage(target.closest(".page-item"));
            }
        });
    }

    #handlerPage(item) {
        const page = item.dataset.page;
        window.location.href = `${page}`;
    }
}

const pagination = new Pagination();
pagination.init();
