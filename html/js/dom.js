const getActive = (dom) => {
    return [...dom].find(d => d.classList.contains('active'))
}

const getSelected = (dom) => {
    return [...dom].find(d => d.selected === true)
}

const createElement = (name, text, className, container, trigger, event, ...args) => {
    const dom = document.createElement(name)
    if (text) dom.textContent = text
    if (className) dom.className = className
    if (container) container.appendChild(dom)

    if (trigger && event && args) {
        dom.addEventListener(trigger, () => {
            event(args)
        })
    }
}

const addEvnetListener = (dom, trigger, event, ...args) => {
    dom.addEventListener(trigger, () => {
        event(args)
    })
}


const elementIsFocused = el => el === document.activeElement

const fullscreen = (mode = true, el = 'body') => {
    mode ? document.querySelector(el).requestFullscreen()
        : document.exitFullscreen()
}

const getScrollbarWidth = () => {
    return window.innerWidth - document.documentElement.clientWidth
}

const detectDeviceType = () =>
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
    )
        ? 'Mobile'
        : 'Desktop'

const isWeekend = (d = new Date()) => d.getDay() % 6 === 0



const serializeCookie = (name, val) => {
    `${encodeURIComponent(name)}=${encodeURIComponent(val)}`
}

serializeCookie('foo', 'bar')

const getSelectedText = () => window.getSelection().toString()

const elementContains = (parent, child) => {
    return parent !== child && parent.contains(child)
}

const insertBefore = (el, htmlString) => {
    el.insertAdjacentHTML('beforebegin', htmlString)
}

const insertAfter = (el, htmlString) =>
    el.insertAdjacentHTML('afterend', htmlString);

const stripHTMLTags = str => str.replace(/<[^>]*>/g, '');

const scrollToTop = () => {
    const c = document.documentElement.scrollTop || document.body.scrollTop;
    if (c > 0) {
        window.requestAnimationFrame(scrollToTop);
        window.scrollTo(0, c - c / 8);
    }
};

const findClosestMatchingNode = (node, selector) => {
    for (let n = node; n.parentNode; n = n.parentNode)
        if (n.matches && n.matches(selector)) return n;
    return null;
};

const setStyle = (el, rule, val) => (el.style[rule] = val)

const getStyle = (el, ruleName) => getComputedStyle(el)[ruleName]

const toggleClass = (element, className) => element.classList.toggle(className)

const removeClass = (element, className) => element.classList.remove(className)

const customSelector = (element) => {
    return document.querySelector.bind(document)
}

//const $ = document.querySelector.bind(document)
// $('.main-content')

const injectCSS = css => {
    const element = document.createElement('style')
    element.type = 'text/css'
    element.innerText = css
    document.head.appendChild(element)
    return element
}

const debounce = (fn, ms = 0) => {
    let timeoutId
    return function (...args) {
        clearTimeout(timeoutId)
        timeoutId = setTimeout(() => fn.apply(this, args), ms)
    }
}

const httpsRedirect = () => {
    if (location.protocol !== 'https:')
        location.replace('https://' + location.href.split('//')[1])
}

