import {useTheme} from "next-themes";
import {faSun} from "@fortawesome/free-solid-svg-icons/faSun";
import {faMoon} from "@fortawesome/free-solid-svg-icons";
import {useEffect, useState} from "react";
import Icon from "../utils/icon";


const ThemeButton = () => {
    const {theme, setTheme} = useTheme();
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        setLoading(true)
    }, [loading])

    // @ts-ignore
    return (
        <>
            <button className="flex items-center w-9 h-9 me-3 justify-center text-xs font-medium text-gray-700 bg-white border border-gray-200 rounded-lg toggle-dark-state-example hover:bg-gray-100 hover:text-blue-700 dark:focus:ring-gray-500 dark:bg-gray-800 focus:outline-none dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700" onClick={() => {
                setTheme(theme === 'dark' ? 'light' : 'dark');
            }}>
                {
                    loading && theme === 'dark' ? (
                        <Icon name={faSun}/>
                    ) : (
                        <Icon name={faMoon}/>
                    )
                }
            </button>
        </>
    )
}

export default ThemeButton;