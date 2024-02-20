import React from 'react';
import { Container } from '@mui/material';
import Page from '../components/Page';
import {
  Table,
  Input,
  Modal,
  Form,
  Radio,
  Skeleton,
  AutoComplete,
  Spin,
  Button,
  Space,
  Image,
} from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import '../styles/user.css';
import { failureNotifier } from '../utils/notifications';
import {
  getVehiclesSuccess,
  addMemers,
  setMemerrs,
} from '../Actions/VehicleActions';
import { useNavigate } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Icon } from '@iconify/react';
import moment from 'moment';
import {
  updatePrice,
  updateStatus,
} from '../utils/HandlerFunctions/MemerHandler';
import { SearchHandler } from '../utils/HandlerFunctions/SearchHandler';
import { loadMoreData } from '../utils/HandlerFunctions/LoadMoreDataHandler';

export default function Vehicles() {
  const memerData = useSelector(state => state.MemerReducer.memers);
  const selectedMemer = useSelector(state => state.MemerReducer.selectedMemer);
  const selectedMemerTag = useSelector(
    state => state.MemerReducer.selectedMemerTag
  );
  const isLoading = useSelector(state => state.MemerReducer.loading);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalVisible2, setIsModalVisible2] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [data1, setData1] = useState([]);
  const [SearchData, setSearchData] = useState([]);
  const [Name, setName] = useState('');
  const [priceValue, setPriceValue] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const columns = [
    {
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
      render: (text, record) => {
        return (
          <Radio.Group
            name="radiogroup"
            value={record?.isNotActive}
            onChange={e =>
              updateStatus(
                navigate,
                dispatch,
                record?.memerrCode,
                e.target.value
              )
            }
          >
            <Radio value={false}>YES</Radio>
            <Radio value={true}>NO</Radio>
          </Radio.Group>
        );
        //  (record?.isNotActive)?"no":"yes"
      },
    },
    // {
    //   title: 'Disabled',
    //   dataIndex: 'isDisabled',
    //   key: 'isDisabled',
    //   render:(text,record)=>{
    //    return (record?.isDisabled)?"yes":"no"
    //   }
    // },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <p
            onClick={() => {
              dispatch(setMemerrs(record?._id));
              setIsModalVisible2(true);
            }}
          >
            <Icon icon="akar-icons:edit" width="20" />
          </p>
          {/* <a onClick={()=>{
          setIsModalVisible1(true)
            dispatch(setAdmin(values1,record?._id))
            }}><Icon icon="ant-design:delete-filled" width="20" /></a> */}
        </Space>
      ),
    },
  ];

  const columns1 = [
    {
      title: 'name',
      dataIndex: 'name',
      key: 'name',
      width: '5%',
    },
    {
      title: 'description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'createdAt',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (text, record) => {
        return <span>{moment(record?.createdAt).format('LL')}</span>;
      },
    },
  ];
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
      setData(data);
      setData1(data);
      setLoading(false);
    } else if (SearchData?.length >= 1 && SearchData[0] !== undefined) {
      setData(SearchData);
      setData1([]);
      setLoading(false);
    } else {
      setData(memerData);
      setLoading(false);
    }
  }, [memerData, SearchData]);

  useEffect(() => {
    if (memerData?.length >= 0) {
      setData(memerData);
    }
  }, []);

  useEffect(() => {
    loadMoreData(
      page,
      pageSize,
      setPage,
      loading,
      setLoading,
      'vehicles',
      data,
      setData,
      setData1,
      dispatch,
      getVehiclesSuccess,
      navigate
    );
  }, []);

  useEffect(() => {
    setPriceValue(selectedMemer?.price);
  }, [selectedMemer]);

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
            <h3 style={{ margin: '1rem' }}>Dashboard/Page/Vehicles</h3>
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
                      'memedd',
                      addMemers,
                      dispatch,
                      navigate
                    );
                  }
                }}
                placeholder="find Vehicles..."
                name={Name}
                onChange={handleChange}
              />
              <Button
                onClick={() =>
                  SearchHandler(
                    setSearchData,
                    setLoading,
                    Name,
                    'memerr',
                    addMemers,
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
            dataLength={data?.length}
            next={() =>
              loadMoreData(
                page,
                pageSize,
                setPage,
                loading,
                setLoading,
                'memerr',
                data,
                setData,
                setData1,
                dispatch,
                getVehiclesSuccess,
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
            <Table
              columns={columns}
              dataSource={data.length > 0 ? memerData : []}
              pagination={false}
            />
          </InfiniteScroll>
        )}
        <Modal
          title={`Edit`}
          visible={isModalVisible2}
          onOk={handleOk2}
          onCancel={handleCancel2}
          maskClosable={false}
          footer={false}
        >
          <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }}
            layout="horizontal"
            onFinish={() => {
              updatePrice(
                navigate,
                dispatch,
                selectedMemer?.memerrCode,
                priceValue
              );
              handleCancel();
            }}
            autoComplete="off"
          >
            <div
              style={{
                width: '400px',
                position: 'relative',
                marginLeft: '-30px',
                marginBottom: '20px',
              }}
            >
              <Form.Item label="Price">
                <Input
                  value={priceValue}
                  onChange={e => setPriceValue(e.target.value)}
                />
              </Form.Item>
              <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </div>
          </Form>
        </Modal>
        <Modal
          title={`Tags`}
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
          maskClosable={false}
          footer={null}
        >
          <Table
            columns={columns1}
            dataSource={selectedMemerTag}
            pagination={false}
          />
        </Modal>
      </Container>
    </Page>
  );
}
