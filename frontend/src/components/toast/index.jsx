import {toast} from "react-toastify";

const RToast = (message = '', type = '') => {
    const params = {
        position: "top-right",
        autoClose: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        hideProgressBar: true,

    }
    switch (type) {
        case "success":
            toast.success(message, params);
            break;
        case "warning":
            toast.warning(message, params);
            break;
        case "error":
            toast.error(message, params);
            break;
        case "info":
            toast.info(message, params);
            break;
        default:
            break;
    }
}

export default RToast;