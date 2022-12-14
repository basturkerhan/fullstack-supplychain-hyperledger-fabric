import { useSelector } from "react-redux"

export const useUserRole = () => {
    const role = useSelector(state => state.user.userRole);
    return role;
}