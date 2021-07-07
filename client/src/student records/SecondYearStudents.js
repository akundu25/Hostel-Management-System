import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Table from "../components/Table/Table.js";
import { fetchSecondYearStudents } from "../actions/admin.js";
import LoadingScreen from "../widgets/Loading screen/LoadingScreen.js";

import "./StudentRecords.css";

const page = 1;
const limit = 2;

const columns = ["name", "roll", "email", "semester", "year", "stream"];

const SecondYearStudents = () => {
  const dispatch = useDispatch();
  const [currentLimit, setCurrentLimit] = useState(limit);
  const secondYearStudents = useSelector(
    (state) => state.admin.secondYearStudents
  );
  const [students, setStudents] = useState(secondYearStudents);

  useEffect(() => {
    secondYearStudents === null &&
      dispatch(fetchSecondYearStudents(page, currentLimit));
    setStudents(secondYearStudents);
  }, [dispatch, secondYearStudents, currentLimit]);

  const handleNextClick = () => {
    if ("next" in students) {
      const nextPage = students.next.page;
      dispatch(fetchSecondYearStudents(nextPage, currentLimit));
    }
  };
  const handlePrevClick = () => {
    if ("prev" in students) {
      const prevPage = students.prev.page;
      dispatch(fetchSecondYearStudents(prevPage, currentLimit));
    }
  };

  const handleLimitChange = (e) => {
    const limitValue = e.target.value;
    limitValue && dispatch(fetchSecondYearStudents(page, limitValue));
    limitValue && setCurrentLimit(limitValue);
  };

  return (
    <div className="students-table-container">
      {students ? (
        <div className="students-table">
          {students.results.length ? (
            <Table columns={columns} content={students?.results} />
          ) : (
            <div className="no-records">No Records!</div>
          )}
          <button
            type="button"
            disabled={
              "prev" in students && students.results.length ? false : true
            }
            onClick={handlePrevClick}
            className={
              "prev" in students && students.results.length
                ? "next-page-btn"
                : "btn-disabled"
            }
          >
            Previous
          </button>
          <button
            type="button"
            disabled={
              "next" in students && students.results.length ? false : true
            }
            onClick={handleNextClick}
            className={
              "next" in students && students.results.length
                ? "prev-page-btn"
                : "btn-disabled"
            }
          >
            Next
          </button>
          <span className="limit-value">
            <label htmlFor="limit">Number of records in each page:</label>
            <input
              id="limit"
              type="number"
              defaultValue={currentLimit}
              name="limit"
              onChange={handleLimitChange}
            />
          </span>
        </div>
      ) : (
        <LoadingScreen />
      )}
      ;
    </div>
  );
};

export default SecondYearStudents;
