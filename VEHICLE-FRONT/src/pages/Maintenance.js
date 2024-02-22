import React, { useRef } from 'react';
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
import { main } from '@popperjs/core';
import moment from 'moment';
import { getPlatformSuccess } from '../Actions/MaintenanceActions';


export default function Maintenance() {

  const maintenanceData = useSelector(state => state.AdminReducer.Maintenance);
  const selectedAdmin = useSelector(state => state.AdminReducer.selectedDriver);
  const visible = useSelector(state => state.AdminReducer.visible);
  const isLoading = useSelector(state => state.AdminReducer.loading);
  const [Visible, setVisible] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalVisible3, setIsModalVisible3] = useState(false);
  const [FirstName, setFirstName] = useState();
  const [LastName, setLastName] = useState();

  //image required fields
  const [File, setFile] = useState(null);
  const object = useRef(null);

  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [Password, setPassword] = useState();
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [data1, setData1] = useState([]);
  const [SearchData, setSearchData] = useState([]);
  const [Name, setName] = useState('');
  const [AdminName, setAdminName] = useState('');
  const [OldPassword, setOldPassword] = useState('');
  const [NewPassword, setNewPassword] = useState('');
  const [ConfirmPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = event => {
    object.current.click();
  };

    const handleChange1 = event => {
    setFile(event.target.files[0]);
  };

  //table columns
  const columns = [
    {
      title: 'Start Date',
      dataIndex: 'startDate',
      key: 'startDate',
      render: (text, record) => (
        <Space size="middle">
          <span>{
          moment(record?.startDate).format('YYYY-MM-DD')}</span>
        </Space>
      ),
    },
    {
      title: 'End Date',
      dataIndex: 'endDate',
      key: 'endDate',
      render: (text, record) => (
        <Space size="middle">
      <span>{moment(record?.endDate).format('YYYY-MM-DD')}</span> 
       </Space>
      ),
    },
    {
      title: 'Vehicle',
      dataIndex: 'vehicle',
      key: 'vehicle',
      width: '10%',
    },
    {
      title: 'Parts',
      dataIndex: 'parts',
      key: 'parts',
      width: '10%'
    },
      
    // {
    //   title: 'Last Used',
    //   dataIndex: 'lastUsedAppAt',
    //   key: 'lastUsedAppAt',
    //   render: (text, record) => (
    //     <span>{moment(record?.lastUsedAppAt).format('DD/MMM/YYYY')}</span>
    //   ),
    // }
    // ,
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <p
            onClick={() => {
              setIsModalVisible3(true);
              // deleteAdminHandler(dispatch, record?.adminCode);
            }}
          >
            <Icon icon="ant-design:delete-filled" width="20" />
          </p>
        </Space>
      ),
    },
  ];

    //method section starts
    const handleOk = () => {
      setIsModalVisible(false);
    };
  
    const handleCancel = () => {
      setIsModalVisible(false);
    };
  
    const handleOk3 = () => {
      setIsModalVisible3(false);
    };
  
    const handleCancel3 = () => {
      setIsModalVisible3(false);
    };
  
    const handleChange = evt => {
      const value = evt;
      setName(value);
    };
    //method section ends

    //useEffect section starts
  useEffect(() => {
    if (SearchData === 'not found') {
      failureNotifier('not found');
    }
    if (SearchData?.length === 0) {
      // console.log("not found")
      setData(maintenanceData);
      setData1(maintenanceData);
    } else if (SearchData?.length >= 1 && SearchData[0] !== undefined) {
      setData(SearchData);
      setData1([]);
    } else {
      setData(maintenanceData);
    }
  }, [maintenanceData, SearchData]);

  
  useEffect(() => {
    if (selectedAdmin) {
      setStartDate(selectedAdmin?.startDate);
      setEndDate(selectedAdmin?.endDate);
    }
  }, [selectedAdmin]);

  useEffect(() => {
    if (maintenanceData?.length >= 0) {
      setData(maintenanceData);
    }
  }, []);

  useEffect(() => {
    loadMoreData(
      page,
      pageSize,
      setPage,
      loading,
      setLoading,
      'user/maintenance/',
      data,
      setData,
      setData1,
      dispatch,
      getPlatformSuccess,
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
            <Table columns={columns} dataSource={data.length > 0 ? maintenanceData : []} pagination={false} />
          </InfiniteScroll>
        )}
        <Modal
          title={`Add New Maintenance order`}
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
                registerAdminHandler(
                  FirstName,
                  LastName,

                  Password,
                  dispatch
                );
              }}
            >
              <div>.
                <Form.Item label="Profile">
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      width: '100%',
                    }}
                  >
                    <div style={{ width: '50%' }}>
                      <Input value={File?.name} required disabled />
                    </div>
                    <div>
                      <Icon
                        icon="el:upload"
                        width="24"
                        color="gray"
                        onClick={handleClick}
                      />
                      <input
                        ref={object}
                        type="file"
                        style={{ display: 'none' }}
                        onChange={handleChange1}
                      />
                    </div>
                  </div>
                </Form.Item>
                <Form.Item label="Start Date">
                  <Input
                    placeholder="startDate"
                    value={startDate}
                    onChange={e => setStartDate(e.target.value)}
                    type="date"
                    required
                  />
                </Form.Item>
                <Form.Item label="End Date">
                  <Input
                    placeholder="endDate"
                    value={endDate}
                    onChange={e => setEndDate(e.target.value)}
                    type="Date"
                    required
                  />
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
          title={`Change Password`}
          visible={Visible}
          // onOk={handleOk}
          onCancel={dispatch(closeVisible())}
          maskClosable={false}
          footer={null}
        >
          <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }}
            onFinish={() => {
              if (NewPassword !== ConfirmPassword) {
                failureNotifier('password not match');
              } else {
                changePasswordHandler(
                  AdminName,
                  OldPassword,
                  NewPassword,
                  ConfirmPassword
                );
              }
            }}
            autoComplete="off"
          >
            <div
              style={{
                width: '400px',
                position: 'relative',
                marginLeft: '20px',
                marginBottom: '20px',
              }}
            >
              <Form.Item label="ManagerName">
                <Input
                  placeholder="ManagerName"
                  value={AdminName}
                  onChange={e => setAdminName(e.target.value)}
                  type="text"
                  required
                />
              </Form.Item>
              <Form.Item label="Old Password">
                <Input
                  placeholder="old password"
                  value={OldPassword}
                  onChange={e => setOldPassword(e.target.value)}
                  type="text"
                  required
                />
              </Form.Item>
              <Form.Item label="New Password">
                <Input
                  placeholder="new password"
                  value={NewPassword}
                  onChange={e => setNewPassword(e.target.value)}
                  type="text"
                  required
                />
              </Form.Item>
              <Form.Item label="Confirm Password">
                <Input
                  placeholder="confirm password"
                  value={NewPassword}
                  onChange={e => setNewPassword(e.target.value)}
                  type="text"
                  required
                />
              </Form.Item>
            </div>
            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
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
      </Container>
    </Page>
  );
}
