import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {IconDefinition} from "@fortawesome/fontawesome-common-types";
import {IconProp} from "@fortawesome/fontawesome-svg-core";

type Props = {
    name: IconDefinition
}

const Icon = ({name}: Props) => {
    return (
        <FontAwesomeIcon icon={name}/>
    )
}

export default Icon