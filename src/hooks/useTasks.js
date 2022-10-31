import { useState, useEffect } from "react";
import axios from "../axios";
import { toast } from "react-toastify";

const useTasks = (page, limit, start, end, id, today, thisWeek, checkData) => {
    const [employeeTaksData, setEmployeeTaksData] = useState([]);
    const [errorMessage, setErrorMessage] = useState(null);
    const [pagination, setPagination] = useState(0);
    useEffect(() => {
        try {
            axios
            .get(
                `employees/${id}/tasks?page=${page}&limit=${limit}&start=${start}&end=${end}&sort=date`
            )
            .then((result) => {
                setEmployeeTaksData(result.data.data);
                setPagination(result.data.pagination);
            })
            .catch((err) => setErrorMessage(err.response));
        } catch (error) {
            toast.error(`Алдаа: ${error}`);
        }
    }, [id, page, limit, start, end, today, thisWeek, checkData]);

    return [employeeTaksData, errorMessage, pagination];
};

export default useTasks;
