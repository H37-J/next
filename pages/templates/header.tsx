import ThemeButton from "../theme/ThemeButton";
import {getTargetElement} from "../utils/utils";

const Header = () => {
    const drawarSidebar = (_this : any) => {
        const element = getTargetElement(_this, 'data-drawer-target')
        element.classList.toggle('-translate-x-full')
    }

    const toggleDropDown = (_this : any) => {
        const element = getTargetElement(_this, 'data-dropdown-target')
        element.classList.toggle('hidden')
    }

    return (
        <>
            <nav id="header"
                 className="fixed top-0 z-50 w-full border-b border-gray-200 dark:border-stone-900">
                <div className="px-3 py-3 lg:px-5 lg:pl-3">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center justify-start rtl:justify-end">
                            <button onClick={drawarSidebar} data-drawer-target="sidebar"
                                    data-drawer-toggle="sidebar"
                                    aria-controls="sidebar"
                                    type="button"
                                    className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
                                <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path clipRule="evenodd" fillRule="evenodd"
                                          d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                                </svg>
                            </button>
                            <a href="#" className="flex ms-2 md:me-24">
                                <span
                                    className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">H</span>
                            </a>
                        </div>
                        <div className="flex items-center relative">
                            <div className="me-4">
                                <label htmlFor="default-search"
                                       className="mb-2 text-sm font-medium text-black sr-only dark:text-white">Search</label>
                                <div className="relative">
                                    <div
                                        className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                        <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true"
                                             xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                            <path stroke="currentColor"
                                                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                                        </svg>
                                    </div>
                                    <input type="text" id="default-search"
                                           className="outline-none w-80 h-10 block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 dark:bg-neutral-900 dark:border-stone-900 dark:placeholder-white dark:text-white"
                                           placeholder="검색어를 입력 해주세요" required/>

                                </div>
                            </div>
                            <div className="flex">
                                <ThemeButton></ThemeButton>
                                <button onClick={toggleDropDown} type="button"
                                        className="flex text-sm bg-gray-800 rounded-full"
                                        aria-expanded="false" data-dropdown-target="dropdown-user">
                                    <img className="w-8 h-8 rounded-full"
                                         src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                                         alt="user photo"/>
                                </button>
                            </div>
                            <div
                                className="z-50 hidden absolute top-8 right-0 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded dark:bg-gray-700 dark:divide-gray-600"
                                id="dropdown-user">
                                <div className="px-4 py-3" role="none">
                                    <p className="text-sm text-gray-900 dark:text-white mb-1" role="none">
                                        호종규
                                    </p>
                                    <p className="text-sm font-medium text-gray-900 truncate dark:text-gray-300"
                                       role="none">
                                        these990712@gmail.com
                                    </p>
                                </div>
                                <ul className="py-1" role="none">
                                    <li>
                                        <a href="#"
                                           className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                                           role="menuitem">내 정보</a>
                                    </li>
                                    <li>
                                        <a href="#"
                                           className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                                           role="menuitem">로그아웃</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    );
}

export default Header