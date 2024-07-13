import { useState } from 'react';
import axios from 'axios';
import { Spinner } from '../Spinner'; // Ensure you have a Spinner component
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function LogData() {
  const [formData, setFormData] = useState({
    userName: '',
    itemName: '',
    itemQuantity: '',
    totalExpense: '',
    paymentMethod: '',
    remarks: ''
  });

  const [loading, setLoading] = useState(false);

  const { userName, itemName, itemQuantity, totalExpense, paymentMethod, remarks } = formData;

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post('https://expense-manager-xrfq.onrender.com/api/log-data', formData);
      toast.success('Log Entry Created successfully');
      console.log(res);

      setFormData({
        userName: '',
        itemName: '',
        itemQuantity: '',
        totalExpense: '',
        paymentMethod: '',
        remarks: ''
      });
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error creating log entry');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ToastContainer />
      <h1 className="font-bold text-3xl text-[#77bfe9] text-center mt-2 mb-5">Log the Record</h1>
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Spinner />
        </div>
      ) : (
        <form className="max-w-sm mx-auto px-4 mb-6 flex flex-col space-y-4" onSubmit={onSubmit}>
          <div className="mb-4">
            <label
              htmlFor="userName"
              className="block text-lg font-medium text-[#e68748] dark:text-white"
            >
              Name of the User
            </label>
            <input
              type="text"
              id="userName"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Rakesh"
              name="userName"
              value={userName}
              onChange={onChange}
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="itemName"
              className="block text-lg font-medium text-[#e68748] dark:text-white"
            >
              Item Name
            </label>
            <input
              type="text"
              id="itemName"
              name="itemName"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Cup"
              value={itemName}
              onChange={onChange}
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="quantity"
              className="block text-lg font-medium text-[#e68748] dark:text-white"
            >
              Quantity
            </label>
            <input
              type="number"
              id="quantity"
              name="itemQuantity"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              defaultValue={1}
              value={itemQuantity}
              onChange={onChange}
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="totalExpense"
              className="block text-lg font-medium text-[#e68748] dark:text-white"
            >
              Total Expense
            </label>
            <input
              type="number"
              id="totalExpense"
              name="totalExpense"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="₹0.00"
              value={totalExpense}
              onChange={onChange}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-lg font-medium text-[#e68748] dark:text-white">
              Payment Method
            </label>
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <input
                  id="cash"
                  type="radio"
                  value="Cash"
                  name="paymentMethod"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  onChange={onChange}
                  checked={paymentMethod === 'Cash'}
                  required
                />
                <label
                  htmlFor="cash"
                  className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Cash
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="upi"
                  type="radio"
                  value="UPI"
                  name="paymentMethod"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  onChange={onChange}
                  checked={paymentMethod === 'UPI'}
                  required
                />
                <label
                  htmlFor="upi"
                  className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  UPI
                </label>
              </div>
            </div>
          </div>

          <div className="mb-4">
            <label
              htmlFor="remarks"
              className="block text-lg font-medium text-[#e68748] dark:text-white"
            >
              Remarks
            </label>
            <textarea
              id="remarks"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Any additional details"
              name="remarks"
              value={remarks}
              onChange={onChange}
              rows="4"
            ></textarea>
          </div>

          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Log Data
          </button>
        </form>
      )}
    </>
  );
}

export default LogData;
