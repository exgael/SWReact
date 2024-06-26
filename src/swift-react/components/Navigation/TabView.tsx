import {View} from "../../SWCore";
import createComponent from "../../SWCore/SWElements/componentFactory";
import React from "react";
import {SWTabView, TabItemComponent, TabViewComponent} from "../../SWCore/SWTemplates/SWTabView/SWTabView";
import {tabItemModifiers} from "../../SWCore/SWModifiers/tabViewModifier/tabItemModifiers";
import {TabViewProvider} from "../../SWCore/SWTemplates/SWTabView/SWTabViewProvider";
import {NavigationStackProvider} from "../../SWCore/SWProvider/NavigationStack/NavigationStackContext";

export function TabView(...tabItems: TabItemComponent[]): TabViewComponent {
    return createComponent<TabViewComponent>(
        {
            toJSX: function () {
                return (
                    <TabViewProvider>
                        <NavigationStackProvider>
                            <SWTabView view={this as TabViewComponent}/>
                        </NavigationStackProvider>
                    </TabViewProvider>
                )
            }
        },
        {tabItems},
    )
}

export function TabItem(view: View): TabItemComponent {
    return createComponent<TabItemComponent>(
        {
            toJSX: function () {
                return (<span> </span>);
            }
        },
        {view},
        tabItemModifiers
    )
}