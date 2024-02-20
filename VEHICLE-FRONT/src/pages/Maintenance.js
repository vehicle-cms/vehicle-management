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

  const driverData = useSelector(state => state.AdminReducer.drivers);
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

  const [Email, setEmail] = useState();
  const [PhoneNo, setPhoneNo] = useState();
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



}
