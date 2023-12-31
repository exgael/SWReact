import React, {ReactElement} from "react";
import {Text, VStack} from "../../../../../components";
import {View} from "../../../../SWTypes";
import createComponent from "../../../../SWElements/componentFactory";
import {SWView} from "../../../../SWElements/SWElements";
import {CoreModifiers} from "../../../../SWModifiers/core/coreModifers";

// BOTTOM BAR ITEM DEFINITION
type BottomBarItemComponent = View & CoreModifiers<BottomBarItemComponent> & {
    title: string;
    path: string;
    icon: ReactElement;
};

export function BottomBarItem(title: string, path: string, icon: ReactElement): BottomBarItemComponent {
    return createComponent<BottomBarItemComponent>(
        { render: function() { return <SWBottomBarItem view={this as BottomBarItemComponent} />; } },
        { title: title, path: path, icon: icon },
    );
}

export const SWBottomBarItem: React.FC<{ view: BottomBarItemComponent }> = React.memo(
    ({ view }) => {
        const itemLayout = VStack({ alignment: "center" })(
            BottomBarIcon(view.icon),
            Text(view.title)
        )
            .crossAxisAlignment("center")

        return (
            <SWView view={view}>
                {itemLayout.render()}
            </SWView>
        );
    }
);

// BOTTOM BAR ICON DEFINITION

type BottomBarIconComponent = View & {
    icon: ReactElement;
};

export function BottomBarIcon(icon: ReactElement): BottomBarIconComponent {
    return createComponent<BottomBarIconComponent>(
        { render: function() { return <SWBottomBarIcon view={this as BottomBarIconComponent} />; } },
        { icon: icon },
    );
}

const SWBottomBarIcon: React.FC<{ view: BottomBarIconComponent }> = React.memo(
    ({ view }) => {
        return (
            <SWView view={view}>
                {Icon(view.icon).render()}
            </SWView>
        );
    }
);

// React Icon to WSIcon mapping
type IconComponent = View & {
    icon: ReactElement;
}

export function Icon(icon: ReactElement): IconComponent {
    return createComponent<IconComponent>(
        { render: function() { return <SWIcon view={this as IconComponent} />; } },
        { icon: icon },
    );
}

const SWIcon: React.FC<{ view: IconComponent }> = React.memo(
    ({ view }) => {
        return (
            <SWView view={view}>
                {view.icon}
            </SWView>
        );
    }
);
