import axios from 'axios'
import Cookies from 'js-cookie'
import React from 'react'
import 'bootstrap-icons/font/bootstrap-icons.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, Outlet } from 'react-router-dom'
import { AppstoreOutlined, BankOutlined } from '@ant-design/icons';
import { OrderedListOutlined } from '@ant-design/icons';
import { ShoppingCartOutlined } from '@ant-design/icons';

const Admin = () => {
  const handleLogout=()=>{
    axios.get('http://localhost:3002/logout')
    .then(res =>{
      window.localStorage.removeItem("userId")
     // window.localStorage.removeItem("accessToken")
      //window.localStorage.removeItem("refreshToken")
      Cookies.remove("accessToken");
      Cookies.remove("refreshToken");
        window.location.reload();
    })
    .catch(err=>console.log(err))
}
  return (
    <div className="container-fluid">
			<div className="row flex-nowrap">
				<div className="col-auto col-md-3 col-lg-2 px-sm-2 px-0 bg-dark">
					<div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
						<a href="/" className="d-flex align-items-center pb-3 mb-md-1 mt-md-3 me-md-auto text-white text-decoration-none">
							<span className="fs-5 fw-bolder d-none d-sm-inline">Admin Dashboard</span>
						</a>
						<ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
							<li>
								<Link to="/" data-bs-toggle="collapse" className="nav-link text-white px-0 align-middle">
									<i className="fs-4 bi-speedometer2"></i> <span className="ms-1 d-none d-sm-inline">Dashboard</span> </Link>
							</li>
							<li>
								<Link to="/menaxhoUseret" className="nav-link px-0 align-middle text-white">
									<i className="fs-4 bi-people"></i> <span className="ms-1 d-none d-sm-inline">Menaxhimi i Userave</span> </Link>
							</li>
							<li>
								<Link to="/menaxhoAmenties" className="nav-link px-0 align-middle text-white">
								<ShoppingCartOutlined /> <span className="ms-1 d-none d-sm-inline">Menaxhimi i pajisjeve</span> </Link>
							</li>
							<li>
								<Link to="/produktet" className="nav-link px-0 align-middle text-white">
									<AppstoreOutlined/> <span className="ms-1 d-none d-sm-inline">Menaxhimi i Produkteve</span> </Link>
							</li>
							<li>
								<Link to="/orders" className="nav-link px-0 align-middle text-white">
								<OrderedListOutlined /> <span className="ms-1 d-none d-sm-inline">Orders</span> </Link>
							</li>
							<li>
								<Link to="/kategorite" className="nav-link px-0 align-middle text-white">
								<ShoppingCartOutlined /> <span className="ms-1 d-none d-sm-inline">Kategorite</span> </Link>
							</li>
							<li>
								<Link to="profile" className="nav-link px-0 align-middle text-white">
									<i className="fs-4 bi-person"></i> <span className="ms-1 d-none d-sm-inline">Profile</span></Link>
							</li>
							<li>
								<Link to="/skuadra" className="nav-link px-0 align-middle text-white">
									<i className="fs-4 bi-person"></i> <span className="ms-1 d-none d-sm-inline">Skuadra</span></Link>
							</li>
							<li>
								<Link to="/futbollisti" className="nav-link px-0 align-middle text-white">
									<i className="fs-4 bi-person"></i> <span className="ms-1 d-none d-sm-inline">Futbollistet</span></Link>
							</li>


							<li>
								<Link to="/bank" className="nav-link px-0 align-middle text-white">
								<BankOutlined /> <span className="ms-1 d-none d-sm-inline">Banka</span></Link>
							</li>
							<li>
								<Link to="/klientbanka" className="nav-link px-0 align-middle text-white">
									<i className="fs-4 bi-person"></i> <span className="ms-1 d-none d-sm-inline">Klientet</span></Link>
							</li>

							<li>
								<Link to="/chef" className="nav-link px-0 align-middle text-white">
								<BankOutlined /> <span className="ms-1 d-none d-sm-inline">Chef</span></Link>
							</li>
							<li>
								<Link to="/recipe" className="nav-link px-0 align-middle text-white">
								<BankOutlined /> <span className="ms-1 d-none d-sm-inline">Recipe</span></Link>
							</li>


							<li onClick={handleLogout}>
								<a href="#" className="nav-link px-0 align-middle text-white">
									<i className="fs-4 bi-power"></i> <span className="ms-1 d-none d-sm-inline">Logout</span></a>
							</li>
						</ul>
					</div>
				</div>
				<div class="col p-0 m-0">
					<div className='p-2 d-flex justify-content-center shadow'>
						<h4>Sistemi per menaxhim te Aplikacionit E-commerce</h4>						
					</div>
					<Outlet />
				</div>
			</div>
		</div>
  )
}

export default Admin