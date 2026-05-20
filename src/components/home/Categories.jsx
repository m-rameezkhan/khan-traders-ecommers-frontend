import React from 'react';
import { Link } from 'react-router-dom';
import { IoCubeOutline, IoFishOutline, IoFlaskOutline, IoLeafOutline } from 'react-icons/io5';
import './styles/categories.css';

const Categories = () => {
  const categories = [
    { id: 1, name: 'Fishmeal', icon: <IoFishOutline />, path: '/products?cat=fishmeal' },
    { id: 2, name: 'Feed', icon: <IoCubeOutline />, path: '/products?cat=feed' },
    { id: 3, name: 'Supplements', icon: <IoFlaskOutline />, path: '/products?cat=supplements' },
    { id: 4, name: 'Organic', icon: <IoLeafOutline />, path: '/products?cat=organic' }
  ];

  return (
    <section className="categories-section">
      <div className="container">
        <h2>Shop By Category</h2>
        <div className="categories-grid">
          {categories.map(category => (
            <Link key={category.id} className="category-card" to={category.path}>
              <div className="category-icon">
                {category.icon}
              </div>
              <h3>{category.name}</h3>
              <p>Explore</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
