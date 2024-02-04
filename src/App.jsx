import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [employees, setEmployees] = useState([]);
  // lets do pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [pages, setPages] = useState(1);

  useEffect(() => {
    axios
      .get(
        "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
      )
      .then((res) => {
        return res.data;
      })
      .then((data) => {
        console.log(data);
        setEmployees(data);
      })
      .catch(() => alert("failed to fetch data"));
  }, []);

  useEffect(() => {
    const recordsPerPage = 10;
    const lastIndex = currentPage * recordsPerPage;
    const firstIndex = lastIndex - recordsPerPage;

    const records = employees.slice(firstIndex, lastIndex);
    const nPages = Math.ceil(employees.length / recordsPerPage);
    setFilteredEmployees(records);
    setPages(nPages);
  }, [employees, currentPage]);

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage((page) => --page);
    }
  };

  const handleNext = () => {
    if (currentPage < pages) {
      setCurrentPage((page) => ++page);
    }
  };

  return (
    <div className="App">
      <h1>Employee Data Table</h1>
      <table id="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {filteredEmployees.map((employee) => {
            return (
              <tr key={employee.id}>
                <td>{employee.id}</td>
                <td>{employee.name}</td>
                <td>{employee.email}</td>
                <td>{employee.role}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="navigation">
        <button className="navigation-btn" onClick={handlePrevious}>
          Previous
        </button>
        <div className="navigation-btn">{currentPage}</div>
        <button className="navigation-btn" onClick={handleNext}>
          Next
        </button>
      </div>
    </div>
  );
}

export default App;
