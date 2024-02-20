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
  Select,
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
import { createVehicleHandler, deleteVehicleHandler, updateVehicleHandler } from '../utils/HandlerFunctions/VehicleHandler';

export default function Vehicles() {
  const memerData = useSelector(state => state.MemerReducer.memers);
  const selectedMemer = useSelector(state => state.MemerReducer.selectedMemer);


   const [vehicleType,setVehicleType] =useState(selectedMemer?.vehicleType);
   const [fuelType,setFuelType] = useState(selectedMemer?.fuelType);
   const [status, setVehicleStatus] = useState(selectedMemer?.status)
   const [vehicleName, setName1] = useState(selectedMemer?.name);
   const [model,setModel] = useState(selectedMemer?.model);
   const [registration,setRegistration] =useState(selectedMemer?.registration);
   const [mileage,setMileage] =useState(selectedMemer?.mileage);
   const [ratePerDay,setRatePerDay] =useState(selectedMemer?.ratePerDay);
   const [imageUrl,setImageUrl] = useState(selectedMemer?.imageUrl);
   const [vehicleNumber, setVehicleNumber] = useState(selectedMemer?.vehicleNumber);
   const [Name, setName] = useState('');

  const isLoading = useSelector(state => state.MemerReducer.loading);
  const [isModalVisible, setIsModalVisible] = useState(false);
    const [isModalVisible1, setIsModalVisible1] = useState(false);
  const [isModalVisible2, setIsModalVisible2] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [data1, setData1] = useState([]);
  const [SearchData, setSearchData] = useState([]);

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
    {
      title: 'Mileage',
      dataIndex: 'mileage',
      key: 'mileage',
    },
    {
      title: 'Active',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <p
            onClick={() => {
              dispatch(setMemerrs(record?.id));
              setIsModalVisible2(true);
            }}
          >
            <Icon icon="akar-icons:edit" width="20" />
          </p>
          <a onClick={()=>{
              setIsModalVisible1(true)
             dispatch(
               setMemerrs(record?.id)
              )
            }}><Icon icon="ant-design:delete-filled" width="20" /></a>
        </Space>
      ),
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
  }, [memerData]);

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
        setVehicleNumber(selectedMemer?.vehicleNumber);
        setFuelType(selectedMemer?.fuelType);
        setImageUrl(selectedMemer?.imageUrl);
        setMileage(selectedMemer?.mileage);
        setModel(selectedMemer?.model);
        setName1(selectedMemer?.name);
        setVehicleStatus(selectedMemer?.status);
        setRatePerDay(selectedMemer?.ratePerDay);
        setRegistration(selectedMemer?.registration);
        }, [selectedMemer]);

  const onChange = (value) => {
      setVehicleStatus(value);
};

const onSearch = (value) => {
  console.log('search:', value);
};
 const onChangeType = (value) => {
      setVehicleType(value);
};
const onSearchType = (value) => {
  console.log('search:', value);
};

 const onChangeFuel = (value) => {
      setFuelType(value);
};

const onSearchFuel = (value) => {
  console.log('search:', value);
};


  const handleOk1 = () => {
    setIsModalVisible1(false);
  };

  const handleCancel1 = () => {
    setIsModalVisible1(false);
  };

