import createComponent from "../../SWCore/SWElements/componentFactory";
import {ButtonComponent} from "../../SWCore/SWTypes/Components";
import {SWChevronBack} from "../../SWCore/SWElements/SWNavigation/SWNavElement";

export function ChevronBack(action: () => void): ButtonComponent {
    return createComponent<ButtonComponent>({
        toJSX: function () {
            return <SWChevronBack view={this as ButtonComponent}/>;
        }
    }, {action},)
}



