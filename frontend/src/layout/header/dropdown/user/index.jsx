import React, { useState } from "react";
import { DropdownToggle, DropdownMenu, Dropdown } from "reactstrap";
import { Icon, LinkList, LinkItem, UserAvatar } from "../../../../components/";
import { useTheme, useThemeUpdate } from "../../../provider/Theme";
import {APICore} from "../../../../utils/api/APICore";

const User = () => {
    const api = new APICore();
    const user = api.getLoggedInUser();
    const theme = useTheme();
    const themeUpdate = useThemeUpdate();
    const [open, setOpen] = useState(false);
    const toggle = () => setOpen((prevState) => !prevState);
    const role = (role) => {
        switch (role) {
            case "1":
                return "Administrator";
            case "2":
                return "Kepala Madrasah";
            case "3":
                return "Guru/Karyawan"
            default:
                return '';
        }
    }

    return (
        <Dropdown isOpen={open} className="user-dropdown" toggle={toggle}>
            <DropdownToggle
                tag="a"
                href="#toggle"
                className="dropdown-toggle"
                onClick={(ev) => {
                    ev.preventDefault();
                }}
            >
                <div className="user-toggle">
                    <UserAvatar icon="user-alt" className="sm" />
                    <div className="user-info d-none d-md-block">
                        <div className="user-status">{role(user.role)}</div>
                        <div className="user-name dropdown-indicator">{user.name}</div>
                    </div>
                </div>
            </DropdownToggle>
            <DropdownMenu end className="dropdown-menu-md dropdown-menu-s1">
                <div className="dropdown-inner user-card-wrap bg-lighter d-none d-md-block">
                    <div className="user-card sm">
                        <div className="user-avatar">
                            <span>AB</span>
                        </div>
                        <div className="user-info">
                            <span className="lead-text">{user.name}</span>
                            <span className="sub-text">{user.email}</span>
                        </div>
                    </div>
                </div>
                <div className="dropdown-inner">
                    <LinkList>
                        <LinkItem link="#" icon="setting-alt" onClick={toggle}>
                            Pengaturan Akun
                        </LinkItem>
                    </LinkList>
                </div>
                <div className="dropdown-inner">
                    <LinkList>
                        <a href={`${process.env.PUBLIC_URL}/auth/keluar`}>
                            <Icon name="signout"></Icon>
                            <span>Keluar</span>
                        </a>
                    </LinkList>
                </div>
            </DropdownMenu>
        </Dropdown>
    );
};

export default User;
