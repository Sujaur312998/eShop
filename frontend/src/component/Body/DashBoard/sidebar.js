import React from 'react'
import { NavLink } from 'react-router-dom'


const Sidebar = () => {
    return (
        <nav id="sidebarMenu" className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
                    <div className="position-sticky pt-3">
                        <ul className="nav flex-column">
                            <li className="nav-item">
                                <NavLink className="nav-link active" aria-current="page" to="/">
                                    <span data-feather="home"></span>
                                    Dashboard
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/orders">
                                    <span data-feather="file"></span>
                                    Orders
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/products">
                                    <span data-feather="shopping-cart"></span>
                                    Products
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/customers">
                                    <span data-feather="users"></span>
                                    Customers
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/orders">
                                    <span data-feather="bar-chart-2"></span>
                                    Reports
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/orders">
                                    <span data-feather="layers"></span>
                                    Integrations
                                </NavLink>
                            </li>
                        </ul>

                        <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
                            <span>Saved reports</span>
                            <NavLink className="link-secondary" to="/orders" aria-label="Add a new report">
                                <span data-feather="plus-circle"></span>
                            </NavLink>
                        </h6>
                        <ul className="nav flex-column mb-2">
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/orders">
                                    <span data-feather="file-text"></span>
                                    Current month
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/orders">
                                    <span data-feather="file-text"></span>
                                    Last quarter
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/orders">
                                    <span data-feather="file-text"></span>
                                    Social engagement
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/orders">
                                    <span data-feather="file-text"></span>
                                    Year-end sale
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                </nav>
    )
}

export default Sidebar
