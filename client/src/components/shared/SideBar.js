var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import React from 'react';
import { Avatar, Box, Drawer, DrawerContent, Flex, HStack, Icon, IconButton, Link, Menu, MenuButton, MenuDivider, MenuItem, MenuList, Text, useColorModeValue, useDisclosure, VStack } from '@chakra-ui/react';
import { FiBell, FiChevronDown, FiMenu, FiUsers } from 'react-icons/fi';
import { useAuth } from "../context/AuthContext";
var LinkItems = [
    // {name: 'Home', route: '/dashboard', icon: FiHome},
    { name: 'Specks', route: '/dashboard/specks', icon: FiUsers },
    // {name: 'Settings', route: '/dashboard/settings', icon: FiSettings},
];
// @ts-ignore
export default function SidebarWithHeader(_a) {
    var children = _a.children;
    var _b = useDisclosure(), isOpen = _b.isOpen, onOpen = _b.onOpen, onClose = _b.onClose;
    return (React.createElement(Box, { minH: "100vh", bg: useColorModeValue('gray.100', 'gray.900') },
        React.createElement(SidebarContent, { onClose: function () { return onClose; }, display: { base: 'none', md: 'block' } }),
        React.createElement(Drawer, { autoFocus: false, isOpen: isOpen, placement: "left", onClose: onClose, returnFocusOnClose: false, onOverlayClick: onClose, size: "full" },
            React.createElement(DrawerContent, null,
                React.createElement(SidebarContent, { onClose: onClose }))),
        React.createElement(MobileNav, { onOpen: onOpen }),
        React.createElement(Box, { ml: { base: 0, md: 60 }, p: "4" }, children)));
}
// @ts-ignore
var SidebarContent = function (_a) {
    var onClose = _a.onClose, rest = __rest(_a, ["onClose"]);
    return (React.createElement(Box, __assign({ transition: "3s ease", bg: useColorModeValue('white', 'gray.900'), borderRight: "1px", borderRightColor: useColorModeValue('gray.200', 'gray.700'), w: { base: 'full', md: 60 }, pos: "fixed", h: "full" }, rest),
        React.createElement(Flex, { h: "0", flexDirection: "column", alignItems: "center", mx: "8", mb: 75, mt: 2, justifyContent: "space-between" }),
        LinkItems.map(function (link) { return (React.createElement(NavItem, { key: link.name, route: link.route, icon: link.icon }, link.name)); })));
};
// @ts-ignore
var NavItem = function (_a) {
    var icon = _a.icon, route = _a.route, children = _a.children, rest = __rest(_a, ["icon", "route", "children"]);
    return (React.createElement(Link, { href: route, style: { textDecoration: 'none' }, _focus: { boxShadow: 'none' } },
        React.createElement(Flex, __assign({ align: "center", p: "4", mx: "4", borderRadius: "lg", role: "group", cursor: "pointer", _hover: {
                bg: 'blue.400',
                color: 'white',
            } }, rest),
            icon && (React.createElement(Icon, { mr: "4", fontSize: "16", _groupHover: {
                    color: 'white',
                }, as: icon })),
            children)));
};
// @ts-ignore
var MobileNav = function (_a) {
    var onOpen = _a.onOpen, rest = __rest(_a, ["onOpen"]);
    var _b = useAuth(), logOut = _b.logOut, user = _b.user;
    return (React.createElement(Flex, __assign({ ml: { base: 0, md: 60 }, px: { base: 4, md: 4 }, height: "20", alignItems: "center", bg: useColorModeValue('white', 'gray.900'), borderBottomWidth: "1px", borderBottomColor: useColorModeValue('gray.200', 'gray.700'), justifyContent: { base: 'space-between', md: 'flex-end' } }, rest),
        React.createElement(IconButton, { display: { base: 'flex', md: 'none' }, onClick: onOpen, variant: "outline", "aria-label": "open menu", icon: React.createElement(FiMenu, null) }),
        React.createElement(Text, { display: { base: 'flex', md: 'none' }, fontSize: "2xl", fontFamily: "monospace", fontWeight: "bold" }, "Logo"),
        React.createElement(HStack, { spacing: { base: '0', md: '6' } },
            React.createElement(IconButton, { size: "lg", variant: "ghost", "aria-label": "open menu", icon: React.createElement(FiBell, null) }),
            React.createElement(Flex, { alignItems: 'center' },
                React.createElement(Menu, null,
                    React.createElement(MenuButton, { py: 2, transition: "all 0.3s", _focus: { boxShadow: 'none' } },
                        React.createElement(HStack, null,
                            React.createElement(Avatar, { size: 'sm', src: 'https://images.unsplash.com/photo-1619946794135-5bc917a27793?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9' }),
                            React.createElement(VStack, { display: { base: 'none', md: 'flex' }, alignItems: "flex-start", spacing: "1px", ml: "2" },
                                React.createElement(Text, { fontSize: "sm" }, user === null || user === void 0 ? void 0 : user.email),
                                "))"),
                            React.createElement(Box, { display: { base: 'none', md: 'flex' } },
                                React.createElement(FiChevronDown, null)))),
                    React.createElement(MenuList, { bg: useColorModeValue('white', 'gray.900'), borderColor: useColorModeValue('gray.200', 'gray.700') },
                        React.createElement(MenuItem, null, "Profile"),
                        React.createElement(MenuDivider, null),
                        React.createElement(MenuItem, { onClick: logOut }, "Sign out")))))));
};
