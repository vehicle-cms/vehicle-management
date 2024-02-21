import React from 'react';
import { Container } from '@mui/material';
import Page from '../components/Page';
import {
  Table,
  Input,
  Modal,
  Form,
  Checkbox,
  Skeleton,
  AutoComplete,
  Spin,
  Button,
  Space,
  Image,
  Collapse,
  Select,
} from 'antd';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setCampaign,
  getCampaignSuccess,
  addCampaign,
} from '../Actions/OrderAction';
import '../styles/user.css';
import {
  deleteAdminHandler,
} from '../utils/HandlerFunctions/AdminHandler';
import moment from 'moment';
import { Icon } from '@iconify/react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useNavigate } from 'react-router-dom';

// importing our common search and load more data methods from utils
import { SearchHandler } from '../utils/HandlerFunctions/SearchHandler';
import { loadMoreData } from '../utils/HandlerFunctions/LoadMoreDataHandler';
import { deleteOrderHandler, updateOrderHandler } from '../utils/HandlerFunctions/MemerHandler';
import { failureNotifier } from '../utils/notifications';

const { Panel } = Collapse;
export default function Orders() {
  const navigate = useNavigate();
  const campaignData = useSelector(state => state.CampaignReducer.campaigns);
  const ManagerData = useSelector(state => state.AdminReducer.admins);
  const VehicleData = useSelector(state => state.MemerReducer.memers);
  const driversData = useSelector(state => state.AdminReducer.drivers);
  const Option = Select.Option;

  const selectedOrder = useSelector(
    state => state.CampaignReducer.selectedCampaign
  );
  const selectedCampaignDriver = useSelector(
    state => state.CampaignReducer.selectedCampaignDriver
  );
  const selectedCampaignVehicle = useSelector(
    state => state.CampaignReducer.selectedCampaignVehicle
  );
  const selectedCampaignCustomer = useSelector(
    state => state.CampaignReducer.selectedCampaignCustomer
  );
  const selectedCampaignManager = useSelector(
    state => state.CampaignReducer.selectedCampaignManager
  );
  const selectedCampaignRating = useSelector(
    state => state.CampaignReducer.selectedCampaignRating
  );

  const isLoading = useSelector(state => state.CampaignReducer.loading);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalVisible1, setIsModalVisible1] = useState(false);
  const [isModalVisible2, setIsModalVisible2] = useState(false);
  const [isModalVisible3, setIsModalVisible3] = useState(false);

  const [bookingDate,setBookingDate] =useState(selectedOrder[0]?.bookingDate);
  const [returnDate,setReturnDate] = useState(selectedOrder[0]?.returnDate);
  const [fare,setFare] = useState(0);
  const [distance,setDistance] = useState(0);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [data1, setData1] = useState([]);
  const [SearchData, setSearchData] = useState([]);
  const [Name, setName] = useState('');
  const [driver,setDriver] = useState(0);
  const [status, setStatus] = useState("")
  const [manager,setManager] = useState(0);

  const dispatch = useDispatch();

  const onChangeStatus = (value) => {
      setStatus(value);
  };


