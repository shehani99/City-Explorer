import React from "react";

// Type definitions for the ListGroup component props
interface ListGroupProps {
  items: { name: string; description: string }[];
  heading: string;
  onItemClick: (index: number) => void;
  selectedIndex: number | null;
}

const ListGroup: React.FC<ListGroupProps> = ({
  items,
  heading,
  onItemClick,
  selectedIndex,
}) => {
  return (
    <div>
      <h3>{heading}</h3>
      <ul className="list-group">
        {items.map((item, index) => (
          <li
            key={index}
            className={`list-group-item ${selectedIndex === index ? "active" : ""}`}
            onClick={() => onItemClick(index)} // Click to select city
          >
            {item.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListGroup;
