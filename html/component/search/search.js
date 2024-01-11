let search
let container
let search_select
let selected_option
let keyword
let body
let pagination
let currentPage = 0
let code

const searchApi = async (search) => {
    let data
    const url = new URL('http://localhost:8085/sso/api/find/code?size=10');
    url.searchParams.set('page', currentPage)
    if (keyword !== undefined) {
        url.searchParams.set(selected_option, keyword);
    }
    const res = await axios.get(url)

    try {
        data = {
            status: 200,
            body: res.data
        }
    } catch (e) {
        data = {
            status: 500,
            body: e
        }
    }
    return data
}

const render = async () => {
    const res = await searchApi()
    const data = res.body
    const currentPage = data.currentPage
    const startPage = data.startPage
    const endPage = data.endPage
    const from = data.from
    const to = data.to
    const pageSize = data.pageSize
    const totalElement = data.totalElement
    const datas = data.data;


    tbody.innerHTML = ''
    pagination.innerHTML = ''

    datas.map(data => {
        const tr = document.createElement('tr')
        tr.className = 'code border-b'
        Object.entries(data).map(([key, value]) => {
            if(key === 'centerCd') {
                addEventListener(tr, 'click', selectCode, value)
            }
            createElement('td', value, tr, 'whitespace-nowrap px-6 py-4')

        })
        tbody.appendChild(tr)
    })


    if (from > 10) {
        createElement('span', '<<', pagination, 'prev', 'click', selectPage, from - 10)
    }

    for (let i = from; i <= to; i++) {
        createElement('span', i, pagination, 'page')
    }

    if (to !== endPage) {
        createElement('span', '>>', pagination, 'next', 'click', selectPage, from + 10)
    }

    pageEventInit()
}

const createElement = (name, text, container, className, trigger, event, arg) => {
    const dom = document.createElement(name)
    dom.textContent = text
    if(className !== undefined) {
        dom.className = className
    }
    if (trigger !== undefined) {
        dom.addEventListener(trigger, () => {
            event(arg)
        })
    }

    if(container !== undefined) {
        container.appendChild(dom)
    }
}

const selectCode = (selectedCode) => {
    code.value = selectedCode
    modal.style.display = 'none'
}

const selectPage = async (selectedPage) => {
    currentPage = selectedPage - 1
    await render()
}

const selectRender = () => {
    currentPage = 0;
    [...search_select].map(option => {
        if (option.selected === true) {
            selected_option = option.value
        }
    });
}

const addEventListener = (dom, trigger, event, arg) => {
    dom.addEventListener(trigger, () => {
        event(arg)
    })
}

const pageEventInit = () => {
    const pages = document.querySelectorAll('.page');
    [...pages].map((page, index) => {
        if (parseInt(page.textContent) === currentPage + 1) {
            page.classList.add('active')
        }
        page.addEventListener('click', async (_this) => {
            await selectPage(_this.target.textContent)
        })
    })
}

const modalInit = () => {
    const modal = document.querySelector('#modal')
    const modalOpenButton = document.querySelector('#modal_open_button')
    const modalCloseButton = document.querySelector('#modal_close_button')

    modalOpenButton.addEventListener('click', () => {
        modal.style.display = 'flex'
    })

    modalCloseButton.addEventListener('click', () => {
        modal.style.display = 'none'
    })
}


const init = async () => {
    selectRender()
    await render()
}

window.onload = async () => {
    code = document.querySelector('#code')
    search = document.querySelector('#search')
    container = document.querySelector('#container')
    search_select = document.querySelector('#search_select');
    tbody = document.querySelector('#tbody');
    pagination = document.querySelector('#pagination');

    await init()
    modalInit()


    search_select.addEventListener('change', async (_this) => {
        selectRender()
        await render()
    })

    search.addEventListener('keyup', async (_this) => {
        currentPage = 0
        const target = _this.target
        keyword = target.value
        await render()
    });


    pageEventInit()
}