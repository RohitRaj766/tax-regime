import React, { useState } from 'react';
import ReactPaginate from 'react-paginate';
import './main.scss'; 

const dummyData = Array.from({ length: 50 }, (_, index) => ({
  suggestionNumber: `SUGG-${index + 1}`,
  registeredDate: new Date(2023, 0, index + 1).toISOString().split('T')[0],
  userID: `USER-${index + 1}`,
  username: [
    'Alice Johnson', 'Bob Smith', 'Charlie Brown', 'David Wilson', 'Eva Green',
    'Frank White', 'Grace Harris', 'Henry Lewis', 'Isla Young', 'Jack King',
    'Kara Hall', 'Leo Scott', 'Mia Adams', 'Nathan Baker', 'Olivia Martinez',
    'Paul Mitchell', 'Quinn Parker', 'Rachel Evans', 'Sam Lee', 'Tina Hill',
    'Uma Turner', 'Vince Walker', 'Wendy Harris', 'Xander Carter', 'Yara Lopez',
    'Zane Foster', 'Amelia Turner', 'Benjamin Bell', 'Charlotte Perez', 'Daniel Cox',
    'Eleanor Reed', 'Finn Murphy', 'Gabriella Ward', 'Harrison Sanders', 'Ivy Collins',
    'Jacob Diaz', 'Katherine Brooks', 'Liam Gray', 'Megan Hughes', 'Noah Richardson',
    'Oscar Stewart', 'Penelope Rogers', 'Quentin Kelly', 'Ruby Howard', 'Sebastian Cooper',
    'Tessa Peterson', 'Ulysses Simmons', 'Victoria Morgan', 'William Hayes', 'Zoe Fisher'
  ][index % 50],
  department: ['HR', 'Finance', 'IT', 'Marketing'][index % 4],
  suggestion: `This is suggestion number ${index + 1}`,
}));

const SuggestionManagement = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage] = useState(10);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [department, setDepartment] = useState('');
  const [filteredData, setFilteredData] = useState(dummyData);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  const handleFilter = () => {
    let filtered = dummyData;
    if (startDate) {
      filtered = filtered.filter(item => new Date(item.registeredDate) >= new Date(startDate));
    }
    if (endDate) {
      filtered = filtered.filter(item => new Date(item.registeredDate) <= new Date(endDate));
    }
    if (department) {
      filtered = filtered.filter(item => item.department === department);
    }
    setFilteredData(filtered);
    setCurrentPage(0);
  };

  const pageCount = Math.ceil(filteredData.length / itemsPerPage);
  const currentData = filteredData.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);

  return (
    <div className="suggestion-management">
      <h1>Suggestion Management</h1>
      <div className="filter-section">
        <label>
          Start Date:
          <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
        </label>
        <label>
          End Date:
          <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
        </label>
        <label>
          Department:
          <select value={department} onChange={(e) => setDepartment(e.target.value)}>
            <option value="">All</option>
            <option value="HR">HR</option>
            <option value="Finance">Finance</option>
            <option value="IT">IT</option>
            <option value="Marketing">Marketing</option>
          </select>
        </label>
        <button onClick={handleFilter}>Filter</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Suggestion Number</th>
            <th>Registered Date</th>
            <th>User ID</th>
            <th>Username</th>
            <th>Department</th>
            <th>Suggestion</th>
          </tr>
        </thead>
        <tbody>
          {currentData.map((item, index) => (
            <tr key={index}>
              <td>{item.suggestionNumber}</td>
              <td>{item.registeredDate}</td>
              <td>{item.userID}</td>
              <td>{item.username}</td>
              <td>{item.department}</td>
              <td>{item.suggestion}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <ReactPaginate
        previousLabel={'Previous'}
        nextLabel={'Next'}
        breakLabel={'...'}
        breakClassName={'break-me'}
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageClick}
        containerClassName={'pagination'}
        activeClassName={'active'}
      />
    </div>
  );
};

export default SuggestionManagement;
