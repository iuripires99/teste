import React from 'react';
import '../../App.css';
import notificationicon from "../../images/notification.png";
import ProductGraph from '../../components/admin/ProductGraph';
import Box from '../../components/admin/Box';
import LastSalesBox from '../../components/admin/LastSalesBox';

const AdminProductDashboard = () => {
    return (
        <div className="container px-0 bg-light w-100">
            <h4 className="title my-3 ms-5">Product Name</h4>
            <div className="container text-center">
                <div className="d-flex justify-content-between">
                    <div className="col mx-1 bg-white roundbg">
                        <Box title="Pending tickets" number="20" image={notificationicon} evolution="10" />
                    </div>
                    <div className="col mx-1 bg-white roundbg">
                        <Box title="Pending Sales" number="20" image={notificationicon} evolution="10" />
                    </div>
                    <div className="col mx-1 bg-white roundbg">
                        <Box title="Inactive Licences" number="20" image={notificationicon} evolution="10" />
                    </div>
                    <div className="col mx-1 bg-white roundbg">
                        <Box title="Active Licences" number="20" image={notificationicon} evolution="10" />
                    </div>
                </div>
                <div className="container my-4 p-0">
                    <div className="col-12 bg-white roundbg my-2 shadow pt-3">
                        <h2>Sales over the Year</h2>
                        <ProductGraph/>
                    </div>
                    <div className="d-flex flex-column bg-white w-100 roundbg mt-3 p-0 shadow pt-3">
                        <h2 className="my-2">Last Sales</h2>
                        <div className="text-center">
                            <div className="container my-4 px-0">
                                <LastSalesBox />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}


export default AdminProductDashboard;
