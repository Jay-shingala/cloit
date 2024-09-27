'use client'
import React, { useState } from 'react';

export default function Home() {
  return (
    <div className="">
      <AccordionTreeView />
    </div>
  );
}

const initialAccordionData = [
  {
    id: 1,
    title: "Text",
    icon: "text-icon",
    children: [
      {
        id: 2,
        title: "Frame",
        icon: "frame-icon",
        children: [
          {
            id: 3,
            title: "Alignment",
            icon: "alignment-icon",
            children: [
              { id: 4, title: "Left", icon: "left-icon" },
              { id: 5, title: "Right", icon: "right-icon" },
              { id: 6, title: "Top", icon: "top-icon" },
              { id: 7, title: "Bottom", icon: "bottom-icon" },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 8,
    title: "Font",
    icon: "font-icon",
    children: [
      { id: 9, title: "Bold", icon: "bold-icon" },
      { id: 10, title: "Italic", icon: "italic-icon" },
      { id: 11, title: "Underline", icon: "underline-icon" },
    ],
  },
];

const AccordionItem = ({ item }) => {
  return (
    <div className="hs-accordion" role="treeitem">
      <div className="hs-accordion-heading py-0.5 flex items-center gap-x-0.5 w-full">
        <button className="hs-accordion-toggle size-6 flex justify-center items-center hover:bg-gray-100 rounded-md focus:outline-none focus:bg-gray-100">
          {item.children && item.children.length > 0 && (
            <svg className="hs-accordion-active:rotate-180 transition duration-300 size-2.5 text-gray-600">
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3.5 5.25L7 8.75L10.5 5.25"
                  stroke="#101828"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </svg>
          )}
        </button>
        <div className="grow px-1.5 rounded-md cursor-pointer">
          <div className="flex items-center gap-x-3">
            <div className="grow">
              <span className="text-sm text-gray-800">{item.title}</span>
            </div>
          </div>
        </div>
      </div>

      {item.children && (
        <div className="hs-accordion-content w-full overflow-hidden transition-[height] duration-300 ms-3 ps-3 relative before:absolute before:top-0 before:start-0 before:w-0.5 before:-ms-px before:h-full before:bg-gray-100 dark:before:bg-neutral-700">
          <div className="hs-accordion-group ps-7">
            {item.children.map((child) => (
              <AccordionItem key={child.id} item={child} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const AccordionTreeView = () => {
  const [accordionData, setAccordionData] = useState(initialAccordionData);
  const [newItem, setNewItem] = useState({
    depth: '',
    parentData: '',
    name: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewItem({
      ...newItem,
      [name]: value,
    });
  };

  const handleSave = () => {
    // Logic to update accordionData by adding the new item at the appropriate depth and parent
    // You can modify the logic to place the new item correctly based on depth and parentData
    const updatedData = [...accordionData]; // Clone current data

    // Add logic here to find the correct parent and add the new item to it

    setAccordionData(updatedData);
  };

  return (
    <div className="hs-accordion-treeview-root" role="tree" aria-orientation="vertical">
      {accordionData.map((item) => (
        <AccordionItem key={item.id} item={item} />
      ))}

      {/* Form for adding new items */}
      <div className="mt-4 p-4 border rounded-lg">
        <h3 className="text-lg mb-2">Add New Item</h3>
        <div className="mb-2">
          <label className="block text-sm">Depth:</label>
          <input
            type="text"
            name="depth"
            value={newItem.depth}
            onChange={handleInputChange}
            className="p-2 border rounded w-full"
          />
        </div>
        <div className="mb-2">
          <label className="block text-sm">Parent Data:</label>
          <input
            type="text"
            name="parentData"
            value={newItem.parentData}
            onChange={handleInputChange}
            className="p-2 border rounded w-full"
          />
        </div>
        <div className="mb-2">
          <label className="block text-sm">Name:</label>
          <input
            type="text"
            name="name"
            value={newItem.name}
            onChange={handleInputChange}
            className="p-2 border rounded w-full"
          />
        </div>
        <button onClick={handleSave} className="px-4 py-2 bg-blue-500 text-white rounded">
          Save
        </button>
      </div>
    </div>
  );
};
