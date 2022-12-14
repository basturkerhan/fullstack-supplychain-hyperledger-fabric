import { useSelector } from "react-redux"

export const useIsMobileDevice= () => {
    const response = useSelector(state => state.device.isMobileDevice);
    return response;
}