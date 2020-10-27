import React, { useContext } from 'react';
import { useHistory } from "react-router-dom";
import { RootContext } from '../services/RootContext';
import './Dashboard.css';
import levelIcon from '../assets/level-icon.png';
import logoInsignia from '../assets/insignia-light.svg';

import { Bar } from 'ant-design-pro/lib/Charts';
import { Layout, Menu, Statistic, Card, Row, Col, Empty } from 'antd';
import {
  BarChartOutlined,
  LogoutOutlined,
  BankOutlined,
  UserOutlined,
} from '@ant-design/icons';

const { Content, Sider } = Layout;

export class Dashboard extends React.Component {
  constructor() {
    super();
    this.state = {
      leaderboard: [],
      loading: true,
      user: {
        Statistics: [],
        LevelProgress: {}
      },
      displayName: "",
      userPoints: []
    };
  }

  componentDidMount() {
    this.getCurrentUserInfo();
  }

  getCurrentUserInfo() {
    fetch('/current-user')
      .then(response =>
        response.json()
      )
      .then((userData) => {
        this.mapUserResult(userData)
        this.setState({
          user: userData,
          //loading: false
        })
      })
  }

  mapUserResult(userData) {
    var points = [];

    if (userData.PointsHistory) {
      for (let i = 0; i < userData.PointsHistory.length; i++) {
        points.push(
          {
            x: `Intento ${i + 1}`,
            y: userData.PointsHistory[i].Points
          }
        )
      }
    }

    this.setState({
      displayName: userData.DisplayName,
      userPoints: points
    })
  }

  render() {
    const statistics = this.state.user.Statistics.map((stat) => {
      return (
        <Col xs={24} md={12} xl={6} >
          <Card className="dashboard-card" style={{ width: '100%' }}>
            <Statistic
              title={stat.StatisticName}
              value={stat.Value}
              //precision={2}
              valueStyle={{ color: /*'#007bff'*/'black', fontSize: '2.5vmax' }}
              //prefix={<ArrowUpOutlined />}
              suffix={stat.Suffix}
              style={{ fontSize: 14 }}
            />
          </Card>
        </Col>
      )
    })
    return (
      <Layout>
        <Sidebar />
        <Content style={{ padding: '2em 5em', backgroundColor: '#f9f9f9', }} >
          <h2 className="main-subtitle">Hola, {this.state.user.DisplayName}!</h2>
          <Row justify="space-between" align="middle">
            <Col>
              <h1 className="main-heading">Overview</h1>
            </Col>
            <Col sm={24} md={12} lg={4} style={{ fontSize: 28 }}>
              <Row align='middle' >
                <h2 style={{ margin: 0 }}>Lvl {this.state.user.LevelProgress.CurrentLevel}</h2>
                <img src={levelIcon} alt='level-icon' style={{ width: 60, height: 60, margin: 10 }} />
              </Row>
            </Col>
          </Row>
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <Row gutter={[16, 16]} justify='start'>
                {statistics}
              </Row>
              <Row gutter={[16, 16]}>
                <Col xs={24} xl={18}>
                  <Card className='dashboard-card' style={{ padding: '0 2em' }}>
                    <div style={{ marginBottom: 30 }}>
                      <h2 className='h2-dashboard' style={{ margin: 0 }}>Historial de Puntos</h2>
                      <span>Basado en tus últimos 10 intentos</span>
                    </div>
                    {
                      this.state.userPoints.length > 0 ?
                        <Bar height={300} data={this.state.userPoints} color='#2FDF84' />
                        :
                        <Empty />
                    }
                  </Card>
                </Col>
                <Col xs={24} xl={6}>
                  <Card className="dashboard-card" >
                    <h2 className='h2-dashboard'>Datos de Usuario</h2>
                    <Row>
                      <Col xs={8} xl={24}>
                        <Row gutter={4}>
                          <span>Nombre</span>
                        </Row>
                        <Row gutter={4}>
                          <h2>{this.state.user.DisplayName}</h2>
                        </Row>
                      </Col>
                      <Col xs={8} xl={24}>
                        <Row gutter={4}>
                          <span>Pais</span>
                        </Row>
                        <Row gutter={4}>
                          <h2>{this.state.user.Country}</h2>
                        </Row>
                      </Col>
                      <Col xs={8} xl={24}>
                        <Row gutter={4}>
                          <span>Edad</span>
                        </Row>
                        <Row gutter={4}>
                          <h2>{this.state.user.Age}</h2>
                        </Row>
                      </Col>
                      <Col xs={24} sm={12} md={8} xl={24}>
                        <Row gutter={4}>
                          <span>Escuela</span>
                        </Row>
                        <Row gutter={4}>
                          <h2>{this.state.user.School}</h2>
                        </Row>
                      </Col>
                    </Row>
                  </Card>
                </Col>
              </Row>
            </Col>
          </Row>
        </ Content>
      </Layout >
    )

  }
}

const Sidebar = () => {
  let history = useHistory();
  const { setAuthenticated } = useContext(RootContext);

  return (
    <Sider theme="light" breakpoint={'sm'}>
      <img src={logoInsignia} alt="Insignia logo" style={{ height: 45, margin: 20 }}></img>
      <Menu theme="light" mode="inline" defaultSelectedKeys={['1']}>
        <Menu.Item key="1" icon={<BarChartOutlined />}>
          Overview
        </Menu.Item>
        <Menu.Item key="2" icon={<BankOutlined />} disabled>
          Escuela
        </Menu.Item>
        <Menu.SubMenu icon={<UserOutlined />} title="Perfil">
          <Menu.Item icon={<UserOutlined />} disabled>
            Ver Perfil
          </Menu.Item>
          <Menu.Item danger icon={<LogoutOutlined />}
            onClick={() => {
              setAuthenticated(false);
              history.push("/");
            }}>
            Salir
          </Menu.Item>
        </Menu.SubMenu>
      </Menu>


    </Sider>
  )
}
