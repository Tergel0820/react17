import React from "react";
import "./style.css";

const AjiltanItem = ({name, count}) => {
    return (
        <div className="ajiltan-item gap-4 mt-4 shadow">
            <div className="ajiltanName">{name}</div>
            <div className="ajiltan-uilchluulegch">{count}</div>
        </div>
    );
};

export default AjiltanItem;
