import React, { useEffect } from 'react';
import Lıst from './Lıst';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUsers } from '../features/user';

const Page = () => {
  const dispatch = useDispatch();
  const { listAr, isLoading, userNumber, warning,endIndex,startIndex,usersPerPage } = useSelector((state) => state.user);
let totalLıst=listAr.slice(startIndex,endIndex)
const totalPages = Math.ceil(listAr.length / usersPerPage);



  useEffect(() => {
    dispatch(fetchUsers(userNumber));
  }, [dispatch, userNumber]);

  return (
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : warning ? (
        <p>Error: {warning}</p>
      ) : (
        <Lıst listAr={totalLıst} totalPage={totalPages} />
      )}
    </div>
  );
};

export default Page;
