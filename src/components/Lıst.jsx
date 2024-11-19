import React from 'react';
import { useDispatch } from 'react-redux';
import { nextPage } from '../features/user';
import "./style.css"

const Lıst = ({ listAr, totalPage }) => {
  const dispatch = useDispatch();

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {listAr.map((person, index) => (
            <tr key={index}>
              <td>{`${person.name.first} ${person.name.last}`}</td>
              <td>{person.registered.age}</td>
              <td>{person.email}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination">
        {[...Array(totalPage)].map((_, index) => (
          <button key={index} onClick={() => dispatch(nextPage(index))}>
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Lıst;
