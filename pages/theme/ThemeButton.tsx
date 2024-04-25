import {useTheme} from "next-themes";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSun} from "@fortawesome/free-solid-svg-icons/faSun";
import {faMoon} from "@fortawesome/free-solid-svg-icons";

const ThemeButton = () => {
    const {theme, setTheme} = useTheme();
    return (
        <>
            <button onClick={() => {
                setTheme(theme === 'dark' ? 'light' : 'dark');
            }}>
                {
                    theme === 'dark' ? (
                        <FontAwesomeIcon icon={faSun}/>
                    ) : (
                        <FontAwesomeIcon icon={faMoon}/>
                    )
                }
            </button>
        </>
    )
}

export default ThemeButton;