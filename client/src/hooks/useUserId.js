import { useSelector } from "react-redux"

export const useUserId = () => {
    const id = useSelector(state => state.user.userId);
    return id;
}