const onSearchStatus = (value) => {
  console.log('search:', value);
};

  const columns = [
    {
      title: 'OrderId',
      dataIndex: 'id',
      key: 'id',
      render: text => <p>{text}</p>,
    },
    {
      title: 'Start Date',
      dataIndex: 'bookingDate',
      key: 'bookingDate',
      render: (text, record) => (
        <span>
          {
          moment(record?.bookingDate).format('YYYY-MM-DD')
          }</span>
      ),
    },
    {
      title: 'End Date',
      dataIndex: 'returnDate',
      key: 'returnDate',
      render: (text, record) => (
        <span>{
          moment(record?.returnDate).format('YYYY-MM-DD')}</span>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Order Value',
      dataIndex: 'fare',
      key: 'fare',
    },
    {
      title: 'Details',
      dataIndex: 'show',
      key: 'show',
      render: (text, record) => (
        <Space>
          <p
            onClick={() => {
              setIsModalVisible2(true);
              dispatch(setCampaign(record?.id));
            }}
          >
            <Icon icon="bi:info-circle-fill" width={20} />
          </p>
        </Space>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (text,record) => (
        <Space size="middle">
          <a onClick={()=>{
             dispatch(setCampaign(record?.id))
             setIsModalVisible1(true)
            }}>
              <Icon icon="akar-icons:edit" width="20" /></a>
          <a onClick={()=>{
             dispatch(setCampaign(record?.id))
          setIsModalVisible3(true)
            // dispatch(setAdmin(values1,record?._id))
            }}>
              <Icon icon="ant-design:delete-filled" width="20" /></a>
        </Space>
      ),
    },
  ];

  const columns1 = [
     {
      title: 'id',
      dataIndex: 'id',
      key: 'id',
    },{
      title: 'Picture',
      dataIndex: 'imageUrl',
      key: 'imageUrl',
      render: (text, record) => (
        <Space size="middle">
          <Image src={record?.imageUrl} />
        </Space>
      ),
      width: '5%',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => (
        <Space size="middle">
          <span>{record?.name}</span>
        </Space>
      ),
    },
    {
      title: 'Number',
      dataIndex: 'vehicleNumber',
      key: 'vehicleNumber',
    },
    {
      title: 'registration',
      dataIndex: 'registration',
      key: 'registration',
    },
    {
      title: 'Fuel Type',
      dataIndex: 'fuelType',
      key: 'fuelType',
    },
    {
      title: 'ratePerDay',
      dataIndex: 'ratePerDay',
      key: 'ratePerDay',
    },
    // {
    //   title: 'Vendor',
    //   dataIndex: 'vendor',
    //   key: 'vendor',
    // },
    {
      title: 'Mileage',
      dataIndex: 'mileage',
      key: 'mileage',
    },
    {
      title: 'Active',
      dataIndex: 'status',
      key: 'status',
      // render: (text, record) => {
      //   return (
      //     <Radio.Group
      //       name="radiogroup"
      //       value={record?.isNotActive}
      //       onChange={e =>
      //         updateStatus(
      //           navigate,
      //           dispatch,
      //           record?.memerrCode,
      //           e.target.value
      //         )
      //       }
      //     >
      //       <Radio value={false}>YES</Radio>
      //       <Radio value={true}>NO</Radio>
      //     </Radio.Group>
      //   );
      //   //  (record?.isNotActive)?"no":"yes"
      // },
    },
  ];

  const columns3 = [
    {
      title: 'Picture',
      dataIndex: 'imageURL',
      key: 'imageURL',
      render: (text, record) => (
        <Space size="middle">
          <Image src={record?.imageURL} />
        </Space>
      ),
      width: '10%',
    },
    {
      title: 'username',
      dataIndex: 'firstName',
      key: 'firstName',
      render: (text, record) => (
        <Space size="middle">
          <span>
            {record?.firstName} {record?.lastName}
          </span>
        </Space>
      ),
    },
    {
      title: 'email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'phoneNo',
      dataIndex: 'mobile',
      key: 'mobile',
    }
  ];

   const columns4 = [
    {
      title: 'Picture',
      dataIndex: 'imageURL',
      key: 'imageURL',
      render: (text, record) => (
        <Space size="middle">
          <Image src={record?.imageURL} />
        </Space>
      ),
      width: '10%',
    },
    {
      title: 'username',
      dataIndex: 'firstName',
      key: 'firstName',
      render: (text, record) => (
        <Space size="middle">
          <span>
            {record?.firstName} {record?.lastName}
          </span>
        </Space>
      ),
    },
    {
      title: 'email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'phoneNo',
      dataIndex: 'mobile',
      key: 'mobile',
    }
  ];

   const columns5 = [
    {
      title: 'Picture',
      dataIndex: 'imageURL',
      key: 'imageURL',
      render: (text, record) => (
        <Space size="middle">
          <Image src={record?.imageURL} />
        </Space>
      ),
      width: '10%',
    },
    {
      title: 'username',
      dataIndex: 'firstName',
      key: 'firstName',
      render: (text, record) => (
        <Space size="middle">
          <span>
            {record?.firstName} {record?.lastName}
          </span>
        </Space>
      ),
    },
    {
      title: 'email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'phoneNo',
      dataIndex: 'mobile',
      key: 'mobile',
    }
  ];
  const columns6 = [
    {
      title: 'id',
      dataIndex: 'id',
      key: 'id',
      render: (text, record) => (
        <Space size="middle">
          <span>{record?.id}</span>
        </Space>
      ),
    },
    {
      title: 'Rating',
      dataIndex: 'rating',
      key: 'rating',
      render: (text, record) => (
        <Space size="middle">
          <span>{record?.rating}</span>
        </Space>
      ),
    },
    {
      title: 'Created At',
      dataIndex: 'createdOn',
      key: 'createdOn',
      render: (text, record) => {
        return <span>{moment(record?.createdOn).format('LL')}</span>;
      },
    }
  ];

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleOk1 = () => {
    setIsModalVisible1(false);
  };

  const handleCancel1 = () => {
    setIsModalVisible1(false);
  };
  const handleOk2 = () => {
    setIsModalVisible2(false);
  };

  const handleCancel2 = () => {
    setIsModalVisible2(false);
  };

   const handleOk3 = () => {
    setIsModalVisible3(false);
  };

  const handleCancel3= () => {
    setIsModalVisible3(false);
  };

  const handleChange = evt => {
    const value = evt;
    setName(value);
  };


  //useEffect section
  useEffect(() => {
    if (SearchData === 'not found') {
      failureNotifier('not found');
    }
    if (SearchData?.length === 0) {
      setData(campaignData);
      setData1(campaignData);
      setLoading(false);
    } else if (SearchData?.length >= 1 && SearchData[0] !== undefined) {
      setData(SearchData);
      setData1([]);
      setLoading(false);
    } else {
      setData(campaignData);
      setLoading(false);
    }
  }, [campaignData, SearchData]);

  useEffect(() => {
    if (campaignData?.length >= 0) {
      setData(campaignData);
    }
  }, []);

  useEffect(() => {
    loadMoreData(
      page,
      pageSize,
      setPage,
      loading,
      setLoading,
      'user/order/',
      data,
      setData,
      setData1,
      dispatch,
      getCampaignSuccess,
      navigate
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  useEffect(()=>{
     setDistance(selectedOrder[0]?.id);
     setBookingDate(
      moment(selectedOrder[0]?.bookingDate).format('YYYY-MM-DD')
     );
     setReturnDate(
         moment(selectedOrder[0]?.returnDate).format('YYYY-MM-DD')
     );
     setStatus(selectedOrder[0]?.status);
     setFare(selectedOrder[0]?.fare);
     setDistance(selectedOrder[0]?.distance);
     if(selectedCampaignDriver[0]?.id){
           setDriver(selectedCampaignDriver[0]?.id);
     }
     if(selectedCampaignManager[0]?.id){
         setManager(selectedCampaignManager[0]?.id);
     }
  },[selectedOrder])

  useEffect(() => {
    if (loading) {
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, [loading]);

  return (
    <Page>
      <Container>
        <div
          style={{
            display: 'flex',
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <div style={{ width: '60%' }}>
            <h3 style={{ margin: '1rem' }}>Dashboard/Page/Orders</h3>
          </div>
          <div
            style={{
              width: '40%',
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <Input.Group style={{ display: 'contents' }}>
              <AutoComplete
                style={{ width: '100%', marginRight: '10px' }}
                placeholder="find campaigns..."
                name={Name}
                onKeyPress={event => {
                  if (event.key === 'Enter') {
                    SearchHandler(
                      setSearchData,
                      setLoading,
                      Name,
                      'campaign',
                      addCampaign,
                      dispatch,
                      navigate
                    );
                  }
                }}
                onChange={handleChange}
              />

              <Button
                onClick={() =>
                  SearchHandler(
                    setSearchData,
                    setLoading,
                    Name,
                    'campaign',
                    addCampaign,
                    dispatch,
                    navigate
                  )
                }
                style={{
                  color: '#ffffff',
                  background: '#21c980',
                }}
              >
                Search
              </Button>
            </Input.Group>

          </div>
        </div>
        {isLoading ? (
          <div className="example">
            <Spin />
          </div>
        ) : (
          <InfiniteScroll
            dataLength={data.length}
            next={() =>
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
              )
            }
            hasMore={data1?.length > 0}
            loader={
              data?.length > 10 ? (
                <Skeleton avatar paragraph={{ rows: 1 }} active />
              ) : (
                ''
              )
            }
            scrollableTarget="scrollableDiv"
          >
            <Table columns={columns} dataSource={data} pagination={false} />
          </InfiniteScroll>
        )}
        <Modal
          title={`Edit ${selectedOrder[0]?.id}`}
          visible={isModalVisible1}
          onOk={handleOk1}
          onCancel={handleCancel1}
          maskClosable={false}
        >
           <Form
              name="basic"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              initialValues={{ remember: true }}
              layout="horizontal"
              onFinish={() => {
                 updateOrderHandler(
                  selectedOrder[0]?.id,
                 bookingDate,
                  returnDate,
                  status,
                  fare,
                  distance,
                  selectedCampaignVehicle[0]?.id,
                  selectedCampaignCustomer[0]?.id,
                  driver,
                  manager,
                  dispatch
                );
                setIsModalVisible1(false);
              }}
            >
              <div>
                <Form.Item label="Booking Date">
                  <Input
                    placeholder="bookingDate"
                    value={bookingDate}
                    type="date"
                    required
                  />
                </Form.Item>
                <Form.Item label="Return Date">
                  <Input
                    placeholder="returnDate"
                    value={returnDate}
                    type="date"
                    required
                  />
                </Form.Item>
                      {
                        (selectedOrder[0]?.status === 'PENDING')?
                        <Form.Item label="Status">
                        <Select name="status" value={status}  onChange={(e)=>onChangeStatus(e)}>
                          <Option value='APPROVED'>APPROVED</Option>
                         <Option value='REJECTED'>REJECTED</Option>
                        </Select>
                         </Form.Item>
                        : (selectedOrder[0]?.status === 'APPROVED')?
                        <Form.Item label="Status">
                        <Select  name="status" value={status}  onChange={(e)=>onChangeStatus(e)}>
                           <Option value='COMPLETED'>COMPLETED</Option>
                         <Option value='REJECTED'>CANCEL</Option>
                        </Select>
                        </Form.Item>
                        :null
                     }
                {
              ((selectedOrder[0]?.status === 'APPROVED'))?
              <></>
              :
              <>
                <Form.Item label="Driver">
                  <Select name="Driver"
                   value={driver}
                    onChange={(e)=>
                      {
                        console.log(e)
                        setDriver(e)
                      }}
                    style={{color:"blue"}}
                    >
                      {driversData?.map(m =>
                        {
                          if(!m.assigned){
                           return   <Option value={m?.id}>{m?.firstName} - {m?.lastName}</Option>
                          }
                        })
                      }
                  </Select>
                </Form.Item>
                <Form.Item label="Manager">
                   <Select name="Manager" value={manager}  onChange={(e)=>
                    {
                       console.log(e)
                      setManager(e)
                   }}>
                      {ManagerData?.map(m =>
                        {
                           return   <Option value={m?.id}>{m?.firstName} - {m?.lastName}</Option>
                        })
                      }
                  </Select>
                </Form.Item>
                </>
                }
              </div>
              <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Form>
        </Modal>
        <Modal
          title={`Orders`}
          visible={isModalVisible2}
          onOk={handleOk2}
          onCancel={handleCancel2}
          maskClosable={false}
          footer={null}
          width="50%"
        >
          <Collapse accordion>
            <Panel header="Vehicle" key="1">
              <Table
                columns={columns1}
                dataSource={selectedCampaignVehicle}
                pagination={false}
              />
            </Panel>
            <Panel header="Driver" key="2">
              <Table
                columns={columns3}
                dataSource={selectedCampaignDriver}
                pagination={false}
              />
            </Panel>
            <Panel header="Customer" key="3">
              <Table
                columns={columns4}
                dataSource={selectedCampaignCustomer}
                pagination={false}
              />
            </Panel>
            <Panel header="Manager" key="4">
                 <Table
                columns={columns5}
                dataSource={selectedCampaignManager}
                pagination={false}
              />
            </Panel>
            <Panel header="Rating" key="5">
                <Table
                columns={columns6}
                dataSource={selectedCampaignRating}
                pagination={false}
              />
            </Panel>
          </Collapse>
        </Modal>

         <Modal
          title={`Delete`}
          visible={isModalVisible3}
          onOk={handleOk3}
          onCancel={handleCancel3}
          maskClosable={false}
          footer={false}
        >
          <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }}
            onFinish={() =>
              {
                console.log(selectedOrder[0]?.id)
                deleteOrderHandler(selectedOrder[0]?.id,dispatch)
                setIsModalVisible3(false);
                setPage(0);
                setData1([]);
              }
              }
            autoComplete="off"
          >
            {/* <Input value={AdminName} required /> */}
            {/* <Input value={AdminEmail} required /> */}
            <Button type="danger" htmlType="submit">
              delete
            </Button>
            </Form>
        </Modal>
      </Container>
    </Page>
  );
}
