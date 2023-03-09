/*!
=========================================================
* Muse Ant Design Dashboard - v1.0.0
=========================================================
* Product Page: https://www.creative-tim.com/product/muse-ant-design-dashboard
* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/muse-ant-design-dashboard/blob/main/LICENSE.md)
* Coded by Creative Tim
=========================================================
* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/
import {
  Row,
  Col,
  Card,
  Radio,
  Table,
  Upload,
  message,
  Progress,
  Button,
  Avatar,
  Typography,
} from "antd";

import { React, useState, useEffect } from "react";
import axios from 'axios'; 
import { ToTopOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const { Title } = Typography;

const formProps = {
  name: "file",
  action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
  headers: {
    authorization: "authorization-text",
  },
  onChange(info) {
    if (info.file.status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === "done") {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};
// table code start
const columns = [
  {
    title: "SR No",
    dataIndex: "sr_no",
    key: "sr_no",
    // width: "32%",
  },
  {
    title: "Logistics Buyer NP Name",
    dataIndex: "bap_id",
    key: "bap_id",
  },
  {
    title: "Logistics Seller NP Name",
    key: "seller_np",
    dataIndex: "seller_np",
  },
  {
    title: "Order Create Date & Time",
    key: "consignment_creation_time",
    dataIndex: "consignment_creation_time",
  },
  {
    title: "Network Order Id",
    key: "ondc_order_id",
    dataIndex: "ondc_order_id",
  },
  {
    title: "Network Transaction Id",
    key: "transaction_id",
    dataIndex: "transaction_id",
  },
  {
    title: "Logistics Seller NP Order Id",
    key: "",
    dataIndex: "",
  },
  {
    title: "Order Status",
    key: "ondc_order_state",
    dataIndex: "ondc_order_state",
  },
  {
    title: "Name of Seller",
    key: "provider_name",
    dataIndex: "provider_name",
  },
  {
    title: "Order Pickup Date & Time",
    key: "pickup_time",
    dataIndex: "pickup_time",
  },
  {
    title: "Pickup Pincode",
    key: "pickup_areacode",
    dataIndex: "pickup_areacode",
  },
  {
    title: "Shipped At Date & Time",
    key: "shipped_time",
    dataIndex: "shipped_time",
  },
  {
    title: "Delivered At Date & Time",
    key: "delivery_time",
    dataIndex: "delivery_time",
  },
  {
    title: "Delivery City",
    key: "drop_city",
    dataIndex: "drop_city",
  },
  {
    title: "Delivery Pincode",
    key: "drop_areacode",
    dataIndex: "drop_areacode",
  },
  {
    title: "Cancelled At Date & Time",
    key: "cancellation_time",
    dataIndex: "cancellation_time",
  },
  {
    title: "Cancelled By",
    key: "cancelled_by",
    dataIndex: "cancelled_by",
  },
  {
    title: "Cancellation Reason",
    key: "cancellation_reason_code",
    dataIndex: "cancellation_reason_code",
  },
  {
    title: "Shipping Charges",
    key: "delivery_charge",
    dataIndex: "delivery_charge",
  },

];

const data = [
  {
    key: "1",
    name: (
      <>
        <Avatar.Group>
          <Avatar
            className="shape-avatar"
            shape="square"
            size={40}
          ></Avatar>
          <div className="avatar-info">
            <Title level={5}>Michael John</Title>
            <p>michael@mail.com</p>
          </div>
        </Avatar.Group>{" "}
      </>
    ),
    function: (
      <>
        <div className="author-info">
          <Title level={5}>Manager</Title>
          <p>Organization</p>
        </div>
      </>
    ),

    status: (
      <>
        <Button type="primary" className="tag-primary">
          ONLINE
        </Button>
      </>
    ),
    employed: (
      <>
        <div className="ant-employed">
          <span>23/04/18</span>
          <a href="#pablo">Edit</a>
        </div>
      </>
    ),
  },

  {
    key: "2",
    name: (
      <>
        <Avatar.Group>
          <Avatar
            className="shape-avatar"
            shape="square"
            size={40}
          ></Avatar>
          <div className="avatar-info">
            <Title level={5}>Alexa Liras</Title>
            <p>alexa@mail.com</p>
          </div>
        </Avatar.Group>{" "}
      </>
    ),
    function: (
      <>
        <div className="author-info">
          <Title level={5}>Programator</Title>
          <p>Developer</p>
        </div>
      </>
    ),

    status: (
      <>
        <Button className="tag-badge">ONLINE</Button>
      </>
    ),
    employed: (
      <>
        <div className="ant-employed">
          <span>23/12/20</span>
          <a href="#pablo">Edit</a>
        </div>
      </>
    ),
  },
];

function OrderStatus() {
  let [records, setRecords]=useState(null);
  let [count, setCount]=useState(0);

  const onChange = (e) => console.log(`radio checked:${e.target.value}`);
  useEffect(() => {
    console.log("inside useEffect")
    getRecords(1, 10, "2023-02-06 03:22:49", "2023-03-06 03:22:49")
  }, []);

  function getRecords(p, n, fromDate, toDate){
      // console.log("p n ", p, n)
      console.log("Inside getRecords", p, n, fromDate, toDate)
			// this.isLoading = true;
			// this.error = null;
			const requestBody = { fromDate: fromDate, toDate: toDate };
			const headers = {
				'Content-Type': 'application/json'
			}
			axios.post(`http://localhost:5003/api/fetchOrderStatus?page=${p}&records=${n}`, requestBody, { headers: headers, data: requestBody }).then((res) => {
				// this.records = res.data.records.results;
        console.log(res.data.records.results)
        let records = res.data.records.results;
        setRecords(res.data.records.results);
				console.log("records is", records)
        console.log("data is", data)
        let count = res.data.count;
        setCount(count)
				console.log("count is", setCount)
				// this.tablePagination.total = this.count;
				// this.isDataFetched = true;
				// this.isLoading = false;
			}).catch((error) => {
				console.log(error);
				// this.isLoading = false;
				// this.error = "Failed to fetch data - please try again later"
			})
  };
  
  return (
    <>
      <div className="tabled">
        <Row gutter={[24, 0]}>
          <Col xs="24" xl={24}>
            <Card
              bordered={false}
              className="criclebox tablespace mb-24"
              // title="Authors Table"
              extra={
                <>
                  <Radio.Group onChange={onChange} defaultValue="a">
                    <Radio.Button value="a">All</Radio.Button>
                    <Radio.Button value="b">Accepted</Radio.Button>
                  </Radio.Group>
                </>
              }
            >
              <div className="table-responsive">
                <Table
                  columns={columns}
                  dataSource={records}
                  pagination={false}
                  className="ant-border-space"
                />
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default OrderStatus;
