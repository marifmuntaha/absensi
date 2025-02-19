import React, {useEffect, useState} from "react";
import { DropdownToggle, DropdownMenu, UncontrolledDropdown } from "reactstrap";

import {Icon} from "../../../../components";
import {get as getNotification, update as updateNotification} from "../../../../utils/api/notification"
import {APICore} from "../../../../utils/api/APICore";
import moment from "moment";
import {Transmit} from "@adonisjs/transmit-client";

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
    const [loadData, setLoadData] = useState(true)
    const onSubmit = (params) => {
        params.read = '1';
        updateNotification(params).then(() => setLoadData(true));
    }
    const transporter = async () => {
        const transmit = new Transmit({
            baseUrl: process.env.REACT_APP_API_ENDPOINT,

        })
        const subscription = transmit.subscription(`notification/${user.id}`)
        await subscription.create()
        subscription.onMessage((response) => {
            setNotifications([response.message, ...notifications])
        })
    }
    useEffect(() => {
        transporter().then()
        loadData && getNotification({toUser: user.id, read: '2'}).then(resp => {
            setNotifications(resp.data.result)
        }).then(() => setLoadData(false))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loadData]);

    return (
        <UncontrolledDropdown className="user-dropdown">
            <DropdownToggle tag="a" className="dropdown-toggle nk-quick-nav-icon">
                {notifications.length > 0 ? (
                    <div className="icon-status icon-status-info">
                        <Icon name="bell" />
                    </div>
                ) : (
                    <Icon name="bell" />
                )}
            </DropdownToggle>
            <DropdownMenu end className="dropdown-menu-xl dropdown-menu-s1">
                <div className="dropdown-head">
                    <span className="sub-title nk-dropdown-title">Notifikasi</span>
                    <a href="#markasread" onClick={(ev) => {
                        ev.preventDefault()
                        notifications.map(item => {
                            return onSubmit(item);
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
