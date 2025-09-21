import React from 'react';
import { Card, Avatar, Typography, List, Timeline, Badge } from 'antd';
import {
  CheckCircleOutlined,
  EditOutlined,
  DeleteOutlined
} from '@ant-design/icons';
import { useTheme } from '../hooks/useTheme';

// Import images
import bugIcon from '../assets/bug.png';
import userIcon from '../assets/user.png';
import connectivityIcon from '../assets/connectivity.png';
import activities1 from '../assets/activities1.png';
import activities2 from '../assets/activities2.png';
import activities3 from '../assets/activities3.png';
import activities4 from '../assets/activities4.png';
import activities5 from '../assets/activities5.png';
import contact1 from '../assets/contact1.png';
import contact2 from '../assets/contact2.png';
import contact3 from '../assets/contact3.png';
import contact4 from '../assets/contact4.png';
import contact5 from '../assets/contact5.png';
import contact6 from '../assets/contact6.png';

const { Title, Text } = Typography;

const RightSidebar = ({ collapsed, showNotifications, onToggleNotifications }) => {
  const { colors } = useTheme();
  const notifications = [
    {
      icon: <img src={bugIcon} alt="Bug" style={{ width: '16px', height: '16px' }} />,
      text: 'You have a bug that needs...',
      time: 'Just now'
    },
    {
      icon: <img src={userIcon} alt="User" style={{ width: '16px', height: '16px' }} />,
      text: 'New user registered',
      time: '59 minutes ago'
    },
    {
      icon: <img src={bugIcon} alt="Bug" style={{ width: '16px', height: '16px' }} />,
      text: 'You have a bug that needs...',
      time: '12 hours ago'
    },
    {
      icon: <img src={connectivityIcon} alt="Connectivity" style={{ width: '16px', height: '16px' }} />,
      text: 'Andi Lane subscribed to you',
      time: 'Today, 11:59 AM'
    },
   
   
  ];

  const activities = [
    {
      avatar: <img src={activities1} alt="Activity 1" style={{ width: '32px', height: '32px', borderRadius: '50%' }} />,
      text: 'You have a bug that needs...',
      time: 'Just now'
    },
    {
      avatar: <img src={activities2} alt="Activity 2" style={{ width: '32px', height: '32px', borderRadius: '50%' }} />,
      text: 'Released a new version',
      time: '59 minutes ago'
    },
    {
      avatar: <img src={activities3} alt="Activity 3" style={{ width: '32px', height: '32px', borderRadius: '50%' }} />,
      text: 'Submitted a bug',
      time: '12 hours ago'
    },
    {
      avatar: <img src={activities4} alt="Activity 4" style={{ width: '32px', height: '32px', borderRadius: '50%' }} />,
      text: 'Modified A data in Page X',
      time: 'Today, 11:59 AM'
    },
    {
      avatar: <img src={activities5} alt="Activity 5" style={{ width: '32px', height: '32px', borderRadius: '50%' }} />,
      text: 'Deleted a page in Project X',
      time: 'Feb 2, 2023'
    }
  ];

  const contacts = [
    {
      name: 'Natali Craig',
      avatar: <img src={contact1} alt="Contact 1" style={{ width: '32px', height: '32px', borderRadius: '50%' }} />
    },
    {
      name: 'Drew Cano',
      avatar: <img src={contact2} alt="Contact 2" style={{ width: '32px', height: '32px', borderRadius: '50%' }} />
    },
    {
      name: 'Orlando Diggs',
      avatar: <img src={contact3} alt="Contact 3" style={{ width: '32px', height: '32px', borderRadius: '50%' }} />
    },
    {
      name: 'Andi Lane',
      avatar: <img src={contact4} alt="Contact 4" style={{ width: '32px', height: '32px', borderRadius: '50%' }} />
    },
    {
      name: 'Kate Morrison',
      avatar: <img src={contact5} alt="Contact 5" style={{ width: '32px', height: '32px', borderRadius: '50%' }} />
    },
    {
      name: 'Koray Okumus',
      avatar: <img src={contact6} alt="Contact 6" style={{ width: '32px', height: '32px', borderRadius: '50%' }} />
    }
  ];

  if (collapsed) {
    return null;
  }

  return (
    <div className="right-sidebar" style={{ 
      padding: '20px 0',
      position: 'fixed',
      right: 0,
      top: 0,
      bottom: 0,
      width: '280px',
      background: colors.sidebarBackground,
      borderLeft: `1px solid ${colors.border}`,
      zIndex: 1000,
      overflowY: 'auto'
    }}>
      {/* Notifications Section */}
      <div style={{ padding: '0 20px', marginBottom: '30px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <Title level={4} style={{ margin: 0, fontSize: '16px', fontWeight: '600', color: colors.sidebarText }}>
            Notifications
          </Title>
          {showNotifications && (
            <button 
              onClick={onToggleNotifications}
              style={{ 
                background: 'none', 
                border: 'none', 
                cursor: 'pointer',
                fontSize: '12px',
                color: colors.sidebarTextSecondary
              }}
            >
              ✕
            </button>
          )}
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {notifications.map((notification) => (
            <div key={notification.text} style={{ 
              display: 'flex', 
              alignItems: 'flex-start', 
              gap: '12px',
              padding: '8px 0',
              cursor: 'pointer'
            }}>
              <div style={{ marginTop: '2px' }}>
                {notification.icon}
              </div>
              <div style={{ flex: 1 }}>
                <Text style={{ fontSize: '14px', lineHeight: '1.4', color: colors.sidebarText }}>
                  {notification.text}
                </Text>
                <div>
                  <Text style={{ fontSize: '12px', color: colors.sidebarTextSecondary }}>
                    {notification.time}
                  </Text>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Activities Section - Only show when not in notification mode */}
      {!showNotifications && (
        <div style={{ padding: '0 20px', marginBottom: '30px' }}>
          <Title level={4} style={{ margin: '0 0 16px 0', fontSize: '16px', fontWeight: '600', color: colors.sidebarText }}>
            Activities
          </Title>
        
        <div className="timeline-container">
          <Timeline
            items={activities.map((activity) => ({
              dot: (
                <div style={{ 
                  width: '32px', 
                  height: '32px', 
                  borderRadius: '50%',
                  backgroundColor: colors.sidebarBackground,
                  boxShadow: `0 0 0 1px ${colors.border}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  overflow: 'hidden'
                }}>
                  {activity.avatar}
                </div>
              ),
              children: (
                <div>
                  <Text style={{ fontSize: '14px', lineHeight: '1.4', color: colors.sidebarText }}>
                    {activity.text}
                  </Text>
                  <div>
                    <Text style={{ fontSize: '12px', color: colors.sidebarTextSecondary }}>
                      {activity.time}
                    </Text>
                  </div>
                </div>
              )
            }))}
            style={{ paddingLeft: '0' }}
          />
        </div>
        </div>
      )}

      {/* Contacts Section - Only show when not in notification mode */}
      {!showNotifications && (
        <div style={{ padding: '0 20px' }}>
          <Title level={4} style={{ margin: '0 0 16px 0', fontSize: '16px', fontWeight: '600', color: colors.sidebarText }}>
            Contacts
          </Title>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {contacts.map((contact, index) => (
            <div key={index} style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '12px',
              padding: '8px 0',
              cursor: 'pointer',
              borderRadius: '6px',
              transition: 'background-color 0.2s'
            }}
            onMouseEnter={(e) => e.target.style.backgroundColor = colors.sidebarActive}
            onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
            >
              <div style={{ 
                width: '32px', 
                height: '32px', 
                borderRadius: '50%',
                border: `2px solid ${colors.sidebarBackground}`, 
                boxShadow: `0 0 0 1px ${colors.border}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden'
              }}>
                {contact.avatar}
              </div>
              <Text style={{ fontSize: '14px', color: colors.sidebarText }}>
                {contact.name}
              </Text>
            </div>
          ))}
        </div>
        </div>
      )}
      
      <style>{`
        .timeline-container .ant-timeline-item-tail {
          border-left: 2px solid ${colors.border} !important;
        }
        .timeline-container .ant-timeline-item:last-child .ant-timeline-item-tail {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default RightSidebar;
