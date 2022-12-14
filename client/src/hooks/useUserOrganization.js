import { useSelector } from "react-redux"

export const useUserOrganization = () => {
    const org = useSelector(state => state.user.userOrganization);
    return org;
}