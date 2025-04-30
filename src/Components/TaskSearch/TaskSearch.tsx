import React, { useEffect, useState } from "react";
import "./TaskSearch.css";
import { useAppDispatch } from "../../store/hooks";
import { setSearchQuery } from "../../store/task/taskSlice";

export const TaskSearch = () => {
  const [searchTask, setSearchTask] = useState("");
  const [debouncedSearchItem, setDebouncedSearchItem] = useState(searchTask);
  const dispatch = useAppDispatch();
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchItem(searchTask);
    }, 500);
    return () => {
      clearTimeout(handler);
    };
  }, [searchTask]);

  useEffect(() => {
    dispatch(setSearchQuery(debouncedSearchItem));
  }, [debouncedSearchItem, dispatch]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTask(e.target.value);
  };

  console.log(debouncedSearchItem, searchTask);
  return (
    <div className="task-search">
      <input
        type="text"
        placeholder="Search a task..."
        value={searchTask}
        onChange={handleSearch}
      />
    </div>
  );
};
