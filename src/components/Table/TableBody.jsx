import React from "react";
import { useNavigate } from "react-router-dom";

function TableBody({ data, columns, isLoading, navigateTo = "/" }) {
  const navigate = useNavigate()
  if (isLoading) {
    // Render spinner or loading indicator here
    return (
      <tbody>
        <tr>
          <td colSpan={columns.length}>Loading...</td>
        </tr>
      </tbody>
    );
  }
  console.log(data)
  return (
    <tbody className="text-sm font-medium divide-y divide-slate-100 dark:divide-slate-700">
      {data.length > 0 ? (
        data.map((item, index) => (
          <tr
            onClick={() => navigate(item._id)}
            key={index}
            className="hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer"
          >
            {columns.map((column, columnIndex) => (
              <td
                key={columnIndex}
                className={`p-2 text-center ${column.className}`}
              >
                {item[column.key]}
              </td>
            ))}
          </tr>
        ))
      ) : (
        <tr>
          <td className="p-2" colSpan={columns.length}>
            No data available.
          </td>
        </tr>
      )}
    </tbody>
  );
}

export default TableBody;
