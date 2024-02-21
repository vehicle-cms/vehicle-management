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


export default function Maintenance() {

  const driverData = useSelector(state => state.AdminReducer.Maintenance);
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
          <span>{record?.startDate} {record?.startDate}</span>
        </Space>
      ),
    },
    {
      title: 'End Date',
      dataIndex: 'endDate',
      key: 'endDate',
      render: (text, record) => (
        <Space size="middle">
          <span>{record?.endDate} {record?.endDate}</span>
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
      setData(driverData);
      setData1(driverData);
    } else if (SearchData?.length >= 1 && SearchData[0] !== undefined) {
      setData(SearchData);
      setData1([]);
    } else {
      setData(driverData);
    }
  }, [driverData, SearchData]);

  return (
    <>
    </>
  )
}
