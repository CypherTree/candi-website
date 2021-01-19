import React, { useState, useEffect } from "react";

import { Modal, Layout } from "antd";

import Spinner from "../../components/spinner/Spinner";
import NewOrganisation from "../neworganization/NewOrganisation";

const NewOrganizationModal = (props: any) => {
  console.log("Props in New Organization Moadal ----->", props);

  const { isLoading } = props.props.state.app;

  const { handleClose, open } = props;

  console.log("Loading...", isLoading);

  type currentOrg = {
    name: string | null;
    website: string | null;
    domain: string | null;
  };

  const [currentOrganization, setCurrentOrganization] = useState({
    name: null,
    website: null,
    domain: null,
    selectedPlan: null,
  });

  useEffect(() => {}, [currentOrganization]);

  return (
    <Modal
      visible={open}
      centered
      closable={false}
      width={1000}
      footer={null}
      bodyStyle={{ padding: "0", margin: "0" }}
      maskClosable={true}
      mask={true}
    >
      <Layout
        style={{
          display: "flex",
          alignItems: "center",
          backgroundColor: "#fff",
        }}
      >
        {isLoading ? (
          <Spinner />
        ) : (
          <NewOrganisation
            handleClose={handleClose}
            currentOrganization={currentOrganization}
          />
        )}
      </Layout>
    </Modal>
  );
};

export default NewOrganizationModal;
