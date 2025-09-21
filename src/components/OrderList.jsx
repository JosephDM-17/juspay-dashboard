import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { 
  Table, 
  Input, 
  Button, 
  Space, 
  Avatar, 
  Tag, 
  Checkbox, 
  Pagination,
  Typography,
  Card,
  Row,
  Col,
  Tooltip
} from 'antd';
import { 
  SearchOutlined, 
  PlusOutlined, 
  FilterOutlined, 
  SortAscendingOutlined,
  SortDescendingOutlined,
  CalendarOutlined,
  FileTextOutlined,
  StarOutlined,
  SwapOutlined
} from '@ant-design/icons';
import { useTheme } from '../hooks/useTheme';
import { IoFilter } from "react-icons/io5";
import { BiSortAlt2 } from "react-icons/bi";

const { Title } = Typography;
const { Search } = Input;

// Data table component with filtering, sorting, pagination, and row selection
const OrderList = () => {
  const { colors } = useTheme();
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchText, setSearchText] = useState('');
  const [sortField, setSortField] = useState(null);
  const [sortOrder, setSortOrder] = useState('asc');
  const [filteredData, setFilteredData] = useState([]);

  const allOrderData = React.useMemo(() => {
    const orderData = [
      {
        key: '1',
        orderId: 'CM9801',
        user: 'Natali Craig',
        userAvatar: '/src/assets/contact1.png',
        project: 'Landing Page',
        address: 'Meadow Lane Oakland',
        date: 'Just now',
        status: 'In Progress',
        statusColor: '#1890ff'
      },
      {
        key: '2',
        orderId: 'CM9802',
        user: 'Kate Morrison',
        userAvatar: '/src/assets/contact2.png',
        project: 'CRM Admin pages',
        address: 'Larry San Francisco',
        date: 'A minute ago',
        status: 'Complete',
        statusColor: '#52c41a'
      },
      {
        key: '3',
        orderId: 'CM9803',
        user: 'Drew Cano',
        userAvatar: '/src/assets/contact3.png',
        project: 'Client Project',
        address: 'Bagwell Avenue Ocala',
        date: '1 hour ago',
        status: 'Pending',
        statusColor: '#13c2c2'
      },
      {
        key: '4',
        orderId: 'CM9804',
        user: 'Orlando Diggs',
        userAvatar: '/src/assets/contact4.png',
        project: 'Admin Dashboard',
        address: 'Washburn Baton Rouge',
        date: 'Yesterday',
        status: 'Approved',
        statusColor: '#faad14'
      },
      {
        key: '5',
        orderId: 'CM9805',
        user: 'Andi Lane',
        userAvatar: '/src/assets/contact5.png',
        project: 'App Landing Page',
        address: 'Nest Lane Olivette',
        date: 'Feb 2, 2023',
        status: 'Rejected',
        statusColor: '#8c8c8c'
      },
      {
        key: '6',
        orderId: 'CM9806',
        user: 'Koray Okumus',
        userAvatar: '/src/assets/contact6.png',
        project: 'E-commerce Site',
        address: 'Main Street New York',
        date: 'Feb 1, 2023',
        status: 'In Progress',
        statusColor: '#1890ff'
      },
      {
        key: '7',
        orderId: 'CM9807',
        user: 'Natali Craig',
        userAvatar: '/src/assets/contact1.png',
        project: 'Mobile App',
        address: 'Oak Avenue Los Angeles',
        date: 'Jan 30, 2023',
        status: 'Complete',
        statusColor: '#52c41a'
      },
      {
        key: '8',
        orderId: 'CM9808',
        user: 'Kate Morrison',
        userAvatar: '/src/assets/contact2.png',
        project: 'API Integration',
        address: 'Tech Park Silicon Valley',
        date: 'Jan 28, 2023',
        status: 'Pending',
        statusColor: '#13c2c2'
      },
      {
        key: '9',
        orderId: 'CM9809',
        user: 'Drew Cano',
        userAvatar: '/src/assets/contact3.png',
        project: 'Data Analytics',
        address: 'Business District Chicago',
        date: 'Jan 25, 2023',
        status: 'Approved',
        statusColor: '#faad14'
      },
      {
        key: '10',
        orderId: 'CM9810',
        user: 'Orlando Diggs',
        userAvatar: '/src/assets/contact4.png',
        project: 'Cloud Migration',
        address: 'Innovation Hub Austin',
        date: 'Jan 22, 2023',
        status: 'Rejected',
        statusColor: '#8c8c8c'
      }
    ];

    const extendedData = [];
    for (let i = 0; i < 3; i++) {
      orderData.forEach((item, index) => {
        extendedData.push({
          ...item,
          key: `${item.key}-${i}-${index}` // Unique keys
        });
      });
    }
    return extendedData;
  }, []);

  useEffect(() => {
    let filtered = allOrderData;
    
    if (searchText) {
      filtered = filtered.filter(item =>
        item.orderId.toLowerCase().includes(searchText.toLowerCase()) ||
        item.user.toLowerCase().includes(searchText.toLowerCase()) ||
        item.project.toLowerCase().includes(searchText.toLowerCase()) ||
        item.address.toLowerCase().includes(searchText.toLowerCase()) ||
        item.status.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    if (sortField) {
      filtered.sort((a, b) => {
        let aVal = a[sortField];
        let bVal = b[sortField];
        
        if (sortField === 'date') {
          const dateOrder = ['Just now', 'A minute ago', '1 hour ago', 'Yesterday', 'Feb 2, 2023', 'Feb 1, 2023', 'Jan 30, 2023', 'Jan 28, 2023', 'Jan 25, 2023', 'Jan 22, 2023'];
          aVal = dateOrder.indexOf(aVal);
          bVal = dateOrder.indexOf(bVal);
        }
        
        if (typeof aVal === 'string') {
          aVal = aVal.toLowerCase();
          bVal = bVal.toLowerCase();
        }
        
        if (sortOrder === 'asc') {
          return aVal > bVal ? 1 : -1;
        } else {
          return aVal < bVal ? 1 : -1;
        }
      });
    }

    setFilteredData(filtered);
  }, [searchText, sortField, sortOrder, allOrderData]);

  const handleSort = useCallback((field) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  }, [sortField, sortOrder]);

  const onSelectChange = useCallback((newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
  }, []);

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const columns = useMemo(() => [
    {
      title: 'Order ID',
      dataIndex: 'orderId',
      key: 'orderId',
      sorter: true,
      onHeaderCell: () => ({
        onClick: () => handleSort('orderId'),
      }),
      render: (text) => (
        <span className="font-medium" style={{ color: colors.text }}>#{text}</span>
      ),
    },
    {
      title: 'User',
      dataIndex: 'user',
      key: 'user',
      sorter: true,
      onHeaderCell: () => ({
        onClick: () => handleSort('user'),
      }),
      render: (text, record) => (
        <div className="flex items-center gap-2">
          <img 
            src={record.userAvatar} 
            alt={text}
            className="w-8 h-8 rounded-full object-cover"
            loading="lazy"
          />
          <span style={{ color: colors.text }}>{text}</span>
        </div>
      ),
    },
    {
      title: 'Project',
      dataIndex: 'project',
      key: 'project',
      sorter: true,
      onHeaderCell: () => ({
        onClick: () => handleSort('project'),
      }),
      render: (text) => (
        <span style={{ color: colors.text }}>{text}</span>
      ),
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
      sorter: true,
      onHeaderCell: () => ({
        onClick: () => handleSort('address'),
      }),
      render: (text, record) => (
        <div className="flex items-center gap-1">
          <span style={{ color: colors.text }}>{text}</span>
          {record.key === '5' && <FileTextOutlined className="text-xs" style={{ color: colors.textTertiary }} />}
        </div>
      ),
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      sorter: true,
      onHeaderCell: () => ({
        onClick: () => handleSort('date'),
      }),
      render: (text) => (
        <div className="flex items-center gap-1">
          <CalendarOutlined className="text-xs" style={{ color: colors.textTertiary }} />
          <span style={{ color: colors.text }}>{text}</span>
        </div>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      sorter: true,
      onHeaderCell: () => ({
        onClick: () => handleSort('status'),
      }),
      render: (text, record) => (
        <div className="flex items-center gap-1.5">
          <div 
            className="w-1.5 h-1.5 rounded-full"
            style={{ backgroundColor: record.statusColor }}
            role="img"
            aria-label={`Status indicator: ${text}`}
          />
          <span style={{ color: colors.text }}>{text}</span>
          {record.key === '5' && <span style={{ color: colors.textTertiary }}>...</span>}
        </div>
      ),
    },
  ], [colors, handleSort]);

  const paginatedData = filteredData.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div className="order-list min-h-screen p-2 sm:p-4 lg:p-6" style={{ backgroundColor: colors.background }}>
      <div className="rounded-lg shadow-lg overflow-hidden" style={{ backgroundColor: colors.surface }}>
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4 border-b" style={{ borderBottomColor: colors.border, backgroundColor: colors.cardBackgroundSecondary }}>
          <Title level={2} className="m-0" style={{ color: colors.text }}>
            Order List
          </Title>
        </div>

        {/* Action Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 px-4 sm:px-8 py-4 border-b" style={{ backgroundColor: colors.surface, borderBottomColor: colors.border }}>
          {/* Left side - Action Icons */}
          <div className="flex items-center gap-2 sm:gap-4">
            <Tooltip title="Add">
              <div className="p-2 rounded-md transition-colors cursor-pointer hover:bg-opacity-10 hover:bg-white" style={{ color: colors.text, backgroundColor: 'transparent' }}>
                <PlusOutlined />
              </div>
            </Tooltip>

            <Tooltip title="Filter">
              <div className="p-2 rounded-md transition-colors cursor-pointer hover:bg-opacity-10 hover:bg-white" style={{ color: colors.text, backgroundColor: 'transparent' }}>
                <IoFilter />
              </div>
            </Tooltip>

            <Tooltip title="Sort">
              <div className="p-2 rounded-md transition-colors cursor-pointer hover:bg-opacity-10 hover:bg-white" style={{ color: colors.text, backgroundColor: 'transparent' }}>
                <BiSortAlt2 />
              </div>
            </Tooltip>
          </div>

          {/* Right Side - Search */}
          <div className="w-full sm:w-64">
            <Input.Search 
              placeholder="Search orders..." 
              allowClear 
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              onSearch={(value) => setSearchText(value)}
              className="w-full"
              style={{ 
                backgroundColor: colors.surface,
                borderColor: colors.border,
                color: colors.text
              }}
            />
          </div>
        </div>

        {/* Table */}
        <div className="px-2 sm:px-8 overflow-x-auto">
          <Table
            rowSelection={rowSelection}
            columns={columns}
            dataSource={paginatedData}
            pagination={false}
            className="w-full min-w-[600px]"
            style={{ backgroundColor: colors.surface }}
            scroll={{ x: 600 }}
          components={{
            header: {
              cell: (props) => (
                <th {...props} className="border-0 border-b text-xs font-normal px-4 py-3 cursor-pointer" style={{ 
                  backgroundColor: colors.cardBackgroundSecondary,
                  borderBottomColor: colors.borderSecondary,
                  color: colors.textTertiary
                }} />
              ),
            },
            body: {
              cell: (props) => (
                <td {...props} className="border-0 border-b px-4 py-3" style={{ 
                  backgroundColor: colors.surface,
                  borderBottomColor: colors.borderSecondary
                }} />
              ),
            },
          }}
          rowClassName={(record) => 
            selectedRowKeys.includes(record.key) ? 'selected-row' : ''
          }
          onRow={(record) => ({
            onClick: () => {
              const newSelectedRowKeys = selectedRowKeys.includes(record.key)
                ? selectedRowKeys.filter(key => key !== record.key)
                : [...selectedRowKeys, record.key];
              setSelectedRowKeys(newSelectedRowKeys);
            },
            className: 'cursor-pointer'
          })}
          />
        </div>

        {/* Pagination */}
        <div className="px-4 sm:px-6 py-4 flex justify-center sm:justify-end mt-4">
          <Pagination
            current={currentPage}
            total={filteredData.length}
            pageSize={pageSize}
            onChange={(page, size) => {
              setCurrentPage(page);
              setPageSize(size);
            }}
            showSizeChanger={false}
            showQuickJumper={false}
            showLessItems={true}
            size="small"
            style={{ color: colors.text }}
            responsive={true}
          />
        </div>
      </div>

      <style>{`
        .order-list .ant-table-thead > tr > th {
          background-color: ${colors.cardBackgroundSecondary} !important;
        }
        
        .order-list .ant-table-tbody > tr > td {
          background-color: ${colors.surface} !important;
        }
        
        .order-list .selected-row {
          background-color: #1a2332 !important;
        }
        .order-list .selected-row td {
          background-color: #1a2332 !important;
        }
        
        .order-list .ant-table-tbody > tr:hover > td {
          background-color: ${colors.tableRowHover} !important;
        }
        .order-list .ant-table-tbody > tr.selected-row:hover > td {
          background-color: #1a2332 !important;
        }
        
        .order-list .ant-table-tbody > tr:not(:last-child) > td {
          border-bottom: 1px solid ${colors.borderSecondary} !important;
        }
        
        .order-list .ant-table-tbody .ant-checkbox-wrapper {
          opacity: 0;
          transition: opacity 0.2s ease;
        }
        
        .order-list .ant-table-thead .ant-checkbox-wrapper {
          opacity: 1 !important;
        }
        
        .order-list .ant-table-tbody > tr:hover .ant-checkbox-wrapper {
          opacity: 1;
        }
        
        .order-list .ant-table-tbody > tr.selected-row .ant-checkbox-wrapper {
          opacity: 1;
        }
        
        .order-list .ant-table-thead .ant-checkbox-wrapper .ant-checkbox .ant-checkbox-inner {
          border: 1px solid ${colors.border} !important;
          background-color: ${colors.cardBackgroundSecondary} !important;
        }
        
        .order-list .ant-checkbox-checked .ant-checkbox-inner {
          background-color: #C6C7F8 !important;
          border-color: #C6C7F8 !important;
        }
        
        .order-list .ant-checkbox-checked .ant-checkbox-inner::after {
          border-color: #fff !important;
        }
        
        .order-list .ant-checkbox-indeterminate .ant-checkbox-inner {
          background-color: #C6C7F8 !important;
          border-color: #C6C7F8 !important;
        }
        
        .order-list .ant-checkbox-indeterminate .ant-checkbox-inner::after {
          background-color: #fff !important;
        }
        
        .order-list .ant-checkbox:focus .ant-checkbox-inner {
          box-shadow: none !important;
        }
        
        .order-list .ant-pagination .ant-pagination-item {
          background-color: ${colors.surface} !important;
          border-color: ${colors.border} !important;
        }
        
        .order-list .ant-pagination .ant-pagination-item a {
          color: ${colors.text} !important;
        }
        
        .order-list .ant-pagination .ant-pagination-item-active {
          background-color: ${colors.primary} !important;
          border-color: ${colors.primary} !important;
        }
        
        .order-list .ant-pagination .ant-pagination-item-active a {
          color: #fff !important;
        }
        
        .order-list .ant-pagination .ant-pagination-prev,
        .order-list .ant-pagination .ant-pagination-next {
          background-color: ${colors.surface} !important;
          border-color: ${colors.border} !important;
        }
        
        .order-list .ant-pagination .ant-pagination-prev .ant-pagination-item-link,
        .order-list .ant-pagination .ant-pagination-next .ant-pagination-item-link {
          color: ${colors.text} !important;
          background-color: transparent !important;
        }
        
        .order-list .ant-pagination .ant-pagination-disabled .ant-pagination-item-link {
          color: ${colors.textTertiary} !important;
        }
        
        @media (max-width: 768px) {
          .order-list .ant-table-thead > tr > th {
            padding: 8px 4px !important;
            font-size: 11px !important;
          }
          .order-list .ant-table-tbody > tr > td {
            padding: 8px 4px !important;
            font-size: 12px !important;
          }
          .order-list .ant-table-tbody .ant-checkbox-wrapper {
            opacity: 1 !important;
          }
        }
        
        @media (max-width: 640px) {
          .order-list .ant-table-thead > tr > th {
            padding: 6px 2px !important;
            font-size: 10px !important;
          }
          .order-list .ant-table-tbody > tr > td {
            padding: 6px 2px !important;
            font-size: 11px !important;
          }
        }
      `}</style>
    </div>
  );
};

export default OrderList;