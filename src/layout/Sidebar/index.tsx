import { Layout, Menu } from "antd";
import { useSelector } from "react-redux";
import { UserOutlined } from "@ant-design/icons";
import type { RootState } from "store";

const { Sider } = Layout;

const AppSideBar = () => {
  const { collapsed } = useSelector((state: RootState) => state.theme);

  return (
    <Sider
      trigger={null}
      collapsible
      breakpoint="lg"
      collapsed={collapsed}
      style={{
        background: "white",
        height: "100vh",
        borderRight: "1px solid rgb(219, 219, 219)",
      }}
    >
      <div style={{ height: 70 }}></div>
      <Menu
        mode="inline"
        style={{ fontSize: 18, fontWeight: 600 }}
        defaultSelectedKeys={["agents"]}
        items={[
          {
            key: "agents",
            icon: <UserOutlined style={{ fontSize: 20 }} />,
            label: "Agents",
          },
        ]}
      />
    </Sider>
  );
};

export default AppSideBar;
