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
} from 'antd';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setCampaign,
  getCampaignSuccess,
  addCampaign,
} from '../Actions/OrderAction';
import '../styles/user.css';
import { failureNotifier } from '../utils/notifications';
import {
  updateAdminHandler,
  deleteAdminHandler,
} from '../utils/HandlerFunctions/AdminHandler';
import moment from 'moment';
import { Icon } from '@iconify/react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useNavigate } from 'react-router-dom';

// importing our common search and load more data methods from utils
import { SearchHandler } from '../utils/HandlerFunctions/SearchHandler';
import { loadMoreData } from '../utils/HandlerFunctions/LoadMoreDataHandler';

const { Panel } = Collapse;
export default function Orders() {
  const navigate = useNavigate();
  const campaignData = useSelector(state => state.CampaignReducer.campaigns);
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
  const selectedCampaignDont = useSelector(
    state => state.CampaignReducer.selectedCampaignDont
  );
  const selectedCampaignDos = useSelector(
    state => state.CampaignReducer.selectedCampaignDos
  );

  const isLoading = useSelector(state => state.CampaignReducer.loading);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalVisible1, setIsModalVisible1] = useState(false);
  const [isModalVisible2, setIsModalVisible2] = useState(false);
  const [AdminName, setAdminName] = useState(selectedOrder?.username);
  const [AdminEmail] = useState(selectedOrder?.email);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [data1, setData1] = useState([]);
  const [SearchData, setSearchData] = useState([]);
  const [Name, setName] = useState('');
  const dispatch = useDispatch();
  const [status, setStatus] = useState({
    bool1: false,
    bool2: false,
  });

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
        <span>{moment(record?.startDate).format('DD/MMM/YYYY')}</span>
      ),
    },
    {
      title: 'End Date',
      dataIndex: 'returnDate',
      key: 'returnDate',
      render: (text, record) => (
        <span>{moment(record?.endDate).format('DD/MMM/YYYY')}</span>
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
      title: 'Distance',
      dataIndex: 'distance',
      key: 'distance',
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
            // dispatch(setAdmin(values1,record?._id))
             setIsModalVisible(true)
            }}><Icon icon="akar-icons:edit" width="20" /></a>
          <a onClick={()=>{
          setIsModalVisible1(true)
            // dispatch(setAdmin(values1,record?._id))
            }}><Icon icon="ant-design:delete-filled" width="20" /></a>
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
  const columns2 = [
    {
      title: 'PlatformName',
      dataIndex: 'platformName',
      key: 'platformName',
      render: (text, record) => (
        <Space size="middle">
          <span>{record?.platformName}</span>
        </Space>
      ),
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Logo',
      dataIndex: 'Logo',
      key: 'Logo',
      render: (text, record) => {
        return (
          <span>
            <Image
              src={record?.logo}
              style={{ width: '100%', height: '25%' }}
            />
          </span>
        );
      },
      width: '2%',
    },
    {
      title: 'Background',
      dataIndex: 'Background',
      key: 'Background',
      render: (text, record) => {
        return (
          <span>
            <Image
              src={record?.background}
              style={{ width: '100%', height: '25%' }}
            />
          </span>
        );
      },
      width: '2%',
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
      title: 'id',
      dataIndex: 'id',
      key: 'id',
      render: (text, record) => (
        <Space size="middle">
          <span>{record?.id}</span>
        </Space>
      ),
    }, {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => (
        <Space size="middle">
          <span>{record?.firstName} {record?.lastName} </span>
        </Space>
      ),
    },
    {
      title: 'Mobile no.',
      dataIndex: 'mobile',
      key: 'mobile',
    },
    {
      title: 'Email Id',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
      render: (text, record) => (
        <Space size="middle">
          <span>
            {record?.address?.street}
            {record?.address?.address}
            {record?.address?.pincode?.pincode}
            </span>
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

  const handleChange = evt => {
    const value = evt;
    setName(value);
  };
  const onCheckChange1 = () => {
    setStatus({ bool1: true, bool2: false });
  };
  const onCheckChange2 = () => {
    setStatus({ bool1: false, bool2: true });
  };

  //useEffect section
  // useEffect(() => {
  //   if (SearchData === 'not found') {
  //     failureNotifier('not found');
  //   }
  //   if (SearchData?.length === 0) {
  //     setData(campaignData);
  //     setData1(campaignData);
  //     setLoading(false);
  //   } else if (SearchData?.length >= 1 && SearchData[0] !== undefined) {
  //     setData(SearchData);
  //     setData1([]);
  //     setLoading(false);
  //   } else {
  //     setData(campaignData);
  //     setLoading(false);
  //   }
  // }, [campaignData, SearchData]);

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
      'campaign',
      data,
      setData,
      setData1,
      dispatch,
      getCampaignSuccess,
      navigate
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
          title={`Edit ${selectedOrder?.username}`}
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
          maskClosable={false}
        >
          <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }}
            onFinish={() =>
              updateAdminHandler(
                AdminName,
                AdminEmail,
                status.bool1,
                selectedOrder?._id
              )
            }
            //   onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Input
              value={AdminName}
              onChange={e => setAdminName(e.target.value)}
              required
            />
            <Input value={AdminEmail} required />
            <Checkbox checked={status.bool1} onChange={onCheckChange1}>
              Activate
            </Checkbox>
            <Checkbox checked={status.bool2} onChange={onCheckChange2}>
              Deactivate
            </Checkbox>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form>
        </Modal>
        <Modal
          title={`delete ${selectedOrder?.username} `}
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
            onFinish={() => deleteAdminHandler(selectedOrder?._id)}
            autoComplete="off"
          >
            <Input value={AdminName} required />
            <Input value={AdminEmail} required />
            <Button type="danger" htmlType="submit">
              delete
            </Button>
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
              {/* {selectedCampaignContributors?.map(data => (
                <div>{data}</div>
              ))} */}
            </Panel>
            <Panel header="Manager" key="4">
              {selectedCampaignDos?.map(data => (
                <div>{data?.message}</div>
              ))}
            </Panel>
            <Panel header="Rating" key="5">
              {selectedCampaignDont?.map(data => (
                <div>{data?.message}</div>
              ))}
            </Panel>
          </Collapse>
        </Modal>
      </Container>
    </Page>
  );
}
