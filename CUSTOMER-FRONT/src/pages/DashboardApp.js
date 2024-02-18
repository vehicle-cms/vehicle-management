// material
import '../App.css';
import { Box, Grid, Container, Typography, Button } from '@mui/material';
import { Modal, DatePicker, Checkbox, Skeleton, Select } from 'antd';
import { Workbook } from 'exceljs';
import Page from '../components/Page';
import * as fs from 'file-saver';
import {
  AppWidgetSummary1,
  AppWidgetSummary2,
  AppWidgetSummary3,
  AppWidgetSummary4,
  AppWidgetSummary5,
  AppWidgetSummary6,
  AppWidgetSummary7,
  AppWidgetSummary8,
  AppWidgetSummary9,
  AppWidgetSummary10,
} from '../sections/@dashboard/app';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { GetCounts } from '../Actions/ManagerActions';
import moment from 'moment';
import { useSelector } from 'react-redux';
import { GetOrderDetail } from '../utils/HandlerFunctions/MemerHandler';
import { emptyReportData } from '../Actions/VehicleActions';
import LoadOptions from '../utils/HandlerFunctions/loadOptions';
// ----------------------------------------------------------------------
// importing our common search and load more data methods from utils
import { loadMoreData } from '../utils/HandlerFunctions/LoadMoreDataHandler';
import { getCampaignSuccess } from '../Actions/OrderAction';
import { useNavigate } from 'react-router-dom';
import { AsyncPaginate } from 'react-select-async-paginate';
import VehicleCard from '../components/Card';

const { RangePicker } = DatePicker;
const dateFormat = 'MMMM Do YYYY';

