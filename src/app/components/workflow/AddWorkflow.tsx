import React, { useEffect, useState } from "react";

import Axios from "axios";

import { connect } from "react-redux";

import AddCustomWorkflow from "./AddCustomWorkflow";
import WorkflowAlreadyAdded from "./WorkflowAlreadyAdded";
import AddWorkflowForm from "./AddWorkflowForm";
import { Layout, Spin } from "antd";
import { getTenantInfo } from "../../core/services/tenantinfo";
import { getCurrentSessionTokens } from "../../../auth/core/services/session";
import { toast } from "react-toastify";

const AddWorkflow = (props: any) => {
  const accessToken = localStorage.getItem("accessToken");

  console.log("props in workflow --->", props);

  const {
    handleNext,
    handleBack,
    handleCancelModal,
    loading,
    setLoading,
  } = props;

  const [workflowAlreadyAdded, setWorkflowAlreadyAdded] = useState(false);

  const { slug: tenant, id: org_id } = props.state.app.currentOrganization;
  // const tenant = "thor";
  // const tenant = "tikona";

  const getExistingWorkflows = () => {
    Axios.get(
      `http://${tenant}.${process.env.REACT_APP_BASE_URL}/api/v1/workflow/`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    )
      .then((response) => {
        console.log("workflow data from API --> ", response.data);
        if (response.data.data.length !== 0) {
          setWorkflowAlreadyAdded(true);
          console.log("workflow data 1 ---->", response.data.data);
          console.log("workflow data 2 ---->", response.data.data[0]);
          console.log("workflow data 3 ---->", response.data.data[0].id);

          setWorkflowId(response.data.data[0].id);
        }
      })
      .catch((err) => {
        console.log("err ", err);
      });
  };

  const [workflowId, setWorkflowId] = useState<null | number>(null);

  const createWorkflow = () => {
    console.log("workflow type ", workflowType);
    setLoading(true);

    Axios.post(
      `http://${tenant}.${process.env.REACT_APP_BASE_URL}/api/v1/workflow/`,
      {
        name: workflowName,
        client_company: null,
        for_organization: true,
        workflow_type: workflowType.key,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    )
      .then((response) => {
        console.log(response.data);
        setWorkflowId(response.data.data.id);
      })
      .then(() => {
        setSelectionDone(true);
        // handleNext();
        setLoading(false);
      })
      .catch((err) => console.log("err", err));
    setSelectionDone(true);

    if (workflowType !== "Custom workflow") {
      handleNext();
      // handleCancelModal();
    }
  };

  useEffect(() => {
    getExistingWorkflows();
  }, []);

  const [organisationType, setOrganisationType] = useState<
    string | undefined
  >();

  const [workflowType, setWorkflowType] = useState<any>();

  const [selectionDone, setSelectionDone] = useState(false);

  const [workflowName, setWorkflowName] = useState("");

  const handleWorkflowTypeChange = (value: any) => {
    console.log("------> value of workflow ");
    setWorkflowType(value);
  };

  const handleOrganisationTypeChange = (value: any) => {
    setOrganisationType(value);
  };

  const handleSkip = () => {
    updateOrganisation(2);
    handleCancelModal();
  };

  const isDeleteAllowed = true;

  const handleSubmitForm = () => {
    if (!workflowType) {
      setCurrentError("Select workflow type. ");
    } else if (workflowName === "") {
      setCurrentError("Enter workflow name. ");
    } else if (!organisationType) {
      setCurrentError("Select organisation type.");
    } else {
      let workflowTypeValue;

      workflowTypeValue = workflowType.key;

      // if (workflowType === "Default workflow") {
      //   workflowTypeValue = 0;
      // } else if (workflowType === "Custom workflow") {
      //   workflowTypeValue = 1;
      // }

      setCurrentError("");

      createWorkflow();
      updateOrganisation(1);
    }
  };

  const [currentError, setCurrentError] = useState("");

  const updateOrganisation = (value: number) => {
    const accessToken = localStorage.getItem("accessToken");

    const data = props.state.app.currentOrganization;

    data.workflow_added = value;

    const jwtToken = `Bearer ${accessToken}`;

    setLoading(true);

    Axios.put(
      `http://id.${process.env.REACT_APP_BASE_URL}/api/v1/organization/${org_id}/`,
      { workflow_added: 1 },
      {
        headers: {
          Authorization: `${jwtToken}`,
        },
      }
    )
      .then((response) => {
        console.log("data", response.data);
        setLoading(false);
      })
      .catch((e) => {
        console.log("err", e);
        setLoading(false);
        toast.error("Workflow could not be added");
      });
  };

  const [workflowTypesList, setWorkflowTypesList] = useState<undefined | any>();

  const getAllWorkflowTypes = async () => {
    const { accessToken } = getCurrentSessionTokens();

    const jwtToken = `Bearer ${accessToken}`;

    const tenant = getTenantInfo();

    console.log(
      "props.state.app.currentOrganization",
      props.state.app.currentOrganization
    );

    const data = props.state.app.currentOrganization;

    await Axios.get(
      `http://${data.slug}.${process.env.REACT_APP_BASE_URL}/api/v1/workflow/types/`,
      {
        headers: {
          Authorization: `${jwtToken}`,
        },
      }
    )
      .then((response: any) => {
        console.log("response from api --> ", response.data);
        setWorkflowTypesList(response.data.data);
      })
      .catch((err: any) => {
        console.log("Err", err);
        toast.error("Some error occoured");
      });
  };

  useEffect(() => {
    getAllWorkflowTypes();
  }, []);

  if (loading) {
    return (
      <Layout
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: "500px",
          backgroundColor: "white",
        }}
      >
        <Spin />
      </Layout>
    );
  } else {
    return (
      <>
        {workflowAlreadyAdded ? (
          <WorkflowAlreadyAdded handleCancelModal={handleCancelModal} />
        ) : (
          <>
            {selectionDone ? (
              <AddCustomWorkflow
                workflowId={workflowId}
                handleCancelModal={handleCancelModal}
                handleNext={handleNext}
              />
            ) : (
              <AddWorkflowForm
                workflowType={workflowType}
                handleWorkflowTypeChange={handleWorkflowTypeChange}
                workflowName={workflowName}
                setWorkflowName={setWorkflowName}
                organisationType={organisationType}
                handleOrganisationTypeChange={handleOrganisationTypeChange}
                isDeleteAllowed={isDeleteAllowed}
                currentError={currentError}
                handleSkip={handleSkip}
                handleSubmitForm={handleSubmitForm}
                handleBack={handleBack}
                workflowTypesList={workflowTypesList}
              />
            )}
          </>
        )}
      </>
    );
  }
};

const mapStateToProps = (state: any) => {
  return {
    state: state,
  };
};

export default connect(mapStateToProps)(AddWorkflow);
