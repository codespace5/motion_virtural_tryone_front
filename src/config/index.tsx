// Agent
import AgentList from "pages/Agent/List";
import CreateAgent from "pages/Agent/Create";
import AgentChat from "pages/Agent/Chat";

import { IRoute } from "utils/types";

export const RoutesConfig: IRoute[] = [
  // {
  //   path: "/agents",
  //   component: <AgentList />,
  // },
  {
    path: "/agents/create",
    component: <CreateAgent />,
  },
  {
    path: "/agents/:id/chat",
    component: <AgentChat />,
  },
];
