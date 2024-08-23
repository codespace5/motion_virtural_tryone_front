import { useLocation, useNavigate } from "react-router-dom";
import { Layout, Flex, Button } from "antd";
import { useSelector, useDispatch } from "react-redux";
import {
  PlusOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";
import { RootState } from "store";
import { setCollapsed } from "store/slices/ThemeSlice";
import { setStep } from "store/slices/AgentSlice";

import AppSideBar from "./Sidebar";
import CreateAgentHeader from "./headers/CreateAgentHeader";

const { Header, Footer } = Layout;

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { step } = useSelector((state: RootState) => state.agent);
  const { collapsed } = useSelector((state: RootState) => state.theme);
  const location = useLocation();

  return (
    <Layout style={{ background: "white" }}>
      {location.pathname === "/agents/create" ||
      location.pathname.includes("chat") ? (
        <></>
      ) : (
        <AppSideBar />
      )}
      <Layout style={{ background: "white" }}>
        <Header
          style={{
            borderBottom: "1px solid rgb(219, 219, 219)",
            position: "sticky",
            width: "100%",
            top: 0,
            height: 70,
            zIndex: 10,
          }}
        >
          {location.pathname === "/agents/create" ? (
            <CreateAgentHeader />
          ) : (
            <Flex
              align="center"
              justify="space-between"
              style={{ height: "100%" }}
            >
              {/* <Button
                type="text"
                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                onClick={() => dispatch(setCollapsed(!collapsed))}
                style={{
                  marginLeft: -45,
                  fontSize: "16px",
                  width: 50,
                  height: 50,
                }}
              /> */}
              <div></div>
              <Button
                type="primary"
                icon={<PlusOutlined />}
                size="large"
                onClick={() => {
                //   dispatch(setAgentTab("model"));
                  navigate("/agents/create");
                }}
              >
                Create
              </Button>
            </Flex>
          )}
        </Header>
        {children}
      </Layout>
    </Layout>
  );
};

export default AppLayout;
