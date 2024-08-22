import {getTargetElement} from "../utils/utils";

const Sidebar = () => {
    const toggleSidebarDropdown = (_this : any) => {
        const element = getTargetElement(_this, 'data-dropdown-target')
        _this.currentTarget.querySelector('svg').classList.toggle('rotate-90')
        element.classList.toggle('hidden')
    }

    return (
        <>
            <aside id="sidebar"
                   className="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full border-r border-gray-200 dark:border-stone-900 sm:translate-x-0"
                   aria-label="sidebar">
                <div className="h-full px-3 pb-4 overflow-y-auto">
                    <ul className="space-y-2 font-medium">
                        <li className="relative">
                            <a onClick={toggleSidebarDropdown} data-dropdown-target="webDropdown" href="#"
                               className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-neutral-800 group">
                                <svg className="transition-all duration-300 w-2.5 h-2.5 ms-3" aria-hidden="true"
                                     xmlns="http://www.w3.org/2000/svg" fill="none"
                                     viewBox="0 0 6 10">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                          strokeWidth="2"
                                          d="m1 9 4-4-4-4"/>
                                </svg>
                                <span className="ms-3">Web</span>
                            </a>
                            <div id="webDropdown"
                                 className="hidden mt-1 ms-3 ps-3 divide-y divide-gray-100 rounded-lg w-44 flex flex-col">
                                <ul className="py-2 text-sm text-gray-700 dark:text-gray-200 border-s border-neutral-800"
                                    aria-labelledby="doubleDropdownButton">
                                    <li>
                                        <a href="#"
                                           className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-neutral-800 dark:hover:text-white">APi
                                            테스트</a>
                                    </li>
                                    <li>
                                        <a href="#"
                                           className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-neutral-800 dark:hover:text-white">크롤링</a>
                                    </li>
                                    <li>
                                        <a href="#"
                                           className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-neutral-800 dark:hover:text-white">이미지</a>
                                    </li>
                                </ul>
                            </div>
                        </li>
                        <li className="relative">
                            <a onClick={toggleSidebarDropdown} data-dropdown-target="algoDropdown" href="#"
                               className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-neutral-800 group">
                                <svg className="transition-all duration-300 w-2.5 h-2.5 ms-3" aria-hidden="true"
                                     xmlns="http://www.w3.org/2000/svg" fill="none"
                                     viewBox="0 0 6 10">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                          strokeWidth="2"
                                          d="m1 9 4-4-4-4"/>
                                </svg>
                                <span className="ms-3">Algorithms</span>
                            </a>
                            <div id="algoDropdown"
                                 className="hidden mt-1 ms-3 ps-3 divide-y divide-gray-100 rounded-lg w-44 flex flex-col">
                                <ul className="py-2 text-sm text-gray-700 dark:text-gray-200 border-s border-neutral-800"
                                    aria-labelledby="doubleDropdownButton">
                                    <li>
                                        <a href="#"
                                           className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-neutral-800 dark:hover:text-white">Java</a>
                                    </li>
                                    <li>
                                        <a href="#"
                                           className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-neutral-800 dark:hover:text-white">JavaScript</a>
                                    </li>
                                </ul>
                            </div>
                        </li>
                    </ul>
                </div>
            </aside>
        </>
    )
}

export default Sidebar