export default function DashboardApp() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [date1, setDate1] = useState(new Date());
  const [date2, setDate2] = useState(new Date());
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [data1, setData1] = useState([]);
  const [checked, setChecked] = useState(false);
  const [checked1, setChecked1] = useState(false);
  const [SearchData, setSearchData] = useState([]);
  const [options, setOptions] = useState([]);
  //  const selectedOrder = useSelector(
  //   state => state.CampaignReducer.selectedCampaign
  // );

  const [vehicles, setVehicles] = useState([]);
  useEffect(() => {
    // Fetch data from the specific API endpoint
    fetch('http://localhost:8080/vehicles/active')
      .then(response => response.json())
      .then(data => setVehicles(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);


  useEffect(() => {
    const data = {
      options: {
        chart: {
          id: 'date',
        },
        xaxis: {
          categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999],
        },
      },
      series: [
        {
          name: 'orders',
          data: [30, 40, 45, 50, 49, 60, 70, 91],
        },
      ],
    };

    setOptions(data);
  }, []);

  const [value, setValue] = useState({
    value: 0,
    label: 'All Orders',
    code: 'All Orders',
  });
  const reportData = useSelector(state => state.MemerReducer.reportData);

  const disabledDate = current => {
    return (
      moment().add(-1, 'days') <= current ||
      moment().add(-365, 'days') >= current
    );
  };

  const onChange1 = e => {
    setDate1(moment(e[0]?._d));
    setDate2(moment(e[1]?._d));
  };

  const onChange2 = e => {
    setChecked(e.target.checked);
    setChecked1(false);
  };
  const onChange3 = e => {
    setChecked1(e.target.checked);
    setChecked(false);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const onChange = event => {
    // console.log(event);
    setValue({ value: event?.value, label: event?.label, code: event?.code });
  };

  const GenerateCsvFile = () => {
    GetOrderDetail(dispatch, value?.code, date1, date2);
  };

  const GenerateCsvFile1 = () => {
    let workbook = new Workbook();

    let worksheet1 = workbook.addWorksheet('Campaigns Report');
    const campaignHeaders = [
      'Order_id',
      'BookingDate',
      'ReturnDate',
      'Status',
      'Fare',
      'Distance',
    ];

    

    worksheet1.addRow(campaignHeaders);
    reportData.forEach(d => {
      // d?.Campaigns?.platform.forEach(d1 => {
        worksheet1.addRow([
             d?.id,
             d?.bookingDate,
             d?.returnDate,
             d?.status,
             d?.fare,
              d?.distance
      //     moment(d?.updatedAt).format('MMMM Do YYYY'),
        ]);
      });
    // });

    var fileName =
      moment(date1).format('MMMM Do YYYY') +
      '-' +
      moment(date2).format('MMMM Do YYYY');
    workbook.xlsx.writeBuffer().then(data => {
      let blob = new Blob([data], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });
      fs.saveAs(blob, fileName + '-' + new Date().getTime() + '.xlsx');
    });
    dispatch(emptyReportData());
  };

  useEffect(() => {
    dispatch(GetCounts());
  }, []);

  useEffect(() => {
    if (reportData?.length > 0) {
      GenerateCsvFile1();
    }
  }, [reportData]);

  useEffect(() => {
    const currentDate = new Date();
    if (checked) {
      const weekDate = moment(currentDate, 'MMMM Do YYYY').add(-7, 'days');
      setDate1(weekDate?._d);
      setDate2(moment(currentDate, 'MMMM Do YYYY').add(-1, 'days')._d);
      setChecked1(false);
    } else if (checked1) {
      const monthDate = moment(currentDate, 'MMMM Do YYYY').add(-30, 'days');
      setDate1(monthDate?._d);
      setDate2(moment(currentDate, 'MMMM Do YYYY').add(-1, 'days')?._d);
      setChecked(false);
    } else {
      setDate1(moment(currentDate));
      setDate2(moment(currentDate));
    }
  }, [checked, checked1]);

  useEffect(() => {
    loadMoreData(
      page,
      pageSize,
      setPage,
      loading,
      setLoading,
      'campaign',
      data,
      setData,
      setData1,
      dispatch,
      getCampaignSuccess,
      navigate
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);
  

  
  useEffect(() => {
    if (SearchData?.length === 0) {
      setData(data);
      setData1(data);
      setLoading(false);
    } else if (SearchData?.length >= 1 && SearchData[0] !== undefined) {
      setData(SearchData);
      setData1([]);
      setLoading(false);
    } else {
      setData(data);
      setLoading(false);
    }
  }, [data, SearchData]);
  
  return (
    <Page title="VMS">
      <Container maxWidth="xl">
        <Box sx={{ pb: 5 }} style={{ display: 'flex' }}>
          <div style={{ width: '80%' }}>
            <Typography variant="h4">
              Book Now{' '}
            </Typography>
          </div>
        </Box>
        
        <Grid container spacing={3}>
          {vehicles?.map((vehicle) => (
            <Grid item key={vehicle.id} xs={12} sm={4} md={4}>
              {/* Use the VehicleCard component */}
              <VehicleCard
               vehicle={vehicle}
              />
            </Grid>
          ))}
        </Grid>


        
        <Modal
          title={`Generate Report`}
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
          maskClosable={false}
          footer={false}
          width="60%"
        >
          <div
            style={{
              display: 'flex',
              alignItem: 'centre',
              justifyContent: 'centre',
            }}
          >
            <AsyncPaginate
              value={value}
              loadOptions={LoadOptions}
              onChange={e => onChange(e)}
              additional={{
                page: 1,
              }}
              className="css-b62m3t-container"
            />
            <div
              style={{
                marginLeft: '50px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <RangePicker
                value={[moment(date1, dateFormat), moment(date2, dateFormat)]}
                disabledDate={disabledDate}
                format={dateFormat}
                onChange={onChange1}
              />
            </div>
            <div
              style={{
                marginLeft: '50px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Checkbox checked={checked} onChange={onChange2}>
                Weekly
              </Checkbox>
              <Checkbox checked={checked1} onChange={onChange3}>
                Monthly
              </Checkbox>
            </div>
          </div>
          <br></br>
          <div
            style={{
              height: '50px',
              margin: '0 auto',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'centre',
            }}
          >
            <Button onClick={() => GenerateCsvFile()}>Generate</Button>
          </div>
        </Modal>
      </Container>
    </Page>
  );
}
