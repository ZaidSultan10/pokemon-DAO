import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useCustomQuery = (url : string, queryKey : string, isEnabled : boolean = true) => {
    return useQuery({
        queryKey : [queryKey], 
        queryFn : async () => {
            const response = await axios.get(`${url}`);
            return response.data;
        },
        enabled:isEnabled
    });
};