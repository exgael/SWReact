import React, {ReactNode} from 'react';
import {Body, Destination, NavigationContainer} from "./Navigation";
import {useResponsive} from "./useResponsive";
import PhoneContent from "./Layout/PhoneContent";
import TabletContent from "./Layout/TabletContent";
import DesktopContent from "./Layout/DesktopContent";
import userBarStore from "../SWElements/SWBars/UserFlowBar/UserBarStore";
import {InstallNotification} from "../../components/install_notif";
import {useObserver} from "mobx-react";
import {sheet} from "../SWElements/SWModals/Sheet/SheetStore";
import {alert} from "../SWElements/SWModals/Alert/AlertStore";
import {Sheet} from "../../components/modals/Sheet";
import {Alert} from "../../components/modals/Alert";
import {useFullscreenCover} from "./Modals/FullscreenCoverContext";
import {SWFullScreenCover} from "../SWElements/SWModals/FullscreenCover/SWFullscreenCover";

interface ContentProps {
    destinations: Destination[];
}

/**
 * React-SW Bridge
 * @param children
 * @param destinations
 * @constructor
 */

export const Content: React.FC<ContentProps> = ({ destinations }) => {
    const { width, orientation } = useResponsive();

    let contentComponent: ReactNode;
    userBarStore.setDestinations(destinations);
    const children = <Body destinations={destinations} />;

    // Modals

    const { isPresented } = useFullscreenCover();
    const { isAlertPresented } = useAlert();

    // Define breakpoints and render components accordingly
    if (width < 576) {
        contentComponent = <PhoneContent orientation={orientation}>{children}</PhoneContent>;
    } else if (width >= 576 && width < 992) {
        contentComponent = <TabletContent orientation={orientation}>{children}</TabletContent>;
    } else {
        contentComponent = <DesktopContent>{children}</DesktopContent>;
    }

    return (
        <NavigationContainer> { /* Navigation Provider */}
                {contentComponent} { /* Screen Content */}
                <InstallNotification/> { /* Install Notification */}
                {/* React component that uses the MobX state */}

                { isPresented && <SWFullScreenCover/> }
                { isAlertPresented && <Alert/> }
        </NavigationContainer>
    );
};

export const useSheet = () => {
    return useObserver(() => ({
        isSheetPresented: sheet.isPresented,
        sheetContent: sheet.view,
        showSheet: sheet.show,
        hideSheet: sheet.hide,
    }));
};

export const useAlert = () => {
    return useObserver(() => ({
        isAlertPresented: alert.isPresented,
        alertTitle: alert.title,
        alertMessage: alert.message,
        showAlert: alert.show,
        hideAlert: alert.hide,
    }));
};