const getBaseURL = url => url.replace(/[?#].*$/, '');

const once = fn => {
    let called = false
    return function (...args) {
        if (called) return
        called = true
        console.log(this, 'test')
        return fn.apply(this, args)
    }
}


const addStyles = (element, styles) => Object.assign(element.style, styles)

const urlString = 'https://mysite.com?p=42&from=home#details';
const url = new URL(urlString);

// Delete a parameter
const removedParam = 'from';
url.searchParams.delete(removedParam);

// Edit/add parameters
const newParams = {
    p: 57,
    track: 'none'
};
Object.keys(newParams).forEach(key => {
    url.searchParams.set(key, newParams[key]);
});

const getAncestors = el => {
    const ancestors = []
    while(el) {
        ancestors.unshift(el)
        el = el.parentNode
    }
    return ancestors
}

const createElements = (el, parent, prepend = false) => {
    const { nodeName = 'div', ...attrs } = el;
    const element = document.createElement(nodeName);
    Object.entries(attrs).forEach(([attr, value]) => {
        element[attr] = value;
    });
    if (prepend) parent.prepend(element);
    else parent.append(element);
};

const getParentsUntil = (el, selector) => {
    let parents = [],
        _el = el.parentNode;
    while (_el && typeof _el.matches === 'function') {
        parents.unshift(_el);
        if (_el.matches(selector)) return parents;
        else _el = _el.parentNode;
    }
    return [];
};

const removeAttributes = element =>
    Object.values(element.attributes).forEach(({name}) => {
        element.removeAttribute(name)
    })

const unescapeHTML = str =>
    str.replace(
        /&amp;|&lt;|&gt;|&#39;|&quot;/g,
        tag =>
            ({
                '&amp;': '&',
                '&lt;': '<',
                '&gt;': '>',
                '&#39;': "'",
                '&quot;': '"'
            }[tag] || tag)
    );

const formToObject = form =>
    Array.from(new FormData(form)).reduce(
        (acc, [key, value]) => ({
            ...acc,
            [key]: value
        }),
        {}
    )

// formToObject(document.querySelector('#form'));
// { email: 'test@email.com', name: 'Test Name' }

const debouncePromise = (fn, ms = 0) => {
    let timeoutId;
    const pending = [];
    return (...args) =>
        new Promise((res, rej) => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                const currentPending = [...pending];
                pending.length = 0;
                Promise.resolve(fn.apply(this, args)).then(
                    data => {
                        currentPending.forEach(({ resolve }) => resolve(data));
                    },
                    error => {
                        currentPending.forEach(({ reject }) => reject(error));
                    }
                );
            }, ms);
            pending.push({ resolve: res, reject: rej });
        });
};

const observeMutations = (element, callback, options) => {
    const observer = new MutationObserver(mutations =>
        mutations.forEach(m => callback(m))
    );
    observer.observe(
        element,
        Object.assign(
            {
                childList: true,
                attributes: true,
                attributeOldValue: true,
                characterData: true,
                characterDataOldValue: true,
                subtree: true,
            },
            options
        )
    );
    return observer;
};

const obs = observeMutations(document, console.log)
obs.disconnect()

const copyToClipboard = str => {
    const el = document.createElement('textarea');
    el.value = str;
    el.setAttribute('readonly', '');
    el.style.position = 'absolute';
    el.style.left = '-9999px';
    document.body.appendChild(el);
    const selected =
        document.getSelection().rangeCount > 0
            ? document.getSelection().getRangeAt(0)
            : false;
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    if (selected) {
        document.getSelection().removeAllRanges();
        document.getSelection().addRange(selected);
    }
};

const triggerEvent = (el, eventType, detail) =>
    el.dispatchEvent(new CustomEvent(eventType, { detail }));

const parseCookie = str =>
    str
        .split(';')
        .map(v => v.split('='))
        .reduce((acc, v) => {
            acc[decodeURIComponent(v[0].trim())] = decodeURIComponent(v[1].trim());
            return acc;
        }, {});

// parseCookie('foo=bar; equation=E%3Dmc%5E2');
// { foo: 'bar', equation: 'E=mc^2' }

const getSiblings = element =>
    [...element.parentNode.childNodes].filter(node => node !== element)


const getURLParameters = url =>
    (url.match(/([^?=&]+)(=([^&]*))/g) || []).reduce(
        (a, v) => (
            (a[v.slice(0, v.indexOf('='))] = v.slice(v.indexOf('=') + 1)), a
        ),
        {}
    );



window.onload = () => {
    // const nextURL = 'http://localhost:63342/next/html/js/test.html?_ijt=ft74mj4thjc70u987qjgvpe8rf&_ij_reload=RELOAD_ON_SAVE'
    // const nextTitle = 'My new page title';
    // const nextState = { additionalInformation: 'Updated the URL with JS' };
    //
    // window.history.pushState(nextState, nextTitle, nextURL);
    //
    // window.history.replaceState(nextState, nextTitle, nextURL);
}

