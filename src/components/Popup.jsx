import React from 'react';

const Popup = ({ isVisible, onClose, sections, tableData }) => {
  if (!isVisible) return null;

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 flex justify-center items-center z-50 bg-gray-600 bg-opacity-50">
        {/* Popup content */}
        <div className="bg-white rounded-lg p-6 shadow-lg max-w-full md:max-w-lg w-full m-16">
          
          {/* Close Button placed at the top-right corner */}
          <div className="flex justify-end mb-4">
            <button
              onClick={onClose}
              className="text-xl text-gray-700"
            >
              &#10005; {/* Close Icon */}
            </button>
          </div>

          {/* Dynamically render sections */}
          <div>
            <h2 className="text-2xl font-bold flex justify-center">Tuples</h2>
            {sections.map((section, index) => (
              <div key={index} className="mb-4">
                <h3 className="text-xl font-semibold">{section.title}</h3>
                <p>{section.content}</p>
              </div>
            ))}
          </div>

          {/* Table with 3 columns */}
          <div className="mt-4">
            <table className="min-w-full table-auto border-collapse">
              <thead>
                <tr>
                  <th className="border p-2">State</th>
                  <th className="border p-2">A</th>
                  <th className="border p-2">B</th>
                </tr>
              </thead>
              <tbody>
                {tableData.slice(1).map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    <td className="border p-2">{row[0]}</td>
                    <td className="border p-2">{row[1]}</td>
                    <td className="border p-2">{row[2]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Popup;
