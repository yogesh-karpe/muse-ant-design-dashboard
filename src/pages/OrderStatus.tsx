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
  Table,
  Button,
  Typography,
  DatePicker,
  Space,
} from "antd";

import type { DatePickerProps } from 'antd';

import React, {useState, useEffect } from "react";
import axios from 'axios'; 
import moment from "moment";

const { Title } = Typography;

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


function OrderStatus() {
  let [records, setRecords]=useState();
  //null
  let [count, setCount]=useState();
  let [tablePagination, setTablePagination]=useState({total: 10});
  let [pagination, setPagination] = useState({current: 1,pageSize: 10});
  let [startDate, setStartDate] = useState<Date>(new Date(new Date().setMonth(new Date().getMonth() - 1)));
  let [endDate, setEndDate] = useState<Date>(new Date());

  const pageChangeHandler = (pagination: any) => {
    // console.log("Page is",page);
    setPagination(pagination);
    console.log("pagination is", pagination)
    onSubmit(pagination.current, pagination.pageSize);
  };

  const fromDateChangeHandler: DatePickerProps['onChange'] = (date, dateString) => {
    let val = new Date(dateString);
    console.log("start val", val)
    setStartDate(val);
  };

  const toDateChangeHandler: DatePickerProps['onChange'] = (date, dateString) => {
    let val = new Date(dateString);
    console.log("end val", val)
    setEndDate(val);
  };

  // const onChange = (e) => console.log(`radio checked:${e.target.value}`);
  useEffect(() => {
    console.log("inside useEffect")
    // getRecords(1, 10, "2023-02-09 03:22:49", "2023-03-09 03:22:49")
    onSubmit(pagination.current, pagination.pageSize);
  }, []);

  function formatDate(value: any) {
    console.log("formatDate", moment(String(value)).format('YYYY-MM-DD hh:mm:ss'))
    return moment(String(value)).format('YYYY-MM-DD hh:mm:ss')
    // dd-mm-yyyy hh:mm:ss
  }

  function onSubmit(p: number,n: number){
    console.log("start date", startDate);
    console.log("end date", endDate);
      // getRecords(p, n, "2023-02-09 03:22:49", "2023-03-09 03:22:49")
      getRecords(p, n, formatDate(startDate), formatDate(endDate))
  }

  //can convert String type to Date type
  function getRecords(p: number, n: number, fromDate: string, toDate: string){
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
				console.log("records are", records)
        let count = res.data.count;
        setCount(count)
        let updatedValue = {total: count}
        console.log("updated value", updatedValue)
        setTablePagination(tablePagination =>({
              ...updatedValue
        }))
        console.log("tablePagination", tablePagination)
				// this.tablePagination.total = this.count;
				// this.isDataFetched = true;
				// this.isLoading = false;
			}).catch((error) => {
				console.log(error);
				// this.isLoading = false;
				// this.error = "Failed to fetch data - please try again later"
			})
  }

  function getCSVFile() {
    const requestBody = { fromDate: formatDate(startDate), toDate: formatDate(endDate) };
    const headers = {
      'Content-Type': 'application/json'
    }
    axios.post(`http://localhost:5003/api/getOrderStatusCSV`, requestBody, { headers: headers, data: requestBody }).then((res) => {
      // console.log("res", res);
      downloadCSVFile(res.data);
    })
  }

  function downloadCSVFile(csv_data: any) {
    let CSVFile = new Blob([csv_data], {
      type: "text/csv"
    });
    var temp_link = document.createElement('a');

    // Download csv file
    temp_link.download = "Order_Status.csv";
    var url = window.URL.createObjectURL(CSVFile);
    temp_link.href = url;

    temp_link.style.display = "none";
    document.body.appendChild(temp_link);

    temp_link.click();
    document.body.removeChild(temp_link);
  }

  return (
    <>
      <div className="tabled">
        <Row gutter={[24, 0]}>
          <Col xs="24" xl={24}>
            <Card
              bordered={false}
              className="criclebox tablespace mb-24"
              // title="Authors Table"
              // extra={
              //   <>
              //     <Radio.Group onChange={onChange} defaultValue="a">
              //       <Radio.Button value="a">All</Radio.Button>
              //       <Radio.Button value="b">Accepted</Radio.Button>
              //     </Radio.Group>
              //   </>
              // }
            >
            <div style={{marginLeft: "26px"}}>
            <Space size="middle" direction="horizontal">
              <label>From Date</label>
              <DatePicker 
                  defaultValue={moment(new Date(new Date().setMonth(new Date().getMonth() - 1)))}
                  allowClear={false} 
                  onChange={fromDateChangeHandler} />
              <label>To Date</label>
              <DatePicker 
                  defaultValue={moment()}
                  allowClear={false} 
                  onChange={toDateChangeHandler}/>  
              <div>
                  <Button type="primary" onClick={e => { e.stopPropagation(); onSubmit(pagination.current, pagination.pageSize)}}>Submit</Button>
              </div> 

                  <Button onClick={e => { e.stopPropagation(); getCSVFile()}}>Download CSV</Button> 
            </Space>  
            </div><br/><br/>

              <div className="table-responsive">
                <Table
                  columns={columns}
                  dataSource={records}
                  pagination={tablePagination}
                  onChange={pageChangeHandler}
                  className="ant-border-space"
                  // total={count}
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
