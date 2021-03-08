import { Layout, Typography } from "antd";
import React from "react";
import WorkflowItem from "./WorkflowItem";

const { Text } = Typography;

const WorkflowList = (props: any) => {
  const {
    setLoading,
    workflowList,
    setShouldReload,
    getAllWorkflows,
    workflowTypesList,
    clientList,
  } = props;
  return (
    <div>
      {workflowList.length > 0 ? (
        workflowList.map((workflow: any) => (
          <WorkflowItem
            workflowData={workflow}
            setLoading={setLoading}
            setShouldReload={setShouldReload}
            getAllWorkflows={getAllWorkflows}
            workflowTypesList={workflowTypesList}
            clientList={clientList}
          />
        ))
      ) : (
        <Layout style={{ paddingTop: "30px" }}>
          <Text style={{ fontSize: "18px" }}>You have no clients.</Text>
        </Layout>
      )}
    </div>
  );
};

export default WorkflowList;
