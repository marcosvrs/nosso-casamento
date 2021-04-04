import React, { createRef } from "react";
import { NavigationContainerRef } from "@react-navigation/core";

export const navigationRef = createRef<NavigationContainerRef>();

export function currentNavigate(name: string, params?: any) {
    navigationRef.current?.navigate(name, params);
}