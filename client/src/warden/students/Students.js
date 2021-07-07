import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Table from "../../components/Table/Table.js";
import { fetchStudents } from "../../actions/warden.js";
import LoadingScreen from "../../widgets/Loading screen/LoadingScreen.js";

const page = 1;
const limit = 2;

const columns = ["name", "roll", "email", "semester", "room_number", "stream"];

const Students = () => {
  const dispatch = useDispatch();
  const [currentLimit, setCurrentLimit] = useState(limit);
  const wardenStudents = useSelector((state) => state.warden.students);
  const [students, setStudents] = useState(wardenStudents);

  useEffect(() => {
    wardenStudents === null && dispatch(fetchStudents(page, currentLimit));
    setStudents(wardenStudents);
  }, [dispatch, wardenStudents, currentLimit]);

  const handleNextClick = () => {
    if ("next" in students) {
      const nextPage = students.next.page;
      dispatch(fetchStudents(nextPage, currentLimit));
    }
  };
  const handlePrevClick = () => {
    if ("prev" in students) {
      const prevPage = students.prev.page;
      dispatch(fetchStudents(prevPage, currentLimit));
    }
  };

  const handleLimitChange = (e) => {
    const limitValue = e.target.value;
    limitValue && dispatch(fetchStudents(page, limitValue));
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

export default Students;
