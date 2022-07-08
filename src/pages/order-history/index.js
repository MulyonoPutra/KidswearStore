import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Moment from 'react-moment';
import NumberFormat from 'react-number-format';

import { listOrderHistory } from 'config/redux/action/order.action';

import './order-history.scss';
import CheckedIcon from '../../assets/icons/png/checked.png';
import CrossIcon from '../../assets/icons/png/cross.png';

const OrderHistory = () => {
  const navigate = useNavigate();
  const orderHistory = useSelector((state) => state.orderHistory);

  const { loading, error, orders } = orderHistory;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listOrderHistory());
  }, [dispatch]);

  return (
    <>
      <div className='order-history'>
        <div className='heading'>
          <div className='heading-wrapper'>
            <p className='heading-text'>Order History</p>
          </div>
        </div>
        <div className='data-table'>
          <table className='data-table-wrapper'>
            <thead>
              <tr className='data-table-tr-title'>
                <th className='font-normal text-left pl-4'>ID</th>
                <th className='font-normal text-left pl-12'>Date</th>
                <th className='font-normal text-left pl-12'>Total Price</th>
                <th className='font-normal text-left pl-20'>Paid</th>
                <th className='font-normal text-left pl-20'>Delivered</th>
                <th className='font-normal text-left pl-16'>Actions</th>
              </tr>
            </thead>
            <tbody className='w-full'>
              {orders?.map((order) => (
                <tr key={order._id} className='data-table-tr-value'>
                  <td className='pl-4 cursor-pointer'>
                    <p className='data-table-text'>{order._id}</p>
                  </td>
                  <td className='pl-12'>
                    <p className='data-table-text'>
                      <Moment format='LLLL' date={order.createdAt} />
                    </p>
                  </td>
                  <td className='pl-12'>
                    <p className='data-table-text'>
                      <NumberFormat
                        value={order.totalPrice}
                        displayType={'text'}
                        thousandSeparator={true}
                        prefix={'Rp.'}
                      />
                    </p>
                  </td>
                  <td className='pl-20'>
                    <p className='data-table-text'>
                      {order?.isPaid ? (
                        <img
                          src={CheckedIcon}
                          alt='banner'
                          height={30}
                          width={30}
                        />
                      ) : (
                        <img
                          src={CrossIcon}
                          alt='banner'
                          height={30}
                          width={30}
                        />
                      )}
                    </p>
                  </td>
                  <td className='pl-20'>
                    <p className='data-table-text'>
                      {order?.isDelivered ? (
                        <img
                          src={CheckedIcon}
                          alt='banner'
                          height={30}
                          width={30}
                        />
                      ) : (
                        <img
                          src={CrossIcon}
                          alt='banner'
                          height={30}
                          width={30}
                        />
                      )}
                    </p>
                  </td>
                  <td className='pl-20'>
                    <div>
                      <button
                        className='btn'
                        onClick={() => {
                          navigate(`/order/${order._id}`);
                        }}
                      >
                        <p className='btn-text'>View Details</p>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default OrderHistory;
