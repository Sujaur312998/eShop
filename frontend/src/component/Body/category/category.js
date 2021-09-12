import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Sidebar from '../DashBoard/sidebar'
import { isUserAuthenticated } from '../../commonAuth/commonAuthentication'
import { isUserLogined, userAuthenticate } from '../../../redux/auth/authAction'
import { useHistory } from 'react-router-dom'
import { getCategory } from '../../../redux/createCategory/categoryAction'
import { Button, Modal } from 'react-bootstrap';
//import Select from 'react-select'


const Category = () => {
    const dispatch = useDispatch()
    const history = useHistory()


    /*     const options = [
            {
                label: "Male",
                value: "male",
            },
            {
                label: "Female",
                value: "female",
            },
            {
                label: "Others",
                value: "None of them",
            },
        ] */

    const categories = useSelector(state => state.categoryReducer)

    const [show, setShow] = useState(false);
    const [categoryName, setCategoryName] = useState('');

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    let categoryList = [];
    const renderCategory = (categories) => {
        for (let item of categories) {
            categoryList.push(
                <li key={item._id}>{item.name}</li>
                
            )
        }
        return categoryList
    }

    let options = []
    const renderSelectCategory = (categories) => {
        for (let item of categories) {
            //options.push({value:item._id,level:item.name})
            options.push(<option key={item._id} value={item._id}>{item.name}</option>)
        }
    }
    renderSelectCategory(categories.categories)



    useEffect(() => {
        async function fetchData() {
            dispatch(isUserLogined())
            const token = window.store.getState().authReducer.token
            const res = await isUserAuthenticated(token)
            try {
                if (res === 200) {
                    dispatch(userAuthenticate(true))
                } else {
                    dispatch(userAuthenticate(false))
                    history.push('/signin')
                }
                await dispatch(getCategory())
            } catch (e) {
                console.log(e)
            }
        }
        fetchData()

    }, [dispatch, history])




    return (
        <div className="container-fluid">
            <div className="row">
                <Sidebar />

                <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                    <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                        <h1 className="h2">Category</h1>
                        <Button className='btn btn-success' onClick={handleShow}>Add Category</Button>
                    </div>
                    <ul>
                        {renderCategory(categories.categoryList)}
                    </ul>
                </main>
            </div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add new Category</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="form-floating">
                        <input
                            type="category"
                            className="form-control"
                            id="floatingInput"
                            placeholder="New category"
                            autoComplete='off'
                            value={categoryName}
                            onChange={e => setCategoryName(e.target.value)}
                        />
                        <label htmlFor="floatingInput">New category</label>
                    </div>
                    <br />
                    <select className='form-control'>
                        <option hidden>Select Category</option>
                        {options}
                    </select>


                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default Category