const filterOption = (input, option) =>
  (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

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
                placeholder="find memerrs..."
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
               <Button onClick={() => setIsModalVisible(true)}>+</Button>
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
            next={() =>{
              loadMoreData(
                page,
                pageSize,
                setPage,
                loading,
                setLoading,
                'vehicles/paginate',
                data,
                setData,
                setData1,
                dispatch,
                getVehiclesSuccess,
                navigate
              )
            }
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
                updateVehicleHandler(
                  selectedMemer?.id,
                  imageUrl,
                  vehicleName,
                  model,
                  vehicleNumber,
                  vehicleType,
                  registration,
                  status,
                  mileage,
                  ratePerDay,
                  fuelType,
                  dispatch
                );
                setIsModalVisible2(false)
                setPage(0);
                // setData([]);
                setData1([]);
              }}
            >
              <div>
                   <Form.Item label="Image">
                  <Input
                    placeholder="image"
                    value={imageUrl}
                    onChange={e => setImageUrl(e.target.value)}
                    type="text"
                    required
                  />
                </Form.Item>
                <Form.Item label="Name">
                  <Input
                    placeholder="name"
                    value={vehicleName}
                    onChange={e => setName1(e.target.value)}
                    type="text"
                    required
                  />
                </Form.Item>
                <Form.Item label="model">
                  <Input
                    placeholder="model"
                    value={model}
                    onChange={e => setModel(e.target.value)}
                    type="text"
                    required
                  />
                </Form.Item>
                <Form.Item label="vehicleNumber">
                    <Input
                    placeholder="vehicleNumber"
                    value={vehicleNumber}
                    onChange={e => setVehicleNumber(e.target.value)}
                    type="text"
                    required
                  />
                </Form.Item>
                    <Form.Item label="vehicleType">
                       <Select

         showSearch
      placeholder={vehicleType}
    optionFilterProp="children"
    onChange={onChangeType}
    onSearch={onSearchType}
     filterOption={filterOption}
    options={[
      {
        value: 'SEDAN',
        label: 'SEDAN',
      },
      {
        value: 'SUV',
        label: 'SUV',
      },
      {
        value: 'HATCHBACK',
        label: 'HATCHBACK',
      },
      {
         value: 'MOTORBIKE',
         label: 'MOTORBIKE',
      }
    ]}
  />
                </Form.Item>
                <Form.Item label="fuelType">
                                        <Select

    placeholder={fuelType}
    optionFilterProp="children"
    onChange={onChangeFuel}
    onSearch={onSearchFuel}
    filterOption={filterOption}
    options={[
      {
        value: 'PETROL',
        label: 'PETROL',
      },
      {
        value: 'DIESEL',
        label: 'DIESEL',
      },
      {
        value: 'ELECTRIC',
        label: 'ELECTRIC',
      },
      {
         value: 'HYBRID',
        label: 'HYBRID',
      },
    {
         value: 'HYDROGEN',
        label: 'HYDROGEN',
    }
    ]}
  />
                </Form.Item>
                <Form.Item label="Registration">
                    <Input
                    placeholder="registration"
                    value={registration}
                    onChange={e => setRegistration(e.target.value)}
                    type="text"
                    required
                  />
                </Form.Item>
                <Form.Item label="Mileage">
                  <Input
                    placeholder="mileage"
                    value={mileage}
                    onChange={e => setMileage(e.target.value)}
                    type="text"
                    required
                  />
                </Form.Item>
                 <Form.Item label="ratePerDay">
                  <Input
                    placeholder="ratePerDay"
                    value={ratePerDay}
                    onChange={e => setRatePerDay(e.target.value)}
                    type="Number"
                    required
                  />
                </Form.Item>
                 <Form.Item label="status">
  <Select
    showSearch
    placeholder={status}
    optionFilterProp="children"
    onChange={onChange}
    onSearch={onSearch}
    filterOption={filterOption}

    options={[
      {
        value: 'ACTIVE',
        label: 'ACTIVE',
      },
      {
        value: 'INACTIVE',
        label: 'INACTIVE',
      },
      {
        value: 'MAINTENANCE',
        label: 'MAINTENANCE',
      }
    ]}
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
          title={`Delete`}
          visible={isModalVisible1}
          onOk={handleOk1}
          onCancel={handleCancel1}
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
                deleteVehicleHandler(selectedMemer?.id,dispatch)
                setIsModalVisible1(false);
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
         <Modal
          title={`Add New Vehicle`}
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
                createVehicleHandler(
                  imageUrl,
                  vehicleName,
                  model,
                  vehicleNumber,
                  vehicleType,
                  registration,
                  status,
                  mileage,
                  ratePerDay,
                  fuelType,
                  dispatch
                );
                setIsModalVisible(false)
                setPage(0);
                // setData([]);
                setData1([]);
              }}
            >
              <div>
                   <Form.Item label="Image">
                  <Input
                    placeholder="image"
                    value={imageUrl}
                    onChange={e => setImageUrl(e.target.value)}
                    type="text"
                    required
                  />
                </Form.Item>
                <Form.Item label="Name">
                  <Input
                    placeholder="name"
                    value={vehicleName}
                    onChange={e => setName1(e.target.value)}
                    type="text"
                    required
                  />
                </Form.Item>
                <Form.Item label="model">
                  <Input
                    placeholder="model"
                    value={model}
                    onChange={e => setModel(e.target.value)}
                    type="text"
                    required
                  />
                </Form.Item>
                <Form.Item label="vehicleNumber">
                    <Input
                    placeholder="vehicleNumber"
                    value={vehicleNumber}
                    onChange={e => setVehicleNumber(e.target.value)}
                    type="text"
                    required
                  />
                </Form.Item>
                    <Form.Item label="vehicleType">
                       <Select
         showSearch
      placeholder="select vehicle type"
    optionFilterProp="children"
    onChange={onChangeType}
    onSearch={onSearchType}
     filterOption={filterOption}
    options={[
      {
        value: 'SEDAN',
        label: 'SEDAN',
      },
      {
        value: 'SUV',
        label: 'SUV',
      },
      {
        value: 'HATCHBACK',
        label: 'HATCHBACK',
      },
      {
         value: 'MOTORBIKE',
         label: 'MOTORBIKE',
      }
    ]}
  />
                </Form.Item>
                <Form.Item label="fuelType">
                                        <Select
    showSearch
    placeholder="select fuel type"
    optionFilterProp="children"
    onChange={onChangeFuel}
    onSearch={onSearchFuel}
    filterOption={filterOption}
    options={[
      {
        value: 'PETROL',
        label: 'PETROL',
      },
      {
        value: 'DIESEL',
        label: 'DIESEL',
      },
      {
        value: 'ELECTRIC',
        label: 'ELECTRIC',
      },
      {
         value: 'HYBRID',
        label: 'HYBRID',
      },
    {
         value: 'HYDROGEN',
        label: 'HYDROGEN',
    }
    ]}
  />
                </Form.Item>
                <Form.Item label="Registration">
                    <Input
                    placeholder="registration"
                    value={registration}
                    onChange={e => setRegistration(e.target.value)}
                    type="text"
                    required
                  />
                </Form.Item>
                <Form.Item label="Mileage">
                  <Input
                    placeholder="mileage"
                    value={mileage}
                    onChange={e => setMileage(e.target.value)}
                    type="text"
                    required
                  />
                </Form.Item>
                 <Form.Item label="ratePerDay">
                  <Input
                    placeholder="ratePerDay"
                    value={ratePerDay}
                    onChange={e => setRatePerDay(e.target.value)}
                    type="Number"
                    required
                  />
                </Form.Item>
                 <Form.Item label="status">
                                        <Select
    showSearch
    placeholder="status"
    optionFilterProp="children"
    onChange={onChange}
    onSearch={onSearch}
    filterOption={filterOption}
    options={[
      {
        value: 'ACTIVE',
        label: 'ACTIVE',
      },
      {
        value: 'INACTIVE',
        label: 'INACTIVE',
      },
      {
        value: 'MAINTENANCE',
        label: 'MAINTENANCE',
      }
    ]}
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
      </Container>
    </Page>
  );
}
