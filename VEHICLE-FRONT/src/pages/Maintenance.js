import React,{ useRef }  from 'react';
import { Container } from '@mui/material';
import Page from '../components/Page';
import {
  Table,
  Input,
  Modal,
  Form,
  Image,
  Skeleton,
  AutoComplete,
  Spin,
  Button,
  Space,
  Collapse,
  DatePicker,
  Select,
  Radio
} from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getAdminSuccess,
  addAdmin,
  closeVisible,
} from '../Actions/ManagerActions';
import '../styles/user.css';
import { failureNotifier } from '../utils/notifications';
import {
  registerAdminHandler,
  changePasswordHandler,
  deleteAdminHandler,
} from '../utils/HandlerFunctions/AdminHandler';
import { useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
import InfiniteScroll from 'react-infinite-scroll-component';

// importing our common search and load more data methods from utils
import { SearchHandler } from '../utils/HandlerFunctions/SearchHandler';
import { loadMoreData } from '../utils/HandlerFunctions/LoadMoreDataHandler';
import moment from 'moment';
import { setPlatform } from '../Actions/MaintenanceActions';
import { UpdateMaintenance, createMaintenance } from '../utils/HandlerFunctions/MaintenanceHandler';

const { Panel } = Collapse;

export default function Maintenance() {

  const userData = useSelector(state => state.AdminReducer.admins);
  const selectedAdmin = useSelector(state => state.AdminReducer.selectedAdmin);
  const visible = useSelector(state => state.AdminReducer.visible);
  const isLoading = useSelector(state => state.AdminReducer.loading);
  const [status,setStatus] = useState(false);
  const [vehicle,setVehicle] = useState();
  const [Visible, setVisible] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalVisible3, setIsModalVisible3] = useState(false);
  const [isModalVisible2, setIsModalVisible2] = useState(false);
  const [isModalVisible4, setIsModalVisible4] = useState(false);

  //image required fields

  const Option = Select.Option;


  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [data1, setData1] = useState([]);
  const [SearchData, setSearchData] = useState([]);
  const [Name, setName] = useState('');
  const [date1, setDate1] = useState(new Date());
  const [date2, setDate2] = useState(new Date());
  const [Ids,setIds] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
   const platforms = useSelector(
    state => state.PlatformReducer.platform
  );

 const vehicles = useSelector(
    state => state.MemerReducer.memers
  );
  const parts = useSelector(
    state => state.PlatformReducer.parts
  );
    const selectedPlatform = useSelector(
    state => state.PlatformReducer.selectedPlatform
  );


  //table columns
  const columns = [
    {
      title: 'Id',
      dataIndex: 'id',
      key: 'id',
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
       render: (text, record) => (
        <Space size="middle">
          {(record?.status)?"UNDER MAINTENANCE":"COMPLETED"}
        </Space>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'total',
      key: 'total',
       render: (text, record) => (
        <Space size="middle">
          {(record?.status==false)?record?.total:"-"}
        </Space>
      ),
    },
    {
      title: 'Parts',
      dataIndex: 'show',
      key: 'show',
      render: (text, record) => (
        <Space>
          <p
            onClick={() => {
              setIsModalVisible2(true);
              dispatch(setPlatform(record?.id));
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
      render: (text, record) => (
        <Space size="middle">
          <p
            onClick={() => {
              dispatch(setPlatform(record?.id));
              setIsModalVisible4(true);
            }}
          >
            <Icon icon="akar-icons:edit" width="20" />
          </p>
          {/* <p
            onClick={() => {
              setIsModalVisible3(true);
              // deleteAdminHandler(dispatch, record?.adminCode);
            }}
          >
            <Icon icon="ant-design:delete-filled" width="20" />
          </p> */}
        </Space>
      ),
    },
  ];


  const columns1 = [
       {
      title: 'Id',
      dataIndex: 'id',
      key: 'id',
    }, {
      title: 'name',
      dataIndex: 'name',
      key: 'name',
    }, {
      title: 'price',
      dataIndex: 'price',
      key: 'price',
    }

  ]

  //method section starts
  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
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

  const handleCancel3 = () => {
    setIsModalVisible3(false);
  };
  const handleOk4 = () => {
    setIsModalVisible4(false);
  };

  const handleCancel4 = () => {
    setIsModalVisible4(false);
  };
  const handleChange = evt => {
    const value = evt;
    setName(value);
  };

  //useEffect section starts
  useEffect(() => {
    if (SearchData === 'not found') {
      failureNotifier('not found');
    }
    if (SearchData?.length === 0) {
      // console.log("not found")
      setData(userData);
      setData1(userData);
    } else if (SearchData?.length >= 1 && SearchData[0] !== undefined) {
      setData(SearchData);
      setData1([]);
    } else {
      setData(userData);
    }
  }, [userData, SearchData]);

  useEffect(() => {
    if (selectedPlatform) {
      setStatus(selectedPlatform?.status);
      // setLastName(selectedAdmin?.lastName);
      // setEmail(selectedAdmin?.email);
      // setPhoneNo(selectedAdmin?.phoneNo);
    }
  }, [selectedPlatform]);

  useEffect(() => {
    if (userData?.length >= 0) {
      setData(userData);
    }
  }, []);

  useEffect(() => {
    loadMoreData(
      page,
      pageSize,
      setPage,
      loading,
      setLoading,
      'admin',
      data,
      setData,
      setData1,
      dispatch,
      getAdminSuccess,
      navigate
    );
  }, []);

  useEffect(() => {
    setVisible(visible);
  }, [visible]);
  //useEffect section ends

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
            <h3 style={{ margin: '1rem' }}>Dashboard/Page/Maintenance</h3>
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
                onKeyPress={event => {
                  if (event.key === 'Enter') {
                    SearchHandler(
                      setSearchData,
                      setLoading,
                      Name,
                      'admin',
                      addAdmin,
                      dispatch,
                      navigate
                    );
                  }
                }}
                placeholder="find manager..."
                name={Name}
                onChange={handleChange}
              />

              <Button
                onClick={() =>
                  SearchHandler(
                    setSearchData,
                    setLoading,
                    Name,
                    'admin',
                    addAdmin,
                    dispatch,
                    navigate
                  )
                }
                style={{
                  color: '#ffffff',
                  background: '#21c980',
                  marginRight: '10px',
                }}
              >
                Search
              </Button>
            </Input.Group>
            <Button onClick={() => setIsModalVisible(true)}>+</Button>
          </div>
        </div>
        {isLoading ? (
          <div className="example">
            <Spin />
          </div>
        ) : (
          <InfiniteScroll
            dataLength={data?.length}
            next={() =>
              loadMoreData(
                page,
                pageSize,
                setPage,
                loading,
                setLoading,
                'admin',
                data,
                setData,
                setData1,
                dispatch,
                getAdminSuccess,
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
            <Table columns={columns} dataSource={data.length > 0 ? platforms : []} pagination={false} />
          </InfiniteScroll>
        )}
        <Modal
          title={`Add New Maintenance`}
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
          maskClosable={false}
          width="40%"
          footer={null}
        >
          <div
            style={{
              margin: '1rem',
            }}
          >
            <Form
              name="basic"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              initialValues={{ remember: true }}
              layout="horizontal"
              onFinish={() => {
                createMaintenance(
                  vehicle,
                  Ids,
                  dispatch
                );
              }}
            >
              <div>
                <Form.Item label="Vehicle">
                <Select name="Vehicle"
                   value={vehicle}
                    onChange={(e)=>
                      {
                        setVehicle(e)
                      }}
                    style={{color:"blue"}}
                    >
                      {vehicles?.map(m =>
                        {
                          if(m.status==='ACTIVE'){
                           return   <Option value={m?.id}>{m?.name}</Option>
                          }
                        })
                      }
                  </Select>
                  </Form.Item>
                <Form.Item label="Parts">
                  <Select
                   mode="multiple"
                   name="Parts"
                   value={Ids}
                    onChange={(e)=>
                      {
                        console.log(e)
                        setIds(e)
                      }}
                    style={{color:"blue"}}
                    >
                      {parts?.map(m =><Option value={m?.id}>{m?.name} - {m?.price}</Option>)
                      }
                  </Select>
                </Form.Item>
              </div>
              <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </div>
        </Modal>
         <Modal
          title={`Update Maintenance`}
          visible={isModalVisible4}
          onOk={handleOk4}
          onCancel={handleCancel4}
          maskClosable={false}
          width="40%"
          footer={null}
        >
          <div
            style={{
              margin: '1rem',
            }}
          >
            <Form
              name="basic"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              initialValues={{ remember: true }}
              layout="horizontal"
              onFinish={() => {
                UpdateMaintenance(
                  selectedPlatform?.id,
                  status,
                  Ids,
                  dispatch
                );
              }}
            >
              <div>
                <Form.Item label="status">
                     <Radio.Group onChange={(e)=>{
                      setStatus(e.target.value)
                      }} value={status}>
                        <Radio value={true}>UNDER MAINTENANCE</Radio>
                        <Radio value={false}>COMPLETED</Radio>
                      </Radio.Group>
                </Form.Item>
                <Form.Item label="Parts">
                  <Select
                   mode="multiple"
                   name="Parts"
                   value={Ids}
                    onChange={(e)=>
                      {
                        setIds(e)
                      }}
                    style={{color:"blue"}}
                    >
                      {parts?.map(m =><Option value={m?.id}>{m?.name} - {m?.price}</Option>)
                      }
                  </Select>
                </Form.Item>
              </div>
              <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </div>
        </Modal>
        <Modal
          title={`Delete Admin`}
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
              deleteAdminHandler(dispatch, selectedAdmin?.adminCode)
            }
            autoComplete="off"
          >
            <span>Are you sure you want to delete?</span>
            <br></br>
            <br></br>
            <Button type="danger" htmlType="submit">
              delete
            </Button>
          </Form>
        </Modal>
         <Modal
          title={`Parts`}
          visible={isModalVisible2}
          onOk={handleOk2}
          onCancel={handleCancel2}
          maskClosable={false}
          footer={null}
          width="50%"
        >
          <Collapse accordion>
            <Panel header="Parts" key="1">
              <Table
                columns={columns1}
                dataSource={selectedPlatform?.parts}
                pagination={false}

              />
            </Panel>
          </Collapse>
        </Modal>
      </Container>
    </Page>
  );;
}
