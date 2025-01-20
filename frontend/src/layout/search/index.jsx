import React from "react";
import {Icon} from "../../components";

const HeaderSearch = () => {
    return (
        <React.Fragment>
            <Icon name="search"></Icon>
            <input className="form-control border-transparent form-focus-none" type="text" placeholder="Pencarian" />
        </React.Fragment>
    );
};

export default HeaderSearch;
