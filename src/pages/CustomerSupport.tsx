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
  DatePickerProps,
  Space,
  DatePicker,
} from "antd";

import React, { useState, useEffect } from "react";
import axios from 'axios';
import moment from "moment";

// const { Title } = Typography;

// table code start
const columns = [
  {
    title: "SR No",
    dataIndex: "sr_no",
    key: "sr_no",
    // width: "32%",
  },
  {
    title: "Network Order Id",
    dataIndex: "network_order_id",
    key: "network_order_id",
  },
  {
    title: "Name of Buyer NP",
    key: "buyer_np",
    dataIndex: "buyer_np",
  },
  {
    title: "Name of Seller NP",
    key: "seller_np",
    dataIndex: "seller_np",
  },
  {
    title: "Name of Seller",
    key: "seller_name",
    dataIndex: "seller_name",
  },
  {
    title: "Ticket Id",
    key: "ticket_id",
    dataIndex: "ticket_id",
  },
  {
    title: "Issue Category",
    key: "",
    dataIndex: "",
  },
  {
    title: "Issue Details(Buyer Issue)",
    key: "buyer_issue",
    dataIndex: "buyer_issue",
    width: "10%",
  },
  {
    title: "Issue Details(Seller Response)",
    key: "seller_response",
    dataIndex: "seller_response",
  },
  {
    title: "Issue Status",
    key: "issue_status",
    dataIndex: "issue_status",
  },
  {
    title: "Issue Creation Date & Time",
    key: "issue_creation_time",
    dataIndex: "issue_creation_time",
  },
  {
    title: "Latest Seller App Response Date & Time",
    key: "latest_response_time",
    dataIndex: "latest_response_time",
  },
];

function CustomerSupport() {
  let [records, setRecords] = useState();
  let [count, setCount] = useState(0);
  let [tablePagination, setTablePagination] = useState({ total: 10 });
  let [pagination, setPagination] = useState({ current: 1, pageSize: 10 });
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

  useEffect(() => {
    console.log("inside useEffect")
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

  function getRecords(p: number, n: number, fromDate: string, toDate: string) {
    // console.log("p n ", p, n)
    console.log("Inside getRecords", p, n, fromDate, toDate)
    // this.isLoading = true;
    // this.error = null;
    const requestBody = { fromDate: fromDate, toDate: toDate };
    const headers = {
      'Content-Type': 'application/json'
    }
    axios.post(`http://localhost:5003/api/fetchCustomerSupport?page=${p}&records=${n}`, requestBody, { headers: headers, data: requestBody }).then((res) => {
      // this.records = res.data.records.results;
      console.log(res.data.records.results)
      let records = res.data.records.results;
      setRecords(res.data.records.results);
      console.log("records are", records)
      let count = res.data.count;
      setCount(count);
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
  };

  function getCSVFile() {
    const requestBody = { fromDate: formatDate(startDate), toDate: formatDate(endDate) };
    const headers = {
      'Content-Type': 'application/json'
    }
    axios.post(`http://localhost:5003/api/getCustomerSupportCSV`, requestBody, { headers: headers, data: requestBody }).then((res) => {
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
    temp_link.download = "Customer_Support.csv";
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
              />
            </div>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default CustomerSupport;
