import React, {useEffect, useState} from "react";
import { DropdownToggle, DropdownMenu, UncontrolledDropdown } from "reactstrap";

import {Icon} from "../../../../components";
import {get as getNotification, update as updateNotification} from "../../../../utils/api/notification"
import {APICore} from "../../../../utils/api/APICore";
import moment from "moment";

const NotificationItem = (props) => {
    const { status, type, text, time, id } = props;
    return (
        <div className="nk-notification-item" key={id} id={id}>
            <div className="nk-notification-icon">
                <Icon
                    name={type === '1' ? 'calendar-alt' : 'file-doc'}
                    className={`icon-circle bg-${status === '1' ? 'success' : 'danger'}-dim`} />
            </div>
            <div className="nk-notification-content">
                <div className="nk-notification-text">{text}</div>
                <div className="nk-notification-time">{moment(time).fromNow()}</div>
            </div>
        </div>
    );
};

const Notification = () => {
    const api = new APICore();
    const user  = api.getLoggedInUser();
    const [notifications, setNotifications] = useState([]);
    const onSubmit = async (params) => {
        params.read = '1';
        await updateNotification(params);
    }
    useEffect(() => {
        getNotification({toUser: user.id, read: '2'}).then(resp => {
            setNotifications(resp.data.result)
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <UncontrolledDropdown className="user-dropdown">
            <DropdownToggle tag="a" className="dropdown-toggle nk-quick-nav-icon">
                <div className="icon-status icon-status-info">
                    <Icon name="bell" />
                </div>
            </DropdownToggle>
            <DropdownMenu end className="dropdown-menu-xl dropdown-menu-s1">
                <div className="dropdown-head">
                    <span className="sub-title nk-dropdown-title">Notifikasi</span>
                    <a href="#markasread" onClick={(ev) => {
                        ev.preventDefault()
                        notifications.map(item => {
                            return onSubmit(item).then((resp) => console.log(resp)).catch(err => console.log(err));
                        })
                    }}>
                        Tandai dibaca semua
                    </a>
                </div>
                <div className="dropdown-body">
                    <div className="nk-notification">
                        {notifications.map((item) => {
                            return (
                                <NotificationItem
                                    key={item.id}
                                    id={item.id}
                                    status={item.status}
                                    type={item.type}
                                    text={item.message}
                                    time={item.updatedAt}
                                />
                            );
                        })}
                    </div>
                </div>
            </DropdownMenu>
        </UncontrolledDropdown>
    );
};

export default Notification